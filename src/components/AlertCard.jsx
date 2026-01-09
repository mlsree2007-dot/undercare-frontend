import React from "react";

export default function AlertCard({ alert }) {
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 12, marginBottom: 10 }}>
      <h4 style={{ margin: 0, color: "#b22222" }}>{alert.type}</h4>
      <p style={{ margin: "4px 0" }}>Severity: <strong>{alert.severity}</strong></p>
      <p style={{ margin: "4px 0", fontSize: "0.9em", color: "#555" }}>
        {alert.timestamp}
      </p>
    </div>
  );
}
