import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-page");
    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        const data = await res.json();
        // Redirect based on user role
        if (data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/"); // or another page for regular users
        }
      } else {
        const data = await res.json();
        setError(data.message || "Login failed");
      }
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-heading">Login</h1>
      <form onSubmit={handleLogin}>
        <h2 className="email-heading">Username</h2>
        <input
          type="text"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        ></input>
        <h2 className="password-heading">Password</h2>
        <input
          type="password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <button type="submit">Login</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
      <div style={{ marginTop: "1rem" }}>
        Don't have an account yet?{" "}
        <a
          href="/signup"
          style={{ color: "#007bff", textDecoration: "underline" }}
        >
          Create an account
        </a>
      </div>
    </div>
  );
}

export default Login;
