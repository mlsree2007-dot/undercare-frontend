import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Nav({ session, setSession }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setSession(null);
    navigate("/");
  };

  return (
    <nav style={{ backgroundColor: "#008080", padding: "12px 20px", display: "flex", justifyContent: "space-between", color: "white" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img src="/logo.png" alt="UnderCare" style={{ height: 28, borderRadius: 6 }} />
        <strong>UnderCare</strong>
      </div>
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
        <Link to="/emergency" style={{ color: "white", textDecoration: "none", fontWeight: 700 }}>Emergency</Link>
        {session?.role && (
          <Link to={`/${session.role}`} style={{ color: "white", textDecoration: "none" }}>
            {session.role} Dashboard
          </Link>
        )}
        {session && (
          <button onClick={handleLogout} style={{ padding: "6px 12px", borderRadius: 6 }}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
