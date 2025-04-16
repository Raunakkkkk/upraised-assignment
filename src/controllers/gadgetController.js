// src/controllers/gadgetsController.js
const Gadget = require("../models/Gadget");

// some codenames to pick from
const codenames = [
  "The Nightingale",
  "The Kraken",
  "The Phantom",
  "The Juggernaut",
  "The Sentinel",
  "The Viper",
  "The Mirage",
  "The Wraith",
  "The Nova",
  "The Tempest",
];

function getRandomCodename() {
  const index = Math.floor(Math.random() * codenames.length);
  return codenames[index];
}
async function getUniqueCodename() {
  let codename = getRandomCodename();
  // Check if the codename already exists in the database
  while (await Gadget.findOne({ name: codename })) {
    // If it exists, generate a new codename
    codename = getRandomCodename();
  }
  return codename;
}
// 1. GET /gadgets?status=...
exports.listGadgets = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const gadgets = await Gadget.find(filter).lean();
    // attach random mission success %
    const withProb = gadgets.map((g) => ({
      ...g,
      missionSuccess: `${Math.floor(Math.random() * 51) + 50}%`,
    }));
    res.json(withProb);
  } catch (err) {
    next(err);
  }
};

// 2. POST /gadgets
exports.createGadget = async (req, res, next) => {
  try {
    const name = await getUniqueCodename();
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: "Missing status" });
    if (!["Available", "Deployed", "Destroyed", "Decommissioned"].includes(status)) {
      return res.status(400).json({ error: "Invalid status provided." });
    }
    const gadget = await Gadget.create({ name, status });
    res.status(201).json(gadget);
  } catch (err) {
    next(err);
  }
};

// 3. PATCH /gadgets/:id
exports.updateGadget = async (req, res, next) => {
  try {
    const updates = req.body;
    const gadget = await Gadget.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!gadget) return res.status(404).json({ error: "Not found" });
    res.json(gadget);
  } catch (err) {
    next(err);
  }
};

// 4. DELETE /gadgets/:id  → mark Decommissioned
exports.decommissionGadget = async (req, res, next) => {
  try {
    const gadget = await Gadget.findByIdAndUpdate(
      req.params.id,
      { status: "Decommissioned", decommissionedAt: new Date() },
      { new: true }
    );
    if (!gadget) return res.status(404).json({ error: "Not found" });
    res.json(gadget);
  } catch (err) {
    next(err);
  }
};

// 5. POST /gadgets/:id/self-destruct
exports.selfDestruct = async (req, res, next) => {
  try {
    const { confirmationCode } = req.body;
    const g = await Gadget.findById(req.params.id);
    if (!g) return res.status(404).json({ error: "Not found" });

    // step 1: generate & send code
    if (!confirmationCode) {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      g.pendingSelfDestructCode = code;
      g.codeExpiresAt = Date.now() + 5 * 60 * 1000; // 5m
      await g.save();
      return res.json({
        message: "Confirmation code generated ",
        confirmationCode: code,
      });
    }

    // step 2: confirm & destroy
    if (
      g.pendingSelfDestructCode === confirmationCode &&
      g.codeExpiresAt > Date.now()
    ) {
      g.status = "Destroyed";
      g.pendingSelfDestructCode = undefined;
      g.codeExpiresAt = undefined;
      await g.save();
      return res.json({ message: "Gadget self destructed", gadget: g });
    }

    res.status(400).json({ error: "Invalid or expired confirmation code" });
  } catch (err) {
    next(err);
  }
};
