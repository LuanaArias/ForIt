let tasks = [];

//Muestra tareas (Get)
const getTasks = (req, res) => {
    try{
        res.status(200).json(tasks);
    } catch (error) {
        console.error(`Error al obtener las tareas: ${error}`);
        res.status(500).json({ error: "Error al obtener las tareas" });
    }
}

//Crear una tarea (Post)
const postTask = (req, res) => {
    try{
        const newTask =  {
            id: Date.now().toString(),
            title: req.body.title,
            description: req.body.description,
            completed: false,
            createdAt: newDate()
        };
        tasks.push(newTask);
        res.status(201).json(newTask);
    } catch (error) {
        console.error(`Error al crear la tarea: ${error}`);
        res.status(500).json({ error: "Error al crear la tarea" });
    }
}

//Actualizar una tarea (Put)
const updateTask = (req, res) => {
    const { id } = req.params;
    try {
        tareaEncontrada = tasks.map( t => t.id === id ? { ...t, ...req.body } : t );
        res.status(200).json({ message: "Tarea actualizada" })
    } catch (error) {
        console.error(`Error al actualizar la tarea: ${error}`);
        res.status(500).json({ error: "Error al actualizar la tarea" });
    }
}

//Eliminar una tarea (Delete)
const deleteTask = (req, res) => {
    const {id} = req.params;

    try{
        tareasEncontradas = tasks.filter( t => t.id !== id );
        res.status(200).json({ message: "Tarea eliminada" })
    } catch (error){
        console.error(`Error al eliminar la tarea: ${error}`);
        res.status(500).json({ message: "Error al eliminar la tarea" });
    }
}

module.exports = {
    getTasks,
    postTask,
    updateTask,
    deleteTask
}