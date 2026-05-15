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

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});