import { useState } from "react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth } from "../../../firebase.js";
import { sendPasswordResetEmail } from "firebase/auth";
import './EmailForm.css'

export default function EmailForm() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(""); 

  const handleSubmit = async () => {
    setError(""); 

    try {
      if (isRegister) {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(res.user, {
          displayName: name
        });

      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

    } catch (error) {
      console.error(error.code);

      //  errores 
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("Este email ya está registrado");
          break;
        case "auth/invalid-email":
          setError("El email no es válido");
          break;
        case "auth/user-not-found":
          setError("No existe una cuenta con este email");
          break;
        case "auth/wrong-password":
          setError("Contraseña incorrecta");
          break;
        case "auth/weak-password":
          setError("La contraseña debe tener al menos 6 caracteres");
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          setError("Email o contraseña incorrectos");
          break;
        default:
          setError("Ocurrió un error, intentá de nuevo");
      }
    }
  };
 
  //Para poder resetear la contraseña en caso de olvidarla
  const handleResetPassword = async () => {
    if (!email) {
      setError("Ingresá tu email para recuperar la contraseña");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setError("Te enviamos un email para restablecer tu contraseña");
    } catch (error) {
      console.error(error.code);

      if (error.code === "auth/user-not-found") {
        setError("No existe una cuenta con ese email");
      } else {
        setError("Error al enviar el email");
      }
    }
  };
  return (
    <div className="email-form">

      {isRegister && (
        <input
          type="text"
          placeholder="Nombre"
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
      />

      <p className="reset-password" onClick={handleResetPassword}>
        ¿Olvidaste tu contraseña?
      </p>

      <button onClick={handleSubmit}>
        {isRegister ? "Registrarse" : "Ingresar"}
      </button>

      {/* 👇 ERROR VISUAL */}
      {error && <p className="error-message">{error}</p>}

      <p className="toggle" onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Ya tengo cuenta" : "Crear cuenta"}
      </p>
    </div>
  );
}
