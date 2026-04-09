const db = require("../db");

//Muestra tareas (Get)
const getTasks = (req, res) => {
    db.all(`SELECT * FROM tasks`, [], (error, tasks) => {
        if (error) {
            res.status(500).json({error: error.message})
        }
        res.status(200).json(tasks)
    })
}

//Crear una tarea (Post)
const postTask = (req, res) => {
    const {title, description} = req.body;
    const id = Date.now().toString();
    const createdAt = new Date().toISOString();

    db.run(
        `INSERT INTO tasks (id, title, description, completed, createdAt)
        VALUES (?, ?, ?, ?, ?)`,
        [id, title, description, 0, createdAt],
        function (error){
            if (error){
                return res.status(500).json({error: error.message})
            }
            
            res.status(201).json({
                id,
                title,
                description,
                completed: 0,
                createdAt
            })
        }
    )
}

//Actualizar una tarea (Put)
const updateTask = (req, res) => {
    const { id } = req.params;
    const {title, description, completed} = req.body;
    db.run(
        `UPDATE tasks
        SET title = ?, description = ?, completed = ?
        WHERE id = ?
        `,
        [title, description, completed ?? 0, id],
    
        function (error){
            if (error){
                return res.status(500).json({error: error.message})
            }
            
            res.status(201).json({
                id,
                title,
                description,
                completed
            })
        }
    )
}

//Eliminar una tarea (Delete)
const deleteTask = (req, res) => {
    const {id} = req.params;

    db.run(
        `DELETE FROM tasks WHERE id = ?`,
        [id],
        function (error){
            if (error){
                return res.status(500).json({error: error.message})
            }
            
            res.status(201).json({ message: "Tarea eliminada" })
        }
    )
}

module.exports = {
    getTasks,
    postTask,
    updateTask,
    deleteTask
}