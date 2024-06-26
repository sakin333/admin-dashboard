const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");

router.get("/getTasks", taskController.getTasks);
router.post("/addTask", taskController.addTask);
router.post("/updateTask", taskController.updateTask);
router.delete("/deleteTask", taskController.deleteTask);
router.post("/editTask", taskController.editTask);

module.exports = router;
