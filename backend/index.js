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
  const { email, username, password, role } = req.body;
  const avatarUrl = "link";

  let repeatedEmail = await User.findOne({ email });
  if (repeatedEmail) {
    res.status(409).json({ error: "Account with same email alrady exists" });
  } else {
    let data = new User({
      email,
      username,
      password,
      avatarUrl,
      role,
    });
    let result = await data.save();
    result = result.toObject();

    delete result.password;

    res.status(200).json({
      success: true,
      data: result,
    });
  }
});

app.post("/login", async (req, res) => {
  if (!req.body.username && !req.body.password) {
    res.status(400).json({ error: "Enter required fields " });
  }

  let data = await User.findOne(req.body).select("-password");
  if (!data) {
    res.status(400).json({ success: false, error: "Enter Valid Information" });
  }

  res.status(200).json({ success: true, data: data.toObject() });
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

app.post("/addTask", async (req, res) => {
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
