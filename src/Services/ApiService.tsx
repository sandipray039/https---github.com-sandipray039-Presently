import axios from "axios";

const BASE_URL = "https://localhost:7051/api/";

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
  const response = await axios.post(`${BASE_URL}Auth/login`, data);
  return response.data;
};

// Register API call 
export const registerUser = async (data: RegisterData, token: string|null) => {
  const response = await axios.post(`${BASE_URL}Auth/register`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


export const fetchMyAttendanceByDay = async (date: string, token: string) => {
  const response = await axios.get(`${BASE_URL}Report/my/day?date=${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchMyAttendanceByMonth = async (year: number, month: number, token: string) => {
  const response = await axios.get(`${BASE_URL}Report/my/month?year=${year}&month=${month}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchAllAttendanceByDay = async (date: string, token: string) => {
  const response = await axios.get(`${BASE_URL}Report/admin/day?date=${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchAllAttendanceByMonth = async (year: number, month: number, token: string) => {
  const response = await axios.get(`${BASE_URL}Report/admin/month?year=${year}&month=${month}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchLocation=async (token:string|null)=>{
  const response=await axios.get(`${BASE_URL}Location/get-locations`,{
    headers:{
      Authorization:`Bearer ${token}`
    },
  });
  console.log("location response form api",response.data)
  return response.data;
}

export const addLocation = async (token: string | null, data: any) => {
  try {
    console.log("Sending payload:", data);
    const response = await axios.post(`${BASE_URL}Location/add-location`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
    throw error;
  }
};


export const getAllEmployees=async(token:string |null)=>{

  const response=await axios.get(`${BASE_URL}Admin/get-all-employees`,{
    headers:{
      Authorization:`Bearer ${token}`
    },
  });
  return response.data;
}

export const removeEmployee=async(id:number|null,token:string|null)=>{
    const response=await axios.delete(`${BASE_URL}Admin/remove-employee?id=${id}`,{
  headers:{
   Authorization:`Bearer ${token}`
  }
    });
    return response.data;

}

export const updateEmployee=async(data:any,token:string|null)=>{
  const response=await axios.put(`${BASE_URL}Admin/update-employee`,data,{
     headers:{
   Authorization:`Bearer ${token}`,
   "Content-Type":"application/json",
  }
  });
  return response.data;

}

export const getEmployeeById = async (id: number, token: string | null) => {
  const response = await axios.get(`${BASE_URL}Admin/get-employee-by-id/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};