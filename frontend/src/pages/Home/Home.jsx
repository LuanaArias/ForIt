import { useState, useEffect } from "react";
import { auth } from "../../firebase.js"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { TaskList } from "../../components/TaskList/TaskList";
import LoginButton from "../../components/ui/LoginButton/LoginButton.jsx";
import { Logo } from "../../components/ui/Logo";
import './Home.css'
import { LoadingScreen } from "../../components/LoadingScreen/LoadingScreen.jsx";
export function Home(){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            const timer = setTimeout(() => {
                setLoading(false);
            }, 1500);
            return () => {
                unsubscribe();
                clearTimeout(timer);
            };
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        signOut(auth);
    };

    if (loading) return <div className="home-container"><LoadingScreen /></div>;
    return (
       <main className="home-container">
            {!user ? (
                /* VISTA PARA USUARIOS NO LOGUEADOS */
                <div className="login-wrapper">
                    <header className="home-header">
                        <Logo />
                        <p className="app-subtitle">Gestor de tareas profesional</p>
                    </header>
                    <LoginButton /> 
                </div>
            ) : (
                /* VISTA PARA USUARIOS LOGUEADOS */
                <div className="app-content">
                    <header className="home-header">
                        <div className="user-info">
                            <Logo />
                            <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
                        </div>
                        <h1 className="home-title"><span>Bienvenido/a, <b>{user.displayName || "Usuario"}</b></span></h1>
                    </header>
                    <TaskList />
                </div>
            )}
        </main>
    )
}