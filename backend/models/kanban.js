const mongoose = require("mongoose");

const kanbanSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  dueDate: String,
  completed: Boolean,
  stageId: String,
  users: [
    {
      email: String,
      username: String,
      password: String,
      avatarUrl: String,
      role: String,
    },
  ],
  createdAt: String,
  updatedAt: String,
});

const kanbanModel = new mongoose.model("kanban", kanbanSchema);
module.exports = kanbanModel;
