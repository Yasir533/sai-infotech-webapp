const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: String,

    email: String,

    phone: String,

    message: String,

    services: [String],

    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);