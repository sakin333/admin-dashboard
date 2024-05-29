const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");

router.get("/getTasks", taskController.getTasks);
router.post("/addTask", taskController.addTask);
router.post("/updateTask", taskController.updateTasks);
router.delete("/deleteTask", taskController.deleteTask);

module.exports = router;
