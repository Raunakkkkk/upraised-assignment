const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const gadgetRoutes = require("./routes/gadgets");
const { authenticate } = require("./middleware/authMiddleware");
const connectDB = require("./connectDB");
require("dotenv").config();

console.log(process.env.PORT);

const app = express();
app.use(cors(), express.json());

// connect MongoDB
connectDB();
// public
app.use("/auth", authRoutes);

// gadget endpoints
app.use("/gadgets", authenticate, gadgetRoutes);

// global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
