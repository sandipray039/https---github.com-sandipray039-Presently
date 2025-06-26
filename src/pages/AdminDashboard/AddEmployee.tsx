import { useEffect, useState } from "react";
import "./AddEmployee.css";
import { fetchLocation, registerUser } from "../../Services/ApiService";
import { useAuth } from "../../Contexts/AuthContext";

interface location {
  id: string;
  name: string;
}

const AddEmployee = () => {
  const [locations, setLocation] = useState<location[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    locationId: "",
  });
  const { token } = useAuth();
  useEffect(() => {
    const getlocation = async () => {
      try {
        const res = await fetchLocation(token);
        setLocation(res);
        console.log(locations);
      } catch (err) {
        console.error("Failed to load locations", err);
      }
    };
    getlocation();
  }, []);
  useEffect(() => {
  if (showToast) {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 4000); 

    return () => clearTimeout(timer); 
  }
}, [showToast]);


  const handleChange = (e: any) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("form data of registering employee", formdata);
    try {
      const response = await registerUser(formdata, token);
      console.log(response);
      setShowToast(true);
      setFormdata({ name: "", email: "", password: "", locationId: "" });
    } catch (err) {
    console.error("Registration failed", err);
  }
  };

  return (
    <div className="add-employee-form-container">
      <h2 className="form-title">Add New Employee</h2>

      <form className="add-employee-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            value={formdata.name}
            onChange={handleChange}
            placeholder="Enter full name"
          />
        </div>

        <div className="form-group">
          <label>Email Address:</label>
          <input
            type="email"
            name="email"
            value={formdata.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="text"
            name="password"
            value={formdata.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </div>

        <div className="form-group">
          <label>Assign Location:</label>
          <select
            name="locationId"
            value={formdata.locationId}
            onChange={handleChange}
            required
          >
            <option value="">Select a location</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Add Employee
        </button>
      </form>

      <div
        className="toast-container position-fixed  mt-10 end-0 p-3"
        style={{ zIndex: 1055,top:'80px' }}
      >
        <div
          className={`toast align-items-center text-white bg-success border-0 ${
            showToast ? "show" : ""
          }`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">Employee registered successfully.</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={() => setShowToast(false)}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
