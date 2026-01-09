import React, { useState, useEffect } from "react";
import { uploadVitals, getPatientAlerts } from "../api";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function PatientDashboard({ session }) {
  const [vitals, setVitals] = useState({
    temperature: "",
    heartRate: "",
    respiratoryRate: "",
    bloodPressure: ""
  });
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!session?.id) return;
    getPatientAlerts(session.id).then(res => setHistory(res.data));
  }, [session]);

  const handleChange = (e) => {
    setVitals({ ...vitals, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await uploadVitals({ ...vitals, patientId: session?.id }, session?.token);
      alert("Vitals updated successfully!");
      setVitals({ temperature: "", heartRate: "", respiratoryRate: "", bloodPressure: "" });
      getPatientAlerts(session.id).then(res => setHistory(res.data));
    } catch (err) {
      alert("Failed to update vitals");
    }
  };

  const labels = history.map(h => new Date(h.createdAt || Date.now()).toLocaleDateString());
  const chartData = {
    labels,
    datasets: [
      {
        label: "qSOFA Score",
        data: history.map(h => h.qsofa || 0),
        borderColor: "#008080",
        backgroundColor: "rgba(0,128,128,0.2)",
        tension: 0.3
      }
    ]
  };

  return (
    <div className="container">
      <h2>Patient Dashboard</h2>
      <div className="card">
        <p>Update your vitals manually below:</p>
        <input type="text" name="temperature" placeholder="Temperature (°C)" value={vitals.temperature} onChange={handleChange} />
        <input type="text" name="heartRate" placeholder="Heart Rate (bpm)" value={vitals.heartRate} onChange={handleChange} />
        <input type="text" name="respiratoryRate" placeholder="Respiratory Rate (/min)" value={vitals.respiratoryRate} onChange={handleChange} />
        <input type="text" name="bloodPressure" placeholder="Blood Pressure (mmHg)" value={vitals.bloodPressure} onChange={handleChange} />
        <button onClick={handleSubmit}>Update Vitals</button>
      </div>

      <div className="card">
        <h3>My qSOFA History</h3>
        {history.length > 0 ? <Line data={chartData} /> : <p>No history yet.</p>}
      </div>
    </div>
  );
}
