// src/pages/AdminDashboard/ViewAttendance.tsx

import { useEffect, useState } from "react";
import { getTodayAttendance } from "../../Services/AttendanceApi";
import { useAuth } from "../../Contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


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
  const [graphData, setGraphData] = useState<{ date: string; count: number }[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTodayAttendance(token);
        setRecords(res);
        const groupedData = res.reduce((acc: Record<string, number>, curr: Attendance) => {
  const dateKey = new Date(curr.checkInTime).toLocaleDateString("en-IN");
  acc[dateKey] = (acc[dateKey] || 0) + 1;
  return acc;
}, {});

const graphData = Object.entries(groupedData).map(([date, count]) => ({
  date,
  count: typeof count === "number" ? count : 0, // fallback in case of wrong type
}));


setGraphData(graphData);

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
        {graphData.length > 0 && (
  <div style={{ width: "100%", height: 250 }} className="mb-4">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={graphData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} label={{ value: "Total Present", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#0d6efd" strokeWidth={2} dot />
      </LineChart>
    </ResponsiveContainer>
  </div>
)}

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
