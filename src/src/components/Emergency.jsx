import React, { useState, useEffect } from "react";
import { getNearbyHospitals, bookEmergency } from "../api";

export default function Emergency({ session, guardianToken }) {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNearbyHospitals().then(res => setHospitals(res.data));
  }, []);

  const handleBook = async (hospital) => {
    setLoading(true);
    try {
      const res = await bookEmergency({
        patientName: session?.name || "Anonymous",
        qsofaScore: 3,
        location: hospital.location,
        guardianToken, // FCM token from guardian device
      });
      alert(res.data.message || "Emergency booked");
    } catch (e) {
      alert("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>🚨 Emergency Sepsis Check</h2>
      <p>High risk detected. Nearby hospitals:</p>
      <div className="grid">
        {hospitals.map((h, i) => (
          <div key={i} className="card">
            <h3>{h.name}</h3>
            <p>{h.location}</p>
            <p>📞 {h.phone}</p>
            <button disabled={loading} onClick={() => handleBook(h)}>Book Emergency Slot</button>
          </div>
        ))}
      </div>
    </div>
  );
}
