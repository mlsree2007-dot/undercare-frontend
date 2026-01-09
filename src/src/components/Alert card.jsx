import React from "react";

export default function AlertCard({ alert }) {
  const riskClass = (alert.risk || "green").toLowerCase();
  return (
    <div className={`alert-card ${riskClass}`}>
      <h4>Patient: {alert.patientName || "—"}</h4>
      <p><strong>Risk:</strong> {alert.risk}</p>
      <p><strong>qSOFA:</strong> {alert.qsofa}</p>
      {alert.reasons && <ul>{alert.reasons.map((r, i) => <li key={i}>{r}</li>)}</ul>}
      {alert.location && <p><strong>Location:</strong> {alert.location}</p>}
      <p style={{ fontSize: "12px", color: "#555" }}>Created: {new Date(alert.createdAt || Date.now()).toLocaleString()}</p>
    </div>
  );
}
