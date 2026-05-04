import { signOut } from "firebase/auth";
import { auth } from "../../firebase.js";
import { Logo } from "../ui/Logo.jsx";
import "./Header.css";

export function Header({ user }) {
  return (
    <header className="home-header">
      {!user ? (
        <>
          <Logo />
          <p className="app-subtitle">Organizá tu día en segundos</p>
        </>
      ) : (
        <div className="header-bar">
          <Logo />
          <button onClick={() => signOut(auth)} className="logout-btn">
            Cerrar Sesión
          </button>
        </div>
      )}
    </header>
  );
}