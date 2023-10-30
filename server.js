const express = require('express');
const cors = require('cors');
const todoRouter = require('./src/routes/todoRouter.js');
const userRouter = require('./src/routes/userRouter.js');
const authRouter = require('./src/routes/authRoute.js');
const authMiddleware = require('./src/middlewares/authMiddleware.js');
const bodyParser = require('body-parser');
require('dotenv').config()
// const setupRouter = require('./routes/index.js');

const app = express();

var corOptions = {
    origin: 'https://localhost:8080'
};

// middlewares
app.use(cors(corOptions));
app.use(express.json()) // For json format of requests and responses
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json()) // For parsing request body
app.use(bodyParser.urlencoded({ extended: true }));

// ping api
app.get('/', authMiddleware, (req, res) => {
    res.json({
        message: "Hello from api"
    });
});

// router
// setupRouter(app);
app.use('/api/todos', todoRouter);
app.use('/api/users', userRouter);
app.use('/api', authRouter);
// port 
const PORT = process.env.PORT || 8080;

// server
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});