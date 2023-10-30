const todoService = require('../services/todoService');

const createTodo = async (req, res) => {
    const newTodo = {
        title: req.body.title,
        status: req.body.status,
        user_id: req.claims.id
    }
    const response = await todoService.createTodo(newTodo);
    res.status(response.statusCode).json(response);
};

const getAllTodos = async (req, res) => {
    const userID = req.claims.id;
    const response = await todoService.getAllTodos(userID);
    res.status(response.statusCode).json(response);
}

const getTodoByID = async (req, res) => {
    const id = req.params.id;
    const userID = req.claims.id;
    const response = await todoService.getTodoByID(userID, id);
    res.status(response.statusCode).json(response);
}

const updateTodo = async (req, res) => {
    const userID = req.claims.id;
    const newTodo = {
        id: req.params.id,
        title: req.body.title,
        status: req.body.status
    }
    const response = await todoService.updateTodo(userID, newTodo);
    res.status(response.statusCode).json(response);

}

const deleteTodo = async (req, res) => {
    const id = req.params.id;
    const userID = req.claims.id;
    const response = await todoService.deleteTodo(userID, id);
    res.status(response.statusCode).json(response);
}

module.exports = {
    createTodo,
    getAllTodos,
    getTodoByID,
    updateTodo,
    deleteTodo
};