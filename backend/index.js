require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require("./config/db");

//Routing File 
const userRouter = require("./routes/user.routes")
const projectRouter = require("./routes/project.routes");
const skillRouter = require("./routes/skill.routes");

const port = process.env.PORT || 5000;
const app = express();

//connect db
connectDB();

//middlewares
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/skill", skillRouter);
app.use("/project", projectRouter)

module.exports = app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})