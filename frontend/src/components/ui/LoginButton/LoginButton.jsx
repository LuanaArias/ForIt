import React, { useEffect } from "react";
import { auth } from "../../../firebase.js";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { 
  GoogleAuthProvider, 
  EmailAuthProvider, 
  PhoneAuthProvider
} from "firebase/auth";
import './LoginButton.css'
export default function LoginButton() {
  useEffect(() => {
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    
    ui.start("#firebaseui-auth-container", {
      signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
        {
          provider: EmailAuthProvider.PROVIDER_ID,
          // Esto obliga a que si el mail ya existe, pida login en vez de crear cuenta
          requireDisplayName: false 
        },
        PhoneAuthProvider.PROVIDER_ID
      ],
      signInFlow: 'popup',
      callbacks: {
        signInSuccessWithAuthResult: () => {
          // El login fue exitoso, el "escucha" en Home hará el resto
          return false; 
        },
        signInFailure: (error) => {
          // Aquí podés "advertir" si algo salió mal
          console.error("Error en el login:", error);
          if (error.code === 'auth/account-exists-with-different-credential') {
            alert("Este mail ya está asociado a otro método (ej: Google). Entrá con ese.");
          }
        }
      },
      // Evita problemas de duplicidad al recargar el componente
      credentialHelper: firebaseui.auth.CredentialHelper.NONE 
    });
  }, []);

  return (
    <div className="login-container">
        <div className="login-box">
            <div id="firebaseui-auth-container"></div>
        </div>
    </div>
    
  );
}