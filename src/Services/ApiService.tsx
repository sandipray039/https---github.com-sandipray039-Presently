import axios from "axios";

const BASE_URL = "https://localhost:7051/api/Auth";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  locationId: string; 
}



// Login API call
export const loginUser = async (data: LoginData) => {
  const response = await axios.post(`${BASE_URL}/login`, data);
  return response.data;
};

// Register API call 
export const registerUser = async (data: RegisterData, token: string) => {
  const response = await axios.post(`${BASE_URL}/register`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


export const fetchMyAttendanceByDay = async (date: string, token: string) => {
  const response = await axios.get(`${BASE_URL}/my/day?date=${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchMyAttendanceByMonth = async (year: number, month: number, token: string) => {
  const response = await axios.get(`${BASE_URL}/my/month?year=${year}&month=${month}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchAllAttendanceByDay = async (date: string, token: string) => {
  const response = await axios.get(`${BASE_URL}/admin/day?date=${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchAllAttendanceByMonth = async (year: number, month: number, token: string) => {
  const response = await axios.get(`${BASE_URL}/admin/month?year=${year}&month=${month}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};