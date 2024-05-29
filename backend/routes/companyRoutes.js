const express = require("express");
const router = express.Router();
const companyController = require("../controller/companyController");

router.get("/companies", companyController.companies);

module.exports = router;
