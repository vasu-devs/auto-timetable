const express = require("express");
const router = express.Router();
const verifyDev = require("../middlewares/devMiddleware");
const devController = require("../controllers/devController");

router.post("/create-admin", verifyDev, devController.createFirstAdmin);
module.exports = router;
