const Kanban = require("../models/kanban");
const stages = require("../utils/stages");

exports.getTasks = async (req, res) => {
  try {
    const result = await Kanban.find();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "No task found",
    });
  }
};

exports.addTask = async (req, res) => {
  try {
    if (
      !req.body.id &&
      !req.body.title &&
      !req.body.description &&
      !req.body.dueDate &&
      !req.body.completed &&
      !req.body.stageId &&
      !req.body.users &&
      !req.body.createdAt &&
      !req.body.updatedId
    ) {
      req.status(400).json({ error: "Please enter required fields" });
    }

    let repeatedTask = await Kanban.findOne({ title: req.body.title });
    if (repeatedTask) {
      res.status(409).json({ error: "Task with same task already exists" });
    }

    let data = new Kanban({ ...req.body });

    let result = await data.save();
    result = result.toObject();

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ error: "Error adding task" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    if (!req.query.taskId) {
      return res.status(400).json({ error: "Task ID required" });
    }

    let data = await Kanban.findOne({ _id: req.query.taskId });
    if (!data || !req.body.activeTaskStageId || !req.body.overColumnId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let result = await Kanban.findOneAndUpdate(
      { _id: req.query.taskId },
      {
        $set: {
          stageId: req.body.overColumnId,
          stage: stages.find(
            (stage) => stage.stageId === req.body.activeTaskStageId
          ).value,
        },
      },
      { new: true }
    );

    res.status(200).json({ success: true, data: result.toObject() });
  } catch (error) {
    console.log("Error: ", error);
    res.status(400).json({ error: "Error updating task" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    if (!req.query.taskId) {
      return res.status(400).json({ error: "Task ID required" });
    }

    let data = await Kanban.findOne({ _id: req.query.taskId });
    if (!data) {
      return res.status(400).json({ error: "No task found" });
    }

    await Kanban.deleteOne({ _id: req.query.taskId });
    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
};
