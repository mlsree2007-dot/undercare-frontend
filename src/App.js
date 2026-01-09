import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import DoctorDashboard from "./pages/DoctorDashboard";
import GuardianDashboard from "./pages/GuardianDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import Nav from "./components/Nav";
import Emergency from "./components/Emergency";

export default function App() {
  const [session, setSession] = useState(null);
  const [guardianToken, setGuardianToken] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setSession={setSession} setGuardianToken={setGuardianToken} />} />
        <Route path="/doctor" element={<><Nav session={session} setSession={setSession} /><DoctorDashboard session={session} /></>} />
        <Route path="/guardian" element={<><Nav session={session} setSession={setSession} /><GuardianDashboard session={session} /></>} />
        <Route path="/patient" element={<><Nav session={session} setSession={setSession} /><PatientDashboard session={session} /></>} />
        <Route path="/emergency" element={<><Nav session={session} setSession={setSession} /><Emergency session={session} guardianToken={guardianToken} /></>} />
      </Routes>
    </Router>
  );
}
