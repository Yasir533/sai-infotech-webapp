const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const Contact = require("./models/Contact");
const nodemailer = require("nodemailer");

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
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("EMAIL ERROR:", error);
  } else {
    console.log("Email Server Ready");
  }
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

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

    const images = req.files.map((file) => `http://localhost:5000/uploads/${file.filename}`);

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

    // Remove uploaded files from /uploads when image URLs point to localhost uploads path
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});