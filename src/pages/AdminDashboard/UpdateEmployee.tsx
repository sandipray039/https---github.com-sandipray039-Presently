import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchLocation, getEmployeeById, updateEmployee, } from "../../Services/ApiService";
import { useAuth } from "../../Contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

interface Location {
  id: string;
  name: string;
}

interface UpdateEmployeeDto {
  id: number;
  name: string;
  email: string;
  locationId: string;
}

const UpdateEmployee = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UpdateEmployeeDto>({
    id: 0,
    name: "",
    email: "",
    locationId: ""
  });

  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

    useEffect(() => {
    const getlocation = async () => {
      try {
        const res = await fetchLocation(token);
        setLocations(res);
        console.log(locations);
      } catch (err) {
        console.error("Failed to load locations", err);
      }
    };
    getlocation();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const emp = await getEmployeeById(Number(id), token);
        
       

        setFormData({
          id: emp.id,
          name: emp.name,
          email: emp.email,
          locationId: emp.locationId
        });
       
      } catch (err) {
        console.error(err);
        setError("Failed to load employee or locations");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateEmployee(formData, token);
      alert("Employee updated successfully");
   navigate("/admindashboard/list-of-employees");
    } catch (err) {
      console.error(err);
      alert("Failed to update employee");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h4>Update Employee</h4>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Location</label>
              <select
                name="locationId"
                value={formData.locationId}
                className="form-select"
                onChange={handleChange}
                required
              >
                <option value="">-- Select Location --</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              Update Employee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployee;
