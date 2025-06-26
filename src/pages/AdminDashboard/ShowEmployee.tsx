import { useEffect, useState } from "react";
import { getAllEmployees, removeEmployee } from "../../Services/ApiService";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

interface Employee {
  id: number;
  name: string;
  email: string;
  locationName: string;
}

const EMPLOYEES_PER_PAGE = 10;

const ShowEmployee = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const res = await getAllEmployees(token);
        setEmployees(res);
      } catch (err) {
        setError("Failed to load employees.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getEmployees();
  }, [token]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await removeEmployee(id, token);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (err) {
      alert("Failed to delete employee.");
      console.error(err);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / EMPLOYEES_PER_PAGE);
  const indexOfLast = currentPage * EMPLOYEES_PER_PAGE;
  const indexOfFirst = indexOfLast - EMPLOYEES_PER_PAGE;
  const currentEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast);

  return (
    <div className="container">
      <div className="card">
        <div className="card-header text-black mb-2">
          <h4 className="mb-0">Employee List</h4>
        </div>
        <div className="card-body">
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : filteredEmployees.length === 0 ? (
            <div className="alert alert-warning text-danger">No employees found.</div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                  <thead className="table-dark text-center">
                    <tr>
                      <th>Sl no.</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Working Branch</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {currentEmployees.map((emp, index) => (
                      <tr key={emp.id}>
                        <td>{indexOfFirst + index + 1}</td>
                        <td>{emp.name}</td>
                        <td>{emp.email}</td>
                        <td>{emp.locationName || "—"}</td>
                        <td>
                          <div className="d-flex gap-2 justify-content-center">
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => navigate(`/admindashboard/update-employee/${emp.id}`)}

                            >
                              Update
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(emp.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                <span>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  className="btn btn-outline-primary"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowEmployee;
