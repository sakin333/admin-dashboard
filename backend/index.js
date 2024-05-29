require("./database/config");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const dealRoutes = require("./routes/dealRoutes");
const companyRoutes = require("./routes/companyRoutes");
const kanbanRoutes = require("./routes/kanbanRoutes");

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/kanban", kanbanRoutes);

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
