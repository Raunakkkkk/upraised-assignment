const mongoose = require("mongoose");

const gadgetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["Available", "Deployed", "Destroyed", "Decommissioned"],
      default: "Available",
    },
    decommissionedAt: Date,
    // for self‑destruct flow:
    pendingSelfDestructCode: String,
    codeExpiresAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gadget", gadgetSchema);
