const express = require("express");
const cors = require("cors");
const todoRouter = require("./src/routes/todoRouter.js");
const userRouter = require("./src/routes/userRouter.js");
const authRouter = require("./src/routes/authRoute.js");
const authMiddleware = require("./src/middlewares/authMiddleware.js");
const bodyParser = require("body-parser");
const {
  logger,
  infoLevelLogging,
} = require("./src/middlewares/loggingMiddleware.js");
require("dotenv").config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json()); // For json format of requests and responses
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // For parsing request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(infoLevelLogging);

// ping api
app.get("/", authMiddleware, (req, res) => {
  res.json({
    message: "Hello from api",
  });
});

// router
// setupRouter(app);
app.use("/api/todos", todoRouter);
app.use("/api/users", userRouter);
app.use("/api", authRouter);
// port
const PORT = process.env.PORT || 8080;

// server
app.listen(PORT, () => {
  logger.log("info", `App listening on port ${PORT}!`);
});
