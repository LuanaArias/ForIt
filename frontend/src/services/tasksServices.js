const API = "http://localhost:3000/api/tasks";

//Obtener todas las tareas
export const getTasks = async () => {
    const res = await fetch(API);
    if (!res.ok) throw new Error("Error al obtener tareas");
    const data = await res.json();
    return data;
};


//Crear una tarea
export const createTask = async (task) => {
    const res = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });
    const data = await res.json();
    return data;
}

//Actualizar una tarea
export const updateTask = async (id, updateTask) => {
    const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateTask)
    });

    if (!res.ok) throw new Error("Error al actualizar la tarea");

    const data = await res.json();
    return data;
}
//Eliminar una tarea
export const deleteTask = async (id) => {
    const res = await fetch(`${API}/${id}`, {
        method: "DELETE"
    });
     
    if(!res.ok) throw new Error('Error en la solicitud al eliminar una tarea')
    
    const data = await res.json();
    return data;
}