// src/api/attendanceApi.js

import axios from "axios";

const API_BASE = "https://localhost:7051/api/Attendance"; 
const API_BASE2 = "https://localhost:7051/api/Report"; 



export const checkIn = (token:string|null,latitude:Number, longitude:Number) => {
  return axios.post(`${API_BASE}/checkin`, { latitude, longitude }, {
    headers:{
       Authorization: `Bearer ${token}`,
    }
  }
    
  );
};
export const checkOut = (token: string | null) => {
  return axios.post(`${API_BASE}/checkout`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const startBreak = (token: string | null) => {
  return axios.post(`${API_BASE}/break/start`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const endBreak = (token: string | null) => {
  return axios.post(`${API_BASE}/break/end`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTodayAttendance = async (token: string | null) => {
  const res = await axios.get(`${API_BASE2}/get-attendance-of-today`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};