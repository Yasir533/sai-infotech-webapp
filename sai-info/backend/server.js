const express = require("express");
const mysql = require("mysql2/promise");   // ← CHANGED: was mongoose
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const dns = require("dns");
require("dotenv").config({ path: path.join(__dirname, ".env") });

if (typeof dns.setDefaultResultOrder === "function") {
  dns.setDefaultResultOrder("ipv4first");
}

// ─── REMOVED: mongoose model imports ──────────────────────────
// const Contact = require("./models/Contact");
// const Product = require("./models/Product");
// const Admin   = require("./models/Admin");
// const AdminOtp = require("./models/AdminOtp");
// ─────────────────────────────────────────────────────────────

const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

// ─── CLOUDINARY SETUP ────────────────────────────────────────
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "sai-infotech-products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});
const uploadCloud = multer({ storage: cloudinaryStorage });
// ─────────────────────────────────────────────────────────────

// ─── MYSQL CONNECTION POOL ────────────────────────────────────
// CHANGED: replaced mongoose.connect() with mysql2 pool
const db = mysql.createPool({
  host:     process.env.DB_HOST     || "localhost",
  user:     process.env.DB_USER     || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME     || "sai_infotech",
  waitForConnections: true,
  connectionLimit: 10,
});

async function initDB() {
  try {
    const conn = await db.getConnection();
    console.log("MySQL Connected ✓");
    conn.release();
    await ensureAdminSeed();
  } catch (err) {
    console.error("MySQL connection error:", err.message);
    process.exit(1);
  }
}
// ─────────────────────────────────────────────────────────────

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    service: "SAI INFOTECH Backend",
    message: "Backend is running",
    endpoints: ["/health", "/api/products", "/api/contact (POST)"],
  });
});

app.get("/health", (req, res) => {
  res.json({ success: true, status: "ok" });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Keep local multer only for non-product uploads (legacy fallback)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ─── EMAIL CONFIG ───────────────────────────────────────────

const EMAIL_PROVIDER = process.env.EMAIL_PROVIDER || "nodemailer";

let transporter = null;

if (EMAIL_PROVIDER === "nodemailer" || EMAIL_PROVIDER === "smtp") {
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
    family: 4,
    connectionTimeout: 120000,
    greetingTimeout: 60000,
    socketTimeout: 120000,
  });

  transporter.verify((error) => {
    if (error) {
      console.log("EMAIL ERROR FULL:", error);
    } else {
      console.log("Email Server Ready ✓");
    }
  });
}

// ─── SEND EMAIL FUNCTION ────────────────────────────────────

async function sendEmail({ to, subject, html, text, replyTo }) {
  if (EMAIL_PROVIDER === "resend") {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const RESEND_FROM = process.env.RESEND_FROM;

    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is missing");
    if (!RESEND_FROM) throw new Error("RESEND_FROM is missing");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: RESEND_FROM, to, subject, html, text, reply_to: replyTo }),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(result.message || `Resend request failed with status ${response.status}`);
    }
    return result;
  }

  if (!transporter) {
    throw new Error("Email transporter is not initialized. Check EMAIL_USER and EMAIL_PASS in your .env");
  }

  return transporter.sendMail({
    from: `"SAI INFOTECH" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
    text,
    replyTo,
  });
}

// ─── CONSTANTS ───────────────────────────────────────────────

const OTP_EXPIRY_MS = 5 * 60 * 1000;
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET || "admin-auth-secret";
const RESET_JWT_SECRET = process.env.ADMIN_RESET_JWT_SECRET || ADMIN_JWT_SECRET;
const DEFAULT_ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@sai-infotech.com").trim().toLowerCase();
const DEFAULT_ADMIN_PASSWORD = process.env.INIT_ADMIN_PASSWORD || "admin123";

function normalizeEmail(email) {
  return (email || "").trim().toLowerCase();
}

function readLegacyAdminPasswordHash() {
  try {
    const adminFile = path.join(__dirname, "admin.json");
    if (!fs.existsSync(adminFile)) return null;
    const raw = fs.readFileSync(adminFile, "utf8");
    const legacyAdmin = JSON.parse(raw || "{}");
    return legacyAdmin.passwordHash || null;
  } catch (err) {
    console.log("Legacy admin read error", err);
    return null;
  }
}

// ─── ADMIN SEED ──────────────────────────────────────────────
// CHANGED: Admin.findOne() / Admin.create() → MySQL queries

async function ensureAdminSeed() {
  const [rows] = await db.query(
    "SELECT * FROM admins ORDER BY created_at ASC LIMIT 1"
  );
  if (rows.length > 0) return rows[0];

  const legacyPasswordHash = readLegacyAdminPasswordHash();
  const passwordHash = legacyPasswordHash || bcrypt.hashSync(DEFAULT_ADMIN_PASSWORD, 10);

  await db.query(
    "INSERT INTO admins (email, password_hash, role) VALUES (?, ?, ?)",
    [DEFAULT_ADMIN_EMAIL, passwordHash, "admin"]
  );

  const [newRows] = await db.query("SELECT * FROM admins WHERE email = ?", [DEFAULT_ADMIN_EMAIL]);
  return newRows[0];
}

// ─── TOKEN HELPERS ──────────────────────────────────────────
// CHANGED: admin._id → admin.id  (MySQL uses plain integer id)

function createAdminToken(admin) {
  return jwt.sign(
    { adminId: admin.id.toString(), email: admin.email, role: "admin" },
    ADMIN_JWT_SECRET,
    { expiresIn: "1d" }
  );
}

function createResetToken(admin) {
  return jwt.sign(
    { adminId: admin.id.toString(), email: admin.email, purpose: "admin-password-reset" },
    RESET_JWT_SECRET,
    { expiresIn: "10m" }
  );
}

// ─── SEND OTP EMAIL ──────────────────────────────────────────
// CHANGED: Admin.findOne() / AdminOtp.findOneAndUpdate() → MySQL

async function sendAdminOtpEmail(normalizedEmail) {
  let admin = null;

  if (normalizedEmail) {
    const [rows] = await db.query("SELECT * FROM admins WHERE email = ?", [normalizedEmail]);
    admin = rows[0] || null;
  }

  if (!admin && DEFAULT_ADMIN_EMAIL) {
    const [rows] = await db.query("SELECT * FROM admins WHERE email = ?", [DEFAULT_ADMIN_EMAIL]);
    admin = rows[0] || null;
  }

  if (!admin) {
    const [rows] = await db.query("SELECT * FROM admins ORDER BY created_at ASC LIMIT 1");
    admin = rows[0] || null;
  }

  if (!admin) {
    return { status: 404, body: { success: false, message: "Email not registered" } };
  }

  const otp = crypto.randomInt(100000, 1000000).toString();
  const otpHash = await bcrypt.hash(otp, 10);
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MS);

  // Upsert: delete old OTP then insert new one
  await db.query("DELETE FROM admin_otps WHERE email = ?", [normalizedEmail]);
  await db.query(
    "INSERT INTO admin_otps (email, otp_hash, expires_at, verified, verified_at) VALUES (?, ?, ?, false, null)",
    [normalizedEmail, otpHash, expiresAt]
  );

  await sendEmail({
    to: normalizedEmail,
    subject: "SAI INFOTECH - Admin OTP Verification",
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
        <h2 style="color:#2563eb;margin:0 0 12px">Admin Password Reset OTP</h2>
        <p style="margin:0 0 10px">Use the one-time code below to continue resetting your admin password.</p>
        <div style="display:inline-block;padding:14px 18px;font-size:28px;letter-spacing:0.35em;font-weight:700;background:#eff6ff;border-radius:12px;border:1px solid #bfdbfe">
          ${otp}
        </div>
        <p style="margin:12px 0 0">This code expires in 5 minutes.</p>
        <p style="margin:8px 0 0;color:#475569">If you did not request this, you can ignore this email.</p>
      </div>
    `,
  });

  return {
    status: 200,
    body: { success: true, message: "OTP sent to admin email", resolvedEmail: admin.email },
  };
}

// ─── AUTH MIDDLEWARE ─────────────────────────────────────────

function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    req.admin = jwt.verify(token, ADMIN_JWT_SECRET);
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}

// ─── ADMIN LOGIN ─────────────────────────────────────────────
// CHANGED: Admin.findOne() / Admin.find() → MySQL

app.post("/api/admin/login", async (req, res) => {
  console.log("ADMIN LOGIN REQ", req.method, req.url);
  console.log("ADMIN LOGIN BODY", req.body);

  try {
    const { email, password } = req.body || {};
    if (!password) {
      return res.status(400).json({ success: false, message: "Password required" });
    }

    const queryEmail = normalizeEmail(email);
    let admin = null;

    if (queryEmail) {
      const [rows] = await db.query("SELECT * FROM admins WHERE email = ?", [queryEmail]);
      admin = rows[0] || null;

      if (!admin) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      const match = await bcrypt.compare(password, admin.password_hash || "");
      if (!match) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    } else {
      const [admins] = await db.query("SELECT * FROM admins ORDER BY created_at ASC");

      for (const candidate of admins) {
        const match = await bcrypt.compare(password, candidate.password_hash || "");
        if (match) {
          admin = candidate;
          break;
        }
      }

      if (!admin) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    }

    return res.json({
      success: true,
      token: createAdminToken(admin),
      admin: { email: admin.email },
    });
  } catch (error) {
    console.log("Admin login error", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─── ADMIN SEND OTP ──────────────────────────────────────────

app.post("/api/admin/send-otp", async (req, res) => {
  try {
    const { email } = req.body || {};
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const result = await sendAdminOtpEmail(normalizedEmail);
    return res.status(result.status).json(result.body);
  } catch (err) {
    console.log("Send OTP error", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─── ADMIN FORGOT PASSWORD ───────────────────────────────────

app.post("/api/admin/forgot", async (req, res) => {
  try {
    const { email } = req.body || {};
    const normalizedEmail = normalizeEmail(email || DEFAULT_ADMIN_EMAIL);

    const result = await sendAdminOtpEmail(normalizedEmail);
    return res.status(result.status).json(result.body);
  } catch (err) {
    console.log("Forgot password error", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─── ADMIN VERIFY OTP ────────────────────────────────────────
// CHANGED: AdminOtp.findOne() / AdminOtp.deleteOne() → MySQL

app.post("/api/admin/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body || {};
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const [otpRows] = await db.query(
      "SELECT * FROM admin_otps WHERE email = ? ORDER BY created_at DESC LIMIT 1",
      [normalizedEmail]
    );
    const otpRecord = otpRows[0] || null;

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    if (new Date(otpRecord.expires_at).getTime() <= Date.now()) {
      await db.query("DELETE FROM admin_otps WHERE id = ?", [otpRecord.id]);
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    const isMatch = await bcrypt.compare(String(otp), otpRecord.otp_hash || "");
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    const [adminRows] = await db.query("SELECT * FROM admins WHERE email = ?", [normalizedEmail]);
    const admin = adminRows[0] || null;

    if (!admin) {
      return res.status(404).json({ success: false, message: "Email not registered" });
    }

    await db.query("DELETE FROM admin_otps WHERE id = ?", [otpRecord.id]);

    return res.json({
      success: true,
      message: "OTP verified successfully",
      resetToken: createResetToken(admin),
    });
  } catch (err) {
    console.log("Verify OTP error", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─── ADMIN RESET PASSWORD ────────────────────────────────────
// CHANGED: Admin.find() / Admin.updateMany() / AdminOtp.deleteMany() → MySQL

app.post("/api/admin/reset-password", async (req, res) => {
  try {
    const { resetToken, newPassword, confirmPassword } = req.body || {};

    if (!resetToken || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Reset token, new password, and confirm password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    let payload;
    try {
      payload = jwt.verify(resetToken, RESET_JWT_SECRET);
    } catch (error) {
      return res.status(400).json({ success: false, message: "Reset session expired or invalid" });
    }

    if (payload.purpose !== "admin-password-reset") {
      return res.status(400).json({ success: false, message: "Invalid reset session" });
    }

    const [admins] = await db.query("SELECT id FROM admins");
    if (!admins.length) {
      return res.status(404).json({ success: false, message: "Email not registered" });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await db.query("UPDATE admins SET password_hash = ?", [passwordHash]);

    await db.query("DELETE FROM admin_otps WHERE email = ?", [normalizeEmail(payload.email)]);

    return res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    console.log("Reset password error", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─── CONTACT ─────────────────────────────────────────────────
// CHANGED: new Contact({...}).save() → MySQL INSERT

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, message, services } = req.body;

    console.log("CONTACT RECEIVED BODY:", JSON.stringify(req.body));

    const contactRecipient = (
      process.env.ADMIN_EMAIL ||
      DEFAULT_ADMIN_EMAIL ||
      process.env.EMAIL_USER ||
      ""
    ).trim().toLowerCase();

    console.log("ADMIN EMAIL:", contactRecipient);
    console.log("CUSTOMER EMAIL:", email);

    if (!contactRecipient) {
      console.log("CONTACT MAIL CONFIG WARNING: No admin recipient email is configured");
    }

    // Insert contact record
    const [result] = await db.query(
      "INSERT INTO contacts (name, email, phone, message, status) VALUES (?, ?, ?, ?, ?)",
      [name, email, phone, message, "Pending"]
    );
    const contactId = result.insertId;

    // Insert services (array → separate rows in contact_services table)
    if (Array.isArray(services) && services.length > 0) {
      for (const service of services) {
        await db.query(
          "INSERT INTO contact_services (contact_id, service) VALUES (?, ?)",
          [contactId, service]
        );
      }
    }

    console.log("CONTACT SAVED ID:", contactId);
    console.log("CONTACT MAIL SEND START");

    const serviceStr = Array.isArray(services) ? services.join(", ") : services;

    const [adminMailResult, customerMailResult] = await Promise.allSettled([
      sendEmail({
        to: contactRecipient,
        replyTo: email,
        subject: "New Customer Enquiry - SAI INFOTECH",
        html: `
          <h2>New Customer Enquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Services:</strong> ${serviceStr}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      }),
      sendEmail({
        to: email,
        subject: "Thank You for Contacting SAI INFOTECH",
        html: `
          <div style="font-family: Arial; padding:20px;">
            <h2 style="color:#2563eb;">Thank You for Contacting SAI INFOTECH</h2>
            <p>Dear ${name},</p>
            <p>Your enquiry has been received successfully.</p>
            <p>Our technical team will contact you shortly.</p>
            <p><strong>Selected Services:</strong></p>
            <p>${serviceStr}</p>
            <br/>
            <p>Regards,<br/>SAI INFOTECH</p>
          </div>
        `,
      }),
    ]);

    if (adminMailResult.status === "fulfilled") {
      console.log("ADMIN MAIL SENT");
    } else {
      console.log("CONTACT ADMIN MAIL ERROR:", adminMailResult.reason);
    }

    if (customerMailResult.status === "fulfilled") {
      console.log("CUSTOMER MAIL SENT");
    } else {
      console.log("CONTACT CUSTOMER MAIL ERROR:", customerMailResult.reason);
    }

    console.log("CONTACT MAIL SEND COMPLETE");

    res.status(201).json({ success: true, message: "Message Sent Successfully" });
  } catch (error) {
    console.log("FULL ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ─── GET ENQUIRIES ───────────────────────────────────────────
// CHANGED: Contact.find() → MySQL JOIN to fetch services too

app.get("/api/enquiries", async (req, res) => {
  try {
    const [contacts] = await db.query(
      "SELECT * FROM contacts ORDER BY created_at DESC"
    );

    // Fetch services for each contact and attach them
    for (const contact of contacts) {
      const [serviceRows] = await db.query(
        "SELECT service FROM contact_services WHERE contact_id = ?",
        [contact.id]
      );
      contact.services = serviceRows.map((r) => r.service);
    }

    res.json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching enquiries" });
  }
});

// ─── DELETE ENQUIRY ──────────────────────────────────────────
// CHANGED: Contact.findByIdAndDelete() → MySQL DELETE
// (contact_services rows are auto-deleted via ON DELETE CASCADE)

app.delete("/api/enquiries/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM contacts WHERE id = ?", [req.params.id]);
    res.json({ message: "Enquiry Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Delete Failed" });
  }
});

// ─── UPDATE ENQUIRY STATUS ───────────────────────────────────
// CHANGED: Contact.findByIdAndUpdate() → MySQL UPDATE

app.put("/api/enquiries/:id", async (req, res) => {
  try {
    await db.query(
      "UPDATE contacts SET status = ? WHERE id = ?",
      ["Completed", req.params.id]
    );
    res.json({ message: "Marked as Completed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Update Failed" });
  }
});

// ─── CHATBOT ─────────────────────────────────────────────────
// NO CHANGE: pure logic, no DB interaction

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    console.log("/api/chat received:", message);

    const msg = (message ?? "").toString().toLowerCase();
    let reply = "";

    if (msg.includes("services") || msg.includes("service")) {
      reply = "SAI INFOTECH provides:\n\n• Component Level Refurbishing\n• AV Solutions\n• Surveillance / CCTV\n• Managed Services\n• IT / ITeS Lifecycle Management\n• E-Waste Management\n• Wind Energy Controls\n• PLC & Automation Systems";
    } else if (msg.includes("cctv") || msg.includes("surveillance")) {
      reply = "We provide complete Surveillance & CCTV solutions for offices, industries, commercial spaces, and homes including installation, maintenance, and monitoring.";
    } else if (msg.includes("managed") || msg.includes("management")) {
      reply = "Our Managed Services include IT infrastructure management, technical support, monitoring, maintenance, and enterprise technology solutions.";
    } else if (msg.includes("av") || msg.includes("audio") || msg.includes("video")) {
      reply = "We provide AV Solutions including conference room setups, display systems, projectors, audio systems, and enterprise AV integrations.";
    } else if (msg.includes("plc") || msg.includes("automation")) {
      reply = "We provide PLC & Automation Systems for industrial controls, smart automation, process control systems, and industrial integration solutions.";
    } else if (msg.includes("e-waste") || msg.includes("ewaste") || msg.includes("recycle")) {
      reply = "SAI INFOTECH provides professional E-Waste Management solutions including safe disposal, recycling, and lifecycle management of electronic equipment.";
    } else if (msg.includes("refurbishing") || msg.includes("component")) {
      reply = "We specialize in Component Level Refurbishing for IT hardware, motherboards, industrial electronics, and enterprise systems.";
    } else if (msg.includes("wind") || msg.includes("energy")) {
      reply = "We provide Wind Energy Control solutions including industrial monitoring systems, control panels, and support systems.";
    } else if (msg.includes("contact") || msg.includes("phone") || msg.includes("number")) {
      reply = "You can contact SAI INFOTECH at:\n\n📞 +91 83 10 33 85 44\n☎ Office: +91 76 76 95 21 39";
    } else if (msg.includes("location") || msg.includes("address")) {
      reply = "Please contact SAI INFOTECH directly for office location and business assistance.";
    } else if (msg.includes("about") || msg.includes("company")) {
      reply = "SAI INFOTECH is a professional IT and technology solutions company providing managed services, surveillance solutions, automation systems, refurbishing, AV solutions, and enterprise IT lifecycle management.";
    } else if (msg.includes("support") || msg.includes("help")) {
      reply = "Our technical support team is available to assist you with IT services, automation systems, surveillance solutions, refurbishing, and enterprise support services.";
    } else {
      reply = "Welcome to SAI INFOTECH 👋\n\nPlease ask about:\n\n• Managed Services\n• CCTV Solutions\n• AV Solutions\n• PLC & Automation\n• E-Waste Management\n• Wind Energy Controls\n• Component Refurbishing\n• Contact Details";
    }

    res.json({ success: true, reply });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ─── GET PRODUCTS ────────────────────────────────────────────
// CHANGED: Product.find().sort().lean() → MySQL SELECT + JOIN for images

app.get("/api/products", async (req, res) => {
  try {
    const [products] = await db.query(
      "SELECT * FROM products ORDER BY created_at DESC"
    );

    // Attach images array for each product
    for (const product of products) {
      const [imgRows] = await db.query(
        "SELECT image_url FROM product_images WHERE product_id = ? ORDER BY sort_order ASC",
        [product.id]
      );
      product.images = imgRows.map((r) => r.image_url);
      // Keep top-level 'image' for frontend backwards-compat
      product.image = product.images[0] || product.image || "";
    }

    res.json(products);
  } catch (error) {
    console.log("Products API error", error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// ─── CREATE PRODUCT ──────────────────────────────────────────
// CHANGED: Product.create({...}) → MySQL INSERT + product_images INSERT

app.post("/api/products", uploadCloud.array("images", 15), async (req, res) => {
  try {
    const { name, category, description, price } = req.body;

    if (!name || !req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Name and at least one image are required" });
    }

    const images = req.files.map((file) => file.path);

    const [result] = await db.query(
      "INSERT INTO products (name, category, description, price, image, in_stock) VALUES (?, ?, ?, ?, ?, ?)",
      [
        name.trim(),
        (category || "general").trim(),
        (description || "").trim(),
        price || "0",
        images[0],
        true,
      ]
    );
    const productId = result.insertId;

    // Insert into product_images table
    for (let i = 0; i < images.length; i++) {
      await db.query(
        "INSERT INTO product_images (product_id, image_url, sort_order) VALUES (?, ?, ?)",
        [productId, images[i], i]
      );
    }

    // Fetch the created product to return it
    const [[newProduct]] = await db.query("SELECT * FROM products WHERE id = ?", [productId]);
    newProduct.images = images;

    res.status(201).json({
      success: true,
      message: "Product uploaded successfully",
      product: newProduct,
    });
  } catch (error) {
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({ message: "You can upload a maximum of 15 photos" });
      }
      return res.status(400).json({ message: error.message });
    }
    console.log("Product upload error", error);
    res.status(500).json({ message: "Error uploading product" });
  }
});

// ─── PATCH PRODUCT (toggle inStock) ─────────────────────────
// CHANGED: Product.findByIdAndUpdate() → MySQL UPDATE

app.patch("/api/products/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "Product not found" });

    await db.query(
      "UPDATE products SET in_stock = ? WHERE id = ?",
      [req.body.inStock ? 1 : 0, req.params.id]
    );

    const [[updated]] = await db.query("SELECT * FROM products WHERE id = ?", [req.params.id]);
    const [imgRows] = await db.query(
      "SELECT image_url FROM product_images WHERE product_id = ? ORDER BY sort_order ASC",
      [req.params.id]
    );
    updated.images = imgRows.map((r) => r.image_url);

    res.json(updated);
  } catch (err) {
    console.log("Product patch error", err);
    res.status(500).json({ message: err.message });
  }
});

// ─── PUT PRODUCT (full edit) ──────────────────────────────────
// CHANGED: Product.findById() / product.save() → MySQL SELECT + UPDATE + product_images management

app.put("/api/products/:id", uploadCloud.array("newImages", 15), async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "Product not found" });
    const product = rows[0];

    // Fetch current images
    const [currentImgRows] = await db.query(
      "SELECT image_url FROM product_images WHERE product_id = ? ORDER BY sort_order ASC",
      [req.params.id]
    );
    const currentImages = currentImgRows.map((r) => r.image_url);

    let keepIndexes = [];
    try { keepIndexes = JSON.parse(req.body.keepImageIndexes || "[]"); } catch {}

    // Delete removed images from Cloudinary
    const removedImages = currentImages.filter((_, i) => !keepIndexes.includes(i));
    for (const url of removedImages) {
      try {
        if (url && url.includes("cloudinary.com")) {
          const parts = url.split("/");
          const folder = parts[parts.length - 2];
          const filename = parts[parts.length - 1].split(".")[0];
          await cloudinary.uploader.destroy(`${folder}/${filename}`);
        }
      } catch (e) {
        console.warn("Cloudinary image delete warn:", e.message);
      }
    }

    const keptImages = keepIndexes.map((i) => currentImages[i]).filter(Boolean);
    const newImageUrls = req.files ? req.files.map((f) => f.path) : [];
    const allImages = [...keptImages, ...newImageUrls].slice(0, 15);

    const updatedName = req.body.name || product.name;
    const updatedDesc = req.body.description !== undefined ? req.body.description : product.description;
    const updatedInStock =
      req.body.inStock !== undefined
        ? req.body.inStock === "true" || req.body.inStock === true
        : product.in_stock;
    const updatedImage = allImages[0] || product.image;

    await db.query(
      "UPDATE products SET name = ?, description = ?, in_stock = ?, image = ? WHERE id = ?",
      [updatedName, updatedDesc, updatedInStock ? 1 : 0, updatedImage, req.params.id]
    );

    // Replace product_images rows
    await db.query("DELETE FROM product_images WHERE product_id = ?", [req.params.id]);
    for (let i = 0; i < allImages.length; i++) {
      await db.query(
        "INSERT INTO product_images (product_id, image_url, sort_order) VALUES (?, ?, ?)",
        [req.params.id, allImages[i], i]
      );
    }

    const [[updatedProduct]] = await db.query("SELECT * FROM products WHERE id = ?", [req.params.id]);
    updatedProduct.images = allImages;

    res.json(updatedProduct);
  } catch (err) {
    console.log("Product put error", err);
    res.status(500).json({ message: err.message });
  }
});

// ─── DELETE PRODUCT ──────────────────────────────────────────
// CHANGED: Product.findByIdAndDelete() → MySQL DELETE
// (product_images rows are auto-deleted via ON DELETE CASCADE)

app.delete("/api/products/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "Product not found" });
    const deletedProduct = rows[0];

    // Fetch images before deleting
    const [imgRows] = await db.query(
      "SELECT image_url FROM product_images WHERE product_id = ?",
      [req.params.id]
    );
    const imageUrls = imgRows.map((r) => r.image_url);

    // Delete from DB (product_images cascade)
    await db.query("DELETE FROM products WHERE id = ?", [req.params.id]);

    // Remove images from Cloudinary / local disk
    for (const url of imageUrls) {
      try {
        if (url && url.includes("cloudinary.com")) {
          const parts = url.split("/");
          const folder = parts[parts.length - 2];
          const filename = parts[parts.length - 1].split(".")[0];
          await cloudinary.uploader.destroy(`${folder}/${filename}`);
        } else if (url && url.includes("/uploads/")) {
          const filename = url.split("/uploads/")[1];
          const imagePath = path.join(__dirname, "uploads", filename);
          if (fs.existsSync(imagePath)) {
            try { fs.unlinkSync(imagePath); } catch (e) { console.log("File delete error:", e); }
          }
        }
      } catch (e) {
        console.warn("Image cleanup warn:", e.message);
      }
    }

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log("Product delete error", error);
    res.status(500).json({ message: "Error deleting product" });
  }
});

// ─── ERROR HANDLING MIDDLEWARE ───────────────────────────────

app.use((err, req, res, next) => {
  console.error("Unhandled server error:", err);

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({ message: "You can upload a maximum of 15 photos" });
    }
    return res.status(400).json({ message: err.message });
  }

  const message =
    typeof err === "string" ? err : err.message || "An unexpected error occurred on the server";
  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({ message });
});

// ─── START SERVER ────────────────────────────────────────────

const PORT = process.env.PORT || 5000;

// CHANGED: Start server only after MySQL is connected
initDB().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
});
