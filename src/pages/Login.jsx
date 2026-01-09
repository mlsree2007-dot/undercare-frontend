import React, { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";
import { requestFcmToken } from "../firebase";

export default function Login({ setSession, setGuardianToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login({ email, password, role });
      const data = res.data;
      setSession({ token: data.token, role: data.user.role, id: data.user._id, name: data.user.name });

      if (data.user.role === "guardian") {
        const token = await requestFcmToken(process.env.REACT_APP_FB_VAPID_KEY);
        if (token) setGuardianToken(token);
      }
      navigate(`/${data.user.role}`);
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 420, margin: "40px auto" }}>
        <img src="/loga.png" alt="UnderCare Logo" style={{ height: 60 }} />
        <h2>UnderCare</h2>
        <p>Transparent Sepsis Screening</p>
        <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="">Select your role</option>
          <option value="admin">Admin</option>
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
          <option value="guardian">Guardian</option>
        </select>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
