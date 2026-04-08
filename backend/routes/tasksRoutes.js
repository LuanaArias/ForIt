const { Router } = require('express')
const tasksRoutes = Router()
const {
    getTasks,
    postTask,
    updateTask,
    deleteTask
} = require("../controllers/tasksControllers")

tasksRoutes.get("/tasks", getTasks);
tasksRoutes.post("/tasks", postTask);
tasksRoutes.put("/tasks/:id", updateTask);
tasksRoutes.delete("/tasks/:id", deleteTask);

module.exports = tasksRoutes;