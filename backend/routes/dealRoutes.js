const express = require("express");
const router = express.Router();
const dealController = require("../controllers/dealController");

router.get("/deals", dealController.deals);

module.exports = router;
