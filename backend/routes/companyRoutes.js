const express = require("express");
const router = express.Router();
const companyController = require("../controller/companyController");

router.get("/companies", companyController.companies);
router.post("/editCompany", companyController.editCompany);
router.delete("/deleteCompany", companyController.deleteCompany);

module.exports = router;
