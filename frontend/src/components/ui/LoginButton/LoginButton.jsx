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
          requireDisplayName: false 
        },
        {
          provider: PhoneAuthProvider.PROVIDER_ID,
          // PARA CELULAR:
          recaptchaParameters: {
            type: 'image',
            size: 'invisible',
            badge: 'bottomright'
          },
          defaultCountry: 'AR'
        }
      ],
      
      signInFlow: 'redirect', 
      callbacks: {
        signInSuccessWithAuthResult: () => {
          return false; 
        },
      },
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