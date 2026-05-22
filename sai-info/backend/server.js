const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const Contact = require("./models/Contact");
const Admin = require("./models/Admin");
const AdminOtp = require("./models/AdminOtp");
const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configure multer for file uploads
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

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    user: process.env.EMAIL_USER,
    pass: (process.env.EMAIL_PASS || "").replace(/\s+/g, ""),
  },
});

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.log("EMAIL CONFIG WARNING: EMAIL_USER or EMAIL_PASS is missing in backend/.env");
}

transporter.verify((error, success) => {
  if (error) {
    console.log("EMAIL ERROR:", error);
  } else {
    console.log("Email Server Ready");
  }
});

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
  console.log("MongoDB Connected");
  await ensureAdminSeed();
  migrateProductImageUrls();
})
.catch((err) => console.log(err));

const OTP_EXPIRY_MS = 5 * 60 * 1000;
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET || "admin-auth-secret";
const RESET_JWT_SECRET = process.env.ADMIN_RESET_JWT_SECRET || ADMIN_JWT_SECRET;
const DEFAULT_ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@sai-infotech.com").trim().toLowerCase();
const DEFAULT_ADMIN_PASSWORD = process.env.INIT_ADMIN_PASSWORD || "admin123";

// ─────────────────────────────────────────────────────────────
// ONE-TIME MIGRATION: strip hardcoded "http://localhost:5000"
// from existing products.json so images work on all devices.
// ─────────────────────────────────────────────────────────────
function migrateProductImageUrls() {
  try {
    const productsPath = path.join(__dirname, 'products.json');
    if (!fs.existsSync(productsPath)) return;

    const raw = fs.readFileSync(productsPath, 'utf8');
    const products = JSON.parse(raw);
    let changed = false;

    const fixUrl = (url) => {
      if (!url) return url;
      // Strip any hardcoded origin so only the relative path remains
      return url.replace(/^https?:\/\/[^/]+(?=\/uploads\/)/, '');
    };

    products.forEach((p) => {
      const fixedImage = fixUrl(p.image);
      if (fixedImage !== p.image) { p.image = fixedImage; changed = true; }

      if (Array.isArray(p.images)) {
        p.images = p.images.map((img) => {
          const fixed = fixUrl(img);
          if (fixed !== img) changed = true;
          return fixed;
        });
      }
    });

    if (changed) {
      fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
      console.log('products.json migrated: removed hardcoded localhost URLs');
    }
  } catch (err) {
    console.log('Product URL migration error:', err);
  }
}

function normalizeEmail(email) {
  return (email || "").trim().toLowerCase();
}

function readLegacyAdminPasswordHash() {
  try {
    const adminFile = path.join(__dirname, 'admin.json');
    if (!fs.existsSync(adminFile)) {
      return null;
    }
    const raw = fs.readFileSync(adminFile, 'utf8');
    const legacyAdmin = JSON.parse(raw || '{}');
    return legacyAdmin.passwordHash || null;
  } catch (err) {
    console.log('Legacy admin read error', err);
    return null;
  }
}

async function ensureAdminSeed() {
  const existingAdmin = await Admin.findOne().sort({ createdAt: 1 });
  if (existingAdmin) {
    return existingAdmin;
  }

  const legacyPasswordHash = readLegacyAdminPasswordHash();
  const passwordHash = legacyPasswordHash || bcrypt.hashSync(DEFAULT_ADMIN_PASSWORD, 10);

  return Admin.create({
    email: DEFAULT_ADMIN_EMAIL,
    passwordHash,
  });
}

function createAdminToken(admin) {
  return jwt.sign(
    {
      adminId: admin._id.toString(),
      email: admin.email,
      role: 'admin',
    },
    ADMIN_JWT_SECRET,
    { expiresIn: '1d' }
  );
}

function createResetToken(admin) {
  return jwt.sign(
    {
      adminId: admin._id.toString(),
      email: admin.email,
      purpose: 'admin-password-reset',
    },
    RESET_JWT_SECRET,
    { expiresIn: '10m' }
  );
}

async function sendAdminOtpEmail(normalizedEmail) {
  const admin =
    (normalizedEmail && await Admin.findOne({ email: normalizedEmail })) ||
    (DEFAULT_ADMIN_EMAIL && await Admin.findOne({ email: DEFAULT_ADMIN_EMAIL })) ||
    (await Admin.findOne().sort({ createdAt: 1 }));

  if (!admin) {
    return { status: 404, body: { success: false, message: 'Email not registered' } };
  }

  const otp = crypto.randomInt(100000, 1000000).toString();
  const otpHash = await bcrypt.hash(otp, 10);
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MS);

  await AdminOtp.findOneAndUpdate(
    { email: normalizedEmail },
    {
      email: normalizedEmail,
      otpHash,
      expiresAt,
      verified: false,
      verifiedAt: null,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: normalizedEmail,
    subject: 'SAI INFOTECH - Admin OTP Verification',
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
        <h2 style="color:#2563eb;margin:0 0 12px">Admin Password Reset OTP</h2>
        <p style="margin:0 0 10px">Use the one-time code below to continue resetting your admin password.</p>
        <div style="display:inline-block;padding:14px 18px;font-size:28px;letter-spacing:0.35em;font-weight:700;background:#eff6ff;border-radius:12px;border:1px solid #bfdbfe">${otp}</div>
        <p style="margin:12px 0 0">This code expires in 5 minutes.</p>
        <p style="margin:8px 0 0;color:#475569">If you did not request this, you can ignore this email.</p>
      </div>
    `,
  });

  return {
    status: 200,
    body: {
      success: true,
      message: 'OTP sent to admin email',
      resolvedEmail: admin.email,
    },
  };
}

function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    req.admin = jwt.verify(token, ADMIN_JWT_SECRET);
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}

// Admin login
app.post('/api/admin/login', async (req, res) => {
  console.log('ADMIN LOGIN REQ', req.method, req.url);
  console.log('ADMIN LOGIN BODY', req.body);

  try {
    const { email, password } = req.body || {};
    if (!password) {
      return res.status(400).json({ success: false, message: 'Password required' });
    }

    const queryEmail = normalizeEmail(email);
    let admin = null;

    if (queryEmail) {
      admin = await Admin.findOne({ email: queryEmail });
      if (!admin) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const match = await bcrypt.compare(password, admin.passwordHash || '');
      if (!match) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } else {
      const admins = await Admin.find().sort({ createdAt: 1 });

      for (const candidate of admins) {
        const match = await bcrypt.compare(password, candidate.passwordHash || '');
        if (match) {
          admin = candidate;
          break;
        }
      }

      if (!admin) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    }

    return res.json({
      success: true,
      token: createAdminToken(admin),
      admin: {
        email: admin.email,
      },
    });
  } catch (error) {
    console.log('Admin login error', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Forgot password - send 6-digit OTP to the registered admin email
app.post('/api/admin/send-otp', async (req, res) => {
  console.log('ADMIN SEND OTP REQ', req.method, req.url);

  try {
    const { email } = req.body || {};
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const result = await sendAdminOtpEmail(normalizedEmail);
    return res.status(result.status).json(result.body);
  } catch (err) {
    console.log('Send OTP error', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Legacy compatibility route for older admin login screens
app.post('/api/admin/forgot', async (req, res) => {
  console.log('ADMIN FORGOT REQ', req.method, req.url);

  try {
    const { email } = req.body || {};
    const normalizedEmail = normalizeEmail(email || DEFAULT_ADMIN_EMAIL);

    const result = await sendAdminOtpEmail(normalizedEmail);
    return res.status(result.status).json(result.body);
  } catch (err) {
    console.log('Forgot password error', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Verify OTP and issue a short-lived reset token
app.post('/api/admin/verify-otp', async (req, res) => {
  console.log('ADMIN VERIFY OTP REQ', req.method, req.url);

  try {
    const { email, otp } = req.body || {};
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }

    const otpRecord = await AdminOtp.findOne({ email: normalizedEmail });

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    if (new Date(otpRecord.expiresAt).getTime() <= Date.now()) {
      await AdminOtp.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ success: false, message: 'OTP expired' });
    }

    const isMatch = await bcrypt.compare(String(otp), otpRecord.otpHash || '');

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    const admin = await Admin.findOne({ email: normalizedEmail });
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Email not registered' });
    }

    await AdminOtp.deleteOne({ _id: otpRecord._id });

    return res.json({
      success: true,
      message: 'OTP verified successfully',
      resetToken: createResetToken(admin),
    });
  } catch (err) {
    console.log('Verify OTP error', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Reset password using the verified reset token
app.post('/api/admin/reset-password', async (req, res) => {
  console.log('ADMIN RESET PASSWORD REQ', req.method, req.url);

  try {
    const { resetToken, newPassword, confirmPassword } = req.body || {};

    if (!resetToken || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Reset token, new password, and confirm password are required',
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    let payload;
    try {
      payload = jwt.verify(resetToken, RESET_JWT_SECRET);
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Reset session expired or invalid' });
    }

    if (payload.purpose !== 'admin-password-reset') {
      return res.status(400).json({ success: false, message: 'Invalid reset session' });
    }

    const admins = await Admin.find();
    if (!admins.length) {
      return res.status(404).json({ success: false, message: 'Email not registered' });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await Admin.updateMany({}, { passwordHash });

    await AdminOtp.deleteMany({ email: normalizeEmail(payload.email) });

    return res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    console.log('Reset password error', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post("/api/contact", async (req, res) => {

  try {

    const {
      name,
      email,
      phone,
      message,
      services
    } = req.body;

    // Save in MongoDB

    const newContact = new Contact({
      name,
      email,
      phone,
      message,
      services,
    });

    await newContact.save();

    // =========================
    // 1. SEND MAIL TO ADMIN
    // =========================

    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: process.env.ADMIN_EMAIL,

      subject: "New Customer Enquiry - SAI INFOTECH",

      html: `
        <h2>New Customer Enquiry</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Phone:</strong> ${phone}</p>

        <p>
          <strong>Services:</strong>
          ${
            Array.isArray(services)
              ? services.join(", ")
              : services
          }
        </p>

        <p><strong>Message:</strong></p>

        <p>${message}</p>
      `,
    });

    // =========================
    // 2. AUTO REPLY TO USER
    // =========================

    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: email,

      subject: "Thank You for Contacting SAI INFOTECH",

      html: `
        <div style="font-family: Arial; padding:20px;">

          <h2 style="color:#2563eb;">
            Thank You for Contacting SAI INFOTECH
          </h2>

          <p>Dear ${name},</p>

          <p>
            Your enquiry has been received successfully.
          </p>

          <p>
            Our technical team will contact you shortly.
          </p>

          <p>
            <strong>Selected Services:</strong>
          </p>

          <p>
            ${
              Array.isArray(services)
                ? services.join(", ")
                : services
            }
          </p>

          <br/>

          <p>
            Regards,<br/>
            SAI INFOTECH
          </p>

        </div>
      `,
    });

    // =========================

    res.status(201).json({
      success: true,
      message: "Message Sent Successfully",
    });

  } catch (error) {

    console.log("FULL ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

app.get("/api/enquiries", async (req, res) => {
  try {
    const enquiries = await Contact.find().sort({ createdAt: -1 });

    res.json(enquiries);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching enquiries",
    });
  }
});

app.delete("/api/enquiries/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      message: "Enquiry Deleted",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Delete Failed",
    });
  }
});

app.put("/api/enquiries/:id", async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(
      req.params.id,
      {
        status: "Completed",
      }
    );

    res.json({
      message: "Marked as Completed",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Update Failed",
    });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    console.log("/api/chat received:", message);

    // Ensure message is a string to avoid runtime errors
    const msg = (message ?? "").toString().toLowerCase();

    // Simple AI replies
    let reply = "";

    if (msg.includes("data recovery")) {
      reply =
        "We provide professional data recovery solutions for hard disks, SSDs, laptops, and servers.";
    } else if (msg.includes("laptop")) {
      reply =
        "We repair laptops, motherboards, chip-level issues, and provide AMC services.";
    } else if (msg.includes("contact")) {
      reply =
        "You can contact SAI INFOTECH at +91 99459 81999 or email ssmb@sais.in";
    } else if (msg.includes("services")) {
      reply =
        "We provide IT Solutions, CCTV Installation, Data Recovery, Networking, Motherboard Repair, and more.";
    } else {
      reply =
        "Welcome to SAI INFOTECH. Please ask about our services, repairs, networking, CCTV, or data recovery.";
    }

    res.json({
      success: true,
      reply,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// Simple products endpoint - reads backend/products.json if available

app.get('/api/products', async (req, res) => {
  try {
    const productsPath = path.join(__dirname, 'products.json');

    if (fs.existsSync(productsPath)) {
      const raw = fs.readFileSync(productsPath, 'utf8');
      const products = JSON.parse(raw);
      return res.json(products);
    }

    // default: return empty array so frontend can show informative UI
    res.json([]);
  } catch (error) {
    console.log('Products API error', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Upload new product with up to 10 images
app.post('/api/products', upload.array('images', 10), async (req, res) => {
  try {
    const { name, category, description, price } = req.body;

    if (!name || !req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Name and at least one image are required' });
    }

    // ✅ FIX: Store relative paths so images load on ALL devices (phones, PCs, any network).
    // Previously "http://localhost:5000/uploads/..." was hardcoded — that only works on the
    // local PC. The frontend now prepends the dynamic API base for each device.
    const images = req.files.map((file) => `/uploads/${file.filename}`);

    const newProduct = {
      _id: Date.now().toString(),
      name,
      category: category || 'general',
      description: description || '',
      price: price || '0',
      image: images[0],
      images,
    };

    // Read existing products
    const productsPath = path.join(__dirname, 'products.json');
    let products = [];

    if (fs.existsSync(productsPath)) {
      const raw = fs.readFileSync(productsPath, 'utf8');
      products = JSON.parse(raw);
    }

    // Add new product
    products.push(newProduct);

    // Save to file
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));

    res.status(201).json({
      success: true,
      message: 'Product uploaded successfully',
      product: newProduct,
    });
  } catch (error) {
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({ message: 'You can upload a maximum of 10 photos' });
      }
      return res.status(400).json({ message: error.message });
    }

    console.log('Product upload error', error);
    res.status(500).json({ message: 'Error uploading product' });
  }
});

// Delete product by id and remove its uploaded image if present
app.delete('/api/products/:id', async (req, res) => {
  try {
    const productsPath = path.join(__dirname, 'products.json');

    if (!fs.existsSync(productsPath)) {
      return res.status(404).json({ message: 'Products list not found' });
    }

    const raw = fs.readFileSync(productsPath, 'utf8');
    const products = JSON.parse(raw);

    const productIndex = products.findIndex((p) => p._id === req.params.id);

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const [deletedProduct] = products.splice(productIndex, 1);
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));

    // Remove uploaded files from /uploads when image URLs point to uploads path
    const imageUrls = Array.isArray(deletedProduct?.images)
      ? deletedProduct.images
      : deletedProduct?.image
        ? [deletedProduct.image]
        : [];

    imageUrls.forEach((imageUrl) => {
      if (imageUrl && imageUrl.includes('/uploads/')) {
        const filename = imageUrl.split('/uploads/')[1];
        const imagePath = path.join(__dirname, 'uploads', filename);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
    });

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.log('Product delete error', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});