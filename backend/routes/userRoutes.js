const express = require("express");
const router = express.Router();
const userController = require("../controller/userContoller");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/getUsers", userController.getUsers);

module.exports = router;
