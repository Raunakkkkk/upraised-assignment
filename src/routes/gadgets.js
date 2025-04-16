// src/routes/gadgets.js
const router = require("express").Router();
const gc = require("../controllers/gadgetController");
// list + filter
router.get("/", gc.listGadgets);
// add
router.post("/", gc.createGadget);
// update
router.patch("/:id", gc.updateGadget);
// soft‑delete
router.delete("/:id", gc.decommissionGadget);
// self‑destruct
router.post("/:id/self-destruct", gc.selfDestruct);

module.exports = router;
