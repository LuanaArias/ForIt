import GoogleButton from "../GoogleButton/GoogleButton";
import EmailForm from "../EmailForm/EmailForm";
import "./Login.css";

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Bienvenido/a</h2>
        <p>Qué bueno verte de nuevo</p>

        <GoogleButton />

        <div className="divider">
          <span>o</span>
        </div>

        <EmailForm />
      </div>
    </div>
  );
}