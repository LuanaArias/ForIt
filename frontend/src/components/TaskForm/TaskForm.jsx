import { useEffect } from "react";
import { useState } from "react";

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
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h3 className="card-title mb-4">
                        {editingTask ? "Editar tarea" : "Nueva tarea"}
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="taskTitle" className="form-label">
                                Título de la tarea
                            </label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="taskTitle"
                                placeholder="Titulo"
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="taskDesc" className="form-label">
                                Descripción
                            </label>
                            <textarea 
                                className="form-control" 
                                id="taskDesc" 
                                rows="3"
                                placeholder="Descripcion"
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <button 
                                type="submit" 
                                className={`btn ${editingTask ? 'btn-warning' : 'btn-primary'}`}
                            >
                                {editingTask ? "Guardar Cambios" : "Crear Tarea"}
                            </button>
                            
                            {editingTask && (
                                <button 
                                    type="button" 
                                    className="btn btn-outline-secondary"
                                    onClick={() => { setTitle(""); setDescription(""); }}
                                >
                                    Cancelar
                                </button>
                            )}
                        </div>
                </form>
                </div>
                
            </div>
            
        </div>
        
    )
}