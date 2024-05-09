const {
    CreatedResponse,
    OKResponse,
    NotFoundErrorResponse,
    BadRequestErrorResponse,
    ForbidenErrorResponse,
} = require('../global/response');
const db = require('../models/index');
const TodoModel = db.todos;

const createTodo = async (todo) => {
    const existedTodo = await TodoModel.findOne({
        where: {
            title: todo.title,
        }
    });
    if (existedTodo) {
        return new BadRequestErrorResponse("Todo is existed");
    }


    const createdTodo = await TodoModel.create(todo);
    return new CreatedResponse('Create todo successfully', {
        todo: createdTodo,
    });
};

const getAllTodos = async (userID) => {
    const result = await TodoModel.findAll({
        where: {
            user_id: userID,
        },
        order: [['createdAt', 'ASC']],
    });

    return new OKResponse('Get all todos successfully', {
        todo: result,
    });
};

const getTodoByID = async (userID, id) => {
    const todo = await TodoModel.findOne({
        where: {
            id: id,
        },
    });

    if (!todo) {
        return new NotFoundErrorResponse("Todo not found");
    }

    if (todo.user_id != userID) {
        return new ForbidenErrorResponse("Can not get this todo");
    }

    return new OKResponse('Get todo by ID successfully', {
        todo: result,
    });
};

const updateTodo = async (userID, newTodo) => {
    let oldTodo = await TodoModel.findOne({
        where: {
            id: newTodo.id,
            user_id: userID,
        },
    });

    if (!oldTodo) {
        return new NotFoundErrorResponse('Todo not found');
    }

    if (newTodo.title) {
        oldTodo.title = newTodo.title;
    }
    if (newTodo.status) {
        oldTodo.status = newTodo.status;
    }

    const savedTodo = await oldTodo.save();
    return new OKResponse('Update todo successfully', savedTodo);
};

const deleteTodo = async (userID, id) => {
    await TodoModel.destroy({
        where: {
            id: id,
        },
    });

    if (todo.user_id != userID) {
        return new ForbidenErrorResponse("Can not delete this todo");
    }

    return new OKResponse('Delete todo successfully', null);
};

module.exports = {
    createTodo,
    getAllTodos,
    getTodoByID,
    updateTodo,
    deleteTodo,
};
