import { useState, useEffect } from "react";
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from "../../services/tasksServices.js"

import { TaskItem } from "../TaskItem/TaskItem.jsx";
import { TaskForm } from "../TaskForm/TaskForm.jsx";


export function TaskList(){
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    const cargarTareas = async () => {
        const data = await getTasks();
        setTasks(data);
    }

    useEffect(() =>{
        cargarTareas();
    }, [])

    const handleSubmit = async (task) => {
        if (editingTask) {
            await updateTask(editingTask.id, task);
            setEditingTask(null);
        } else { 
            await createTask(task);
        }
        cargarTareas();
    }

    const handleEdit = (task) => {
        setEditingTask(task);
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        setTasks(prev => prev.filter(t => t.id !== id)); 
    };

    const handleToggle = async (task) => {
    await updateTask(task.id, {
        title: task.title,
        description: task.description,
        completed: task.completed ? 0 : 1
    });

    cargarTareas();
};
    return(
        <section>
            <div className="container py-5">
                <h1 className="h5 fw-bold mb-4 text-secondary text-center">Mis tareas</h1>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                    
                        <TaskForm onSubmit={handleSubmit} editingTask={editingTask}/>
                        <div className="mt-5">
                            {tasks.map( t => ( 
                            <TaskItem key={t.id} task={t} onDelete={handleDelete} onEdit={handleEdit} onToggle={handleToggle}/> ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}