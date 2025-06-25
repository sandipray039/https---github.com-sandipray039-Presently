// src/pages/AdminDashboard/ViewAttendance.tsx

import { useEffect, useState } from "react";
import { getTodayAttendance } from "../../Services/AttendanceApi";
import { useAuth } from "../../Contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

interface Attendance {
  id: number;
  userName: string;
  email: string;
  locationName: string;
  checkInTime: string;
  checkOutTime: string | null;
  totalHours: number;
}

const ViewAttendance = () => {
  const { token } = useAuth();
  const [records, setRecords] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTodayAttendance(token);
        setRecords(res);
      } catch (err) {
        setError("Failed to load attendance.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">Today's Attendance</h4>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : records.length === 0 ? (
            <div className="alert alert-warning">No attendance found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-primary text-center">
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Total Hours</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {records.map((rec, index) => (
                    <tr key={rec.id}>
                      <td>{rec.id}</td>
                      <td>{rec.userName}</td>
                      <td>{rec.locationName}</td>
                      <td>{new Date(rec.checkInTime).toLocaleString("en-IN")}</td>
                      <td>
                        {rec.checkOutTime
                          ? new Date(rec.checkOutTime).toLocaleString("en-IN")
                          : "—"}
                      </td>
                      <td>{rec.totalHours?.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAttendance;
