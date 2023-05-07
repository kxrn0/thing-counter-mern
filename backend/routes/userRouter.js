const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.sign_up);

router.post("/login", userController.log_in);

module.exports = router;
