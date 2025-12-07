const express = require("express");
const router = express.Router();

const {verifyToken, verifyAdmin} = require("../middlewares/authMiddleware");
const adminController = require("../controllers/adminController");

// apply middleware to all routes in this file
router.use(verifyToken);
router.use(verifyAdmin);

router.post("/classroom", adminController.createClassroom);
router.post("/batch", adminController.createBatch);
router.post("/subject", adminController.createSubject);
router.post("/faculty", adminController.createFaculty);
router.post("/student", adminController.createStudent);

module.exports = router;