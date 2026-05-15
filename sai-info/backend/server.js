const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Contact = require("./models/Contact");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

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
    const { name, email, phone, message, services } = req.body;

    // Save to MongoDB
    const newContact = new Contact({
      name,
      email,
      phone,
      message,
      services,
    });

    await newContact.save();

    // Send Email
    // Auto Reply to Customer

await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: email,

  subject: "Thank You for Contacting SAI INFOTECH",

  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      
      <h2 style="color:#2563eb;">
        Thank You for Contacting SAI INFOTECH
      </h2>

      <p>Dear <strong>${name}</strong>,</p>

      <p>
        Thank you for reaching out to us.
        We have received your enquiry successfully.
      </p>

      <p>
        Our technical team will contact you shortly regarding:
      </p>

      <p style="background:#f3f4f6; padding:10px; border-radius:8px;">
        ${
          Array.isArray(services)
            ? services.join(", ")
            : services
        }
      </p>

      <p>
        We appreciate your interest in SAI INFOTECH.
      </p>

      <br/>

      <p>
        Regards,<br/>
        <strong>SAI INFOTECH</strong><br/>
        Technical Solutions Trust
      </p>

    </div>
  `,
});

    res.status(201).json({
      success: true,
      message: "Message Sent Successfully",
    });

  } catch (error) {
    console.error("FULL ERROR:", error);
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

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});