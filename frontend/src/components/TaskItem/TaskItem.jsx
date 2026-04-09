export function TaskItem({ task , onDelete, onEdit, onToggle }){
    return(
        <div className="card w-100 mb-3 shadow-sm">
            <div className="card-body">
                <div className="form-check mb-2">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={Boolean(task.completed)}
                        onChange={() =>
                            onToggle(task)
                        }
                    />
                    <label className="form-check-label">
                        {task.completed == 1 ? "Completada" : "Pendiente"}
                    </label>
                </div>
                <h4 className="card-title text-capitalize">{task.title}</h4>
                <p className="card-text text-muted">{task.description}</p>

                <div className="d-flex gap-2">
                    <button className="btn btn-outline-primary btn-sm" onClick={() => onEdit(task)}>
                        Editar
                    </button>

                    <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(task.id)}>
                        <i className="bi bi-trash me-1"></i>Eliminar
                    </button>
                </div>
            </div>        
        </div>
    )
}