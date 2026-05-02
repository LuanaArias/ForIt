import { useEffect } from "react";
import { useState } from "react";
import './TaskForm.css'
export function TaskForm({ onSubmit, editingTask }){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() =>{
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
        }
    }, [editingTask])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title) return;

        onSubmit({
            title,
            description
        });

        setTitle("");
        setDescription("");
    }

    return(
        <div className="task-form-card">
            <h3 className="task-form-title">
                {editingTask ? "Editar tarea" : "Nueva tarea"}
            </h3>

            <form onSubmit={handleSubmit} className="task-form">

                <div className="form-group">
                    <label htmlFor="taskTitle">
                        Título de la tarea
                    </label>
                    <input 
                        type="text"
                        id="taskTitle"
                        placeholder="Título"
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="taskDesc">
                        Descripción
                    </label>
                    <textarea 
                        id="taskDesc"
                        rows="3"
                        placeholder="Descripción"
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-primary">
                        {editingTask ? "Guardar Cambios" : "Crear Tarea"}
                    </button>

                    {editingTask && (
                        <button 
                            type="button"
                            className="btn-secondary"
                            onClick={() => { setTitle(""); setDescription(""); }}
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}