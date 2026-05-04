import { useState, useEffect } from "react";
import { auth } from "../../firebase.js"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { TaskList } from "../../components/TaskList/TaskList";
import { Logo } from "../../components/ui/Logo";
import './Home.css'
import { LoadingScreen } from "../../components/LoadingScreen/LoadingScreen.jsx";
import { WelcomeText } from "../../components/ui/WelcomeText/WelcomeText.jsx";
import Login from "../../components/Auth/Login/Login.jsx";

export function Home(){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setTimeout(() => setLoading(false), 1500);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <main className={user ? "home-container" : "login-page"}>

      <header className="home-header">
        <Logo />
        <p className="app-subtitle">Organizá tu día en segundos</p>

        {user && (
          <button onClick={() => signOut(auth)} className="logout-btn">
            Cerrar Sesión
          </button>
        )}
      </header>

      {!user ? (
        <Login />
      ) : (
        <div className="app-content">
          <WelcomeText name={user.displayName} />
          <TaskList />
        </div>
      )}

    </main>
  );
}