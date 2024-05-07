const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware.js");
const express = require("express");

const router = express.Router();

router.post("/", userController.createUser);
router.get("/me", authMiddleware, userController.getCurrentUser);
router.get("/:id", authMiddleware, userController.getUserByID);
router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;
