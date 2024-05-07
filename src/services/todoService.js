const db = require("../models/index");
const TodoModel = db.todos;

const createTodo = async (todo) => {
  const createdTodo = await TodoModel.create(todo);
  return {
    message: "Create todo successfully",
    error: false,
    statusCode: 200,
    data: {
      todo: createdTodo,
    },
  };
};

const getAllTodos = async (userID) => {
  const result = await TodoModel.findAll({
    where: {
      user_id: userID,
    },
    order: [["createdAt", "ASC"]],
  });
  return {
    message: "Get all todos successfully",
    error: false,
    statusCode: 200,
    data: {
      todo: result,
    },
  };
};

const getTodoByID = async (userID, id) => {
  const result = await TodoModel.findOne({
    where: {
      user_id: userID,
      id: id,
    },
  });
  return {
    message: "Get todo by ID successfully",
    error: false,
    statusCode: 200,
    data: {
      todo: result,
    },
  };
};

const updateTodo = async (userID, newTodo) => {
  let oldTodo = await TodoModel.findOne({
    where: {
      id: newTodo.id,
      user_id: userID,
    },
  });

  if (!oldTodo) {
    return {
      message: "Todo not found",
      error: true,
      statusCode: 404,
    };
  }

  if (newTodo.title) {
    oldTodo.title = newTodo.title;
  }
  if (newTodo.status) {
    oldTodo.status = newTodo.status;
  }

  const savedTodo = await oldTodo.save();
  return {
    message: "Update todo successfully",
    error: false,
    statusCode: 200,
    data: savedTodo,
  };
};

const deleteTodo = async (userID, id) => {
  await TodoModel.destroy({
    where: {
      user_id: userID,
      id: id,
    },
  });
  return {
    message: "Delete todo successfully",
    error: false,
    statusCode: 200,
  };
};

module.exports = {
  createTodo,
  getAllTodos,
  getTodoByID,
  updateTodo,
  deleteTodo,
};
