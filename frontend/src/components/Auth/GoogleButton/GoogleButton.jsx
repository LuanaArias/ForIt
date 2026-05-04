import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../firebase.js";
import './GoogleButton.css'
export default function GoogleButton() {

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <button className="google-btn" onClick={handleGoogleLogin}>
      Continuar con Google
    </button>
  );
}