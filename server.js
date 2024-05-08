const express = require('express');
const cors = require('cors');
const setupRouter = require('./src/routes/index.js');
const errorHandler = require('./src/middlewares/errorHandling.middlware.js');
const bodyParser = require('body-parser');

const {
    logger,
    infoLevelLogging,
} = require('./src/middlewares/logging.middleware.js');
require('dotenv').config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json()); // For json format of requests and responses
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // For parsing request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(infoLevelLogging);

// ping api
app.get('/', (req, res) => {
    res.json({
        message: 'Hello from api',
    });
});

// router
setupRouter(app);

// Error hanlding
app.use(errorHandler);

// port
const PORT = process.env.PORT || 8080;

// server
app.listen(PORT, () => {
    logger.log('info', `App listening on port ${PORT}!`);
});
