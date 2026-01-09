import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "https://YOUR-BACKEND-URL/api";

// Auth
export const login = (credentials) => axios.post(`${API_BASE}/auth/login`, credentials);

// Alerts
export const getDoctorAlerts = (id) => axios.get(`${API_BASE}/alerts/doctor/${id}`);
export const getGuardianAlerts = (id) => axios.get(`${API_BASE}/alerts/guardian/${id}`);
export const getPatientAlerts = (id) => axios.get(`${API_BASE}/alerts/patient/${id}`);

// Emergency
export const getNearbyHospitals = () => axios.get(`${API_BASE}/emergency/nearby`);
export const bookEmergency = (payload) => axios.post(`${API_BASE}/emergency/book`, payload);

// Vitals
export const uploadVitals = (payload, token) =>
  axios.post(`${API_BASE}/vitals/upload`, payload, { headers: { Authorization: `Bearer ${token || "demo"}` } });
