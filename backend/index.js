require("./database/config");

const User = require("./database/user");
const Events = require("./database/upcomingEvents");
const Deals = require("./database/deals");
const Company = require("./database/company");
const Kanban = require("./database/kanban");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

const stages = [
  {
    stageId: "stage-0",
    value: "UNASSIGNED",
  },
  {
    stageId: "stage-1",
    value: "TODO",
  },
  {
    stageId: "stage-2",
    value: "IN PROGRESS",
  },
  {
    stageId: "stage-3",
    value: "IN REVIEW",
  },
  {
    stageId: "stage-4",
    value: "COMPLETE",
  },
];

app.post("/register", async (req, res) => {
  res.json("hello world");
});

app.get("/users", async (req, res) => {
  const result = await User.find();
  if (result) {
    res.status(200).json({
      success: true,
      data: result,
    });
  } else {
    res.status(400).json({
      success: false,
      error: "No users data found",
    });
  }
});

app.get("/eventsList", async (req, res) => {
  const result = await Events.find();
  if (result) {
    res.status(200).json({
      success: true,
      data: result,
    });
  } else {
    res.status(400).json({
      success: false,
      error: "No events data found",
    });
  }
});

app.get("/deals", async (req, res) => {
  const result = await Deals.find();
  if (result) {
    res.status(200).json({
      success: true,
      data: result,
    });
  } else {
    res.status(400).json({
      success: false,
      error: "No deals found",
    });
  }
});

app.get("/companies", async (req, res) => {
  const result = await Company.find();
  if (result) {
    res.status(200).json({
      success: true,
      data: result,
    });
  } else {
    res.status(400).json({
      success: false,
      error: "No Companies found",
    });
  }
});

app.get("/getTasks", async (req, res) => {
  const result = await Kanban.find();
  if (result) {
    res.status(200).json({
      success: true,
      data: result,
    });
  } else {
    res.status(400).json({
      success: false,
      error: "No Task found",
    });
  }
});

app.post("/updateTasks", async (req, res) => {
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
    res.status(400).json({ error: "Error updating task" });
  }
});

app.delete("/deleteTask", async (req, res) => {
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
});

// app.post("/updateTaskData", async (req, res) => {
//   try {
//     if(!req.query.taskId) {
//       res.status(400).json({ error: "Task ID required"})
//     }

//     let data = await Kanban.findOne({ _id: req.query.taskId });
//     if (!data) {
//       return res.status(400).json({ error: "No task found" });
//     }

//     if(!req.body.status && !req.body.title && !req.body.description)

//   } catch (error) {

//   }
// })

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
