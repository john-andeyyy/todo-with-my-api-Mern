const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const AuthController = require("../controller/AuthController");
const AuthChecker = require("../middleware/authChecker");

// router.get("/", TodoController.ViewTodo);
router.post("/login", AuthController.login);
router.post("/register", AuthController.RegisterUser);
router.get("/profile", AuthChecker.verifyToken, UserController.getProfile);

router.post("/Logout", AuthController.Logout);
module.exports = router;
