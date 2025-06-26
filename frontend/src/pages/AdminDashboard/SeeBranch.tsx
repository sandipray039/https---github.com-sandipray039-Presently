import { useEffect, useState } from "react";
import { fetchLocation } from "../../Services/ApiService";
import { useAuth } from "../../Contexts/AuthContext";

interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  geofenceRadius: number;
}

const BRANCHES_PER_PAGE = 10;

const SeeBranch = () => {
  const { token } = useAuth();
  const [branches, setBranches] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getBranches = async () => {
      try {
        const res = await fetchLocation(token);
        setBranches(res);
      } catch (err) {
        setError("Failed to load branches.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getBranches();
  }, [token]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredBranches = branches.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBranches.length / BRANCHES_PER_PAGE);
  const indexOfLast = currentPage * BRANCHES_PER_PAGE;
  const indexOfFirst = indexOfLast - BRANCHES_PER_PAGE;
  const currentBranches = filteredBranches.slice(indexOfFirst, indexOfLast);

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header">
          <h4 className="mb-0">Branch List</h4>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by branch name"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status" />
            </div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : filteredBranches.length === 0 ? (
            <div className="alert alert-warning text-danger">No branches found.</div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-bordered table-hover text-center">
                  <thead className="table-dark">
                    <tr>
                      <th>Sl no.</th>
                      <th>Branch Name</th>
                      <th>Latitude</th>
                      <th>Longitude</th>
                      <th>Geofence Radius (m)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBranches.map((branch, index) => (
                      <tr key={branch.id}>
                        <td>{indexOfFirst + index + 1}</td>
                        <td>{branch.name}</td>
                        <td>{branch.latitude}</td>
                        <td>{branch.longitude}</td>
                        <td>{branch.geofenceRadius}</td>
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

export default SeeBranch;
