import { useEffect } from "react";
import "./login.css";

function Login() {
  useEffect(() => {
    document.body.classList.add("login-page");
    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  return (
    <div className="login-container">
      <h1 className="login-heading">Login</h1>
      <h2 className="email-heading">Email</h2>
      <input type="text" className="input-field"></input>
      <h2 className="password-heading">Password</h2>
      <input type="password" className="input-field"></input>
      <button>Login In</button>
    </div>
  );
}

export default Login;
