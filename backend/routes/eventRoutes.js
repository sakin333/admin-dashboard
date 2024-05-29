const express = require("express");
const router = express.Router();
const eventsController = require("../controller/eventController");

router.get("/eventsList", eventsController.eventsList);

module.exports = router;
