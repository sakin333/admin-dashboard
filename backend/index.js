require("./config/database");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const dealRoutes = require("./routes/dealRoutes");
const companyRoutes = require("./routes/companyRoutes");
const kanbanRoutes = require("./routes/taskRoutes");

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/kanban", kanbanRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
