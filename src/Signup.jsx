import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-page");
    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        setSuccess("Account created! You can now log in.");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        const data = await res.json();
        setError(data.message || "Signup failed");
      }
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-heading">Sign Up</h1>
      <form onSubmit={handleSignup}>
        <h2 className="email-heading">Username</h2>
        <input
          type="text"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <h2 className="password-heading">Password</h2>
        <input
          type="password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Create Account</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {success && <div style={{ color: "green" }}>{success}</div>}
      </form>
      <div style={{ marginTop: "1rem" }}>
        Already have an account?{" "}
        <a href="/login" style={{ color: "#007bff", textDecoration: "underline" }}>
          Login
        </a>
      </div>
    </div>
  );
}

export default Signup;
