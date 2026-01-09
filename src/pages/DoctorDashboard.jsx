import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import { getDoctorAlerts } from "../api";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function DoctorDashboard({ session }) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!session?.id) return;
    getDoctorAlerts(session.id).then(res => setAlerts(res.data));
  }, [session]);

  const labels = alerts.map(a => new Date(a.createdAt || Date.now()).toLocaleDateString());
  const qsofaData = {
    labels,
    datasets: [{
      label: "qSOFA Score",
      data: alerts.map(a => a.qsofa),
      borderColor: "#008080",
      backgroundColor: "rgba(0,128,128,0.2)",
      tension: 0.3
    }]
  };

  const riskCounts = alerts.reduce((acc, a) => {
    const key = (a.risk || "Unknown");
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const riskData = {
    labels: Object.keys(riskCounts),
    datasets: [{
      label: "Risk Levels",
      data: Object.values(riskCounts),
      backgroundColor: ["red", "orange", "green", "#999"]
    }]
  };

  return (
    <div className="container">
      <h2>Doctor Dashboard</h2>
      <div className="card">
        <h3>qSOFA Trend</h3>
        <Line data={qsofaData} />
      </div>
      <div className="card">
        <h3>Risk Distribution</h3>
        <Bar data={riskData} />
      </div>
    </div>
  );
}
