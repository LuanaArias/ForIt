import { TaskList } from "../../components/TaskList/TaskList";


export function Home(){
    return (
       <main>
            <header className="text-center pt-5 mb-5">
                <h1 className="display-4 fw-bold text-primary">ForIt Challenge</h1>
                <p className="text-muted">Gestor de tareas profesional</p>
            </header>
            <TaskList />
        </main> 
    )
}