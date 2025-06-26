import React, { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { loginUser } from "../Services/ApiService";
import { useNavigate } from "react-router-dom";


interface FormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const {login}=useAuth();
  const navigate=useNavigate();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    try {
      const response= await loginUser(formData);

      const {token,user}=response;

      login(token,user);
      
   if(user.role==="Admin"){
    navigate("/admindashboard")
   }
   if(user.role=="Employee"){
    navigate("/userdashboard");
   }
    

    } catch (error: any) {
      alert(error.message || "Login failed.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }
    return errors;
  };

  return (
    <div className="container-fluid " style={{backgroundColor:"aqua",height:'100vh'}}>
      <div className="row justify-content-center align-items-center vh-100">
        <div className="card p-4" style={{ maxWidth: "450px", width: "100%" }}>
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                value={formData.email}
                placeholder="Enter Your Email"
                onChange={handleChange}
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                value={formData.password}
                placeholder="Enter Your Password"
                onChange={handleChange}
              />
              {errors.password && <p className="text-danger">{errors.password}</p>}
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary w-50">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
