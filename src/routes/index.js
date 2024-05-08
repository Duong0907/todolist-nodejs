const todoRouter = require('./todo.router');
const userRouter = require('./user.router');
const authRouter = require('./auth.router');

const setupRouter = (app) => {
    app.use('/api/todos', todoRouter);
    app.use('/api/users', userRouter);
    app.use('/api/', authRouter);

    // Handling Not found end points
    app.get('*', (req, res, next) => {
        const err = new Error(
            `Can't not find ${req.originalUrl} on the server!`,
        );
        err.statusCode = 404;
        next(err);
    });
};

module.exports = setupRouter;
