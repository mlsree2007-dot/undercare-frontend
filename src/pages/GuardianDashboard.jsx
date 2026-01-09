import React, { useEffect, useState } from "react";
import { getGuardianAlerts } from "../api";
import AlertCard from "../components/AlertCard";
import { subscribeForegroundMessages } from "../firebase";

export default function GuardianDashboard({ session }) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!session?.id) return;
    getGuardianAlerts(session.id).then(res => setAlerts(res.data));
    subscribeForegroundMessages((payload) => {
      const { notification } = payload;
      const newAlert = {
        patientName: "Patient",
        risk: "High",
        qsofa: 3,
        reasons: [notification?.body || "Emergency alert"],
        createdAt: Date.now()
      };
      setAlerts(prev => [newAlert, ...prev]);
    });
  }, [session]);

  return (
    <div className="container">
      <h2>Guardian Dashboard</h2>
      <div className="card">
        <p>Live notifications appear here and as push alerts.</p>
      </div>
      {alerts.map((a, i) => <AlertCard key={i} alert={a} />)}
    </div>
  );
}
