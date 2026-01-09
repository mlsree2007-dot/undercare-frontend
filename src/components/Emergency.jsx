import React from "react";

export default function Emergency() {
  const handleEmergency = () => {
    alert("🚨 Emergency alert triggered! (Mock flow for demo)");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ color: "#b22222" }}>Emergency Mode</h2>
      <p>If you are outside a hospital, press the button below to connect to nearby facilities.</p>
      <button
        onClick={handleEmergency}
        style={{ backgroundColor: "#ff0000", color: "white", padding: "12px 20px", borderRadius: 8, border: "none", fontWeight: "bold" }}
      >
        Trigger Emergency Alert
      </button>
    </div>
  );
}
