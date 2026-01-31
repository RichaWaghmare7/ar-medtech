import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export default function Login() {
  const [name, setName] = useState("");
  const [focused, setFocused] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    login(name.trim());
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="login-page">
      <div className="login-bg-shapes">
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
      </div>

      <div className="login-card">
        <div className="login-card-glow" />
        <div className="login-header">
          <span className="login-icon">🧬</span>
          <h1 className="login-title">
            <span className="title-word">AR</span>
            <span className="title-word accent">MedTech</span>
          </h1>
          <p className="login-subtitle">Learn anatomy with AR & 3D models</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className={`input-wrap ${focused || name ? "active" : ""}`}>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder=" "
              autoComplete="off"
            />
            <label htmlFor="name">Your name</label>
          </div>
          <button type="submit" className="btn-login" disabled={!name.trim()}>
            <span>Start Learning</span>
            <span className="btn-arrow">→</span>
          </button>
        </form>

        <p className="login-hint">No password needed — for student use</p>
      </div>
    </div>
  );
}
