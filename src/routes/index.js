const todoRouter = require('./todoRouter');
const userRouter = require('./userRouter');

const setupRouter = (app) => {
    app.use('/api/todos', todoRouter);
    app.use('/api/users', userRouter);
}

module.exports = setupRouter;