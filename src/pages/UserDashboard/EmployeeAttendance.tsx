import React, { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { getpersonalAttendance } from "../../Services/AttendanceApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";


interface Attendance {
  id: number;
  date: string;
  checkInTime: string;
  checkOutTime: string;
  breakStart: string;
  breakEnd: string;
  totalHours: number;
  locationId: string;
  locationName: string;
  userId: number;
  userName: string | null;
}

const ATTENDANCE_PER_PAGE = 10;

const EmployeeAttendance = () => {
  const { token } = useAuth();
  const [attendanceList, setAttendanceList] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getpersonalAttendance(token);
        setAttendanceList(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load attendance records.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
    const formatDate = (isoString: string) =>
    new Date(isoString).toLocaleDateString();

const filteredRecords = attendanceList.filter((record) =>
  formatDate(record.date).includes(searchTerm.toLowerCase())
);


  const totalPages = Math.ceil(filteredRecords.length / ATTENDANCE_PER_PAGE);
  const indexOfLast = currentPage * ATTENDANCE_PER_PAGE;
  const indexOfFirst = indexOfLast - ATTENDANCE_PER_PAGE;
  const currentRecords = filteredRecords.slice(indexOfFirst, indexOfLast);

  const formatTime = (isoString: string | null) =>
    isoString ? new Date(isoString).toLocaleTimeString() : "-";



  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header">
          <h4 className="mb-0">My Attendance History</h4>
        </div>
 {filteredRecords.length > 0 && (
  <div style={{ width: "100%", height: 200, overflowX: "hidden",display:'flex',justifyContent:'center' }} className="mb-4">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={filteredRecords}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(dateStr) => new Date(dateStr).toLocaleDateString()}
        />
        <YAxis
          domain={["dataMin", "dataMax"]}
          tickFormatter={(value) => `${value}:00`}
          label={{
            value: "Check-In Hour",
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "middle" },
          }}
        />
        <Tooltip
          formatter={(value: any) => `${value}:00`}
          labelFormatter={(label: any) =>
            `Date: ${new Date(label).toLocaleDateString()}`
          }
        />
        <Line
          type="monotone"
          dataKey={(record: Attendance) =>
            new Date(record.checkInTime).getHours()
          }
          name="Check-In Hour"
          stroke="#8884d8"
          dot
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
)}


        <div className="card-body">
          <div className="mb-3">
       <input
  type="text"
  className="form-control"
  placeholder="Search by date (e.g. 25/6/2025)"
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
          ) : filteredRecords.length === 0 ? (
            <div className="alert alert-warning text-danger">
              No attendance records found.
            </div>
          ) : (
            <>
               
              <div className="table-responsive">
                <table className="table table-bordered table-hover text-center">
                  <thead className="table-dark">
                    <tr>
                      <th>Sl no.</th>
                      <th>Date</th>
                      <th>Check In</th>
                      <th>Check Out</th>
                      <th>Break Start</th>
                      <th>Break End</th>
                      <th>Total Hours</th>
                      <th>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRecords.map((record, index) => (
                      <tr key={record.id}>
                        <td>{indexOfFirst + index + 1}</td>
                        <td>{formatDate(record.date)}</td>
                        <td>{formatTime(record.checkInTime)}</td>
                        <td>{formatTime(record.checkOutTime)}</td>
                        <td>{formatTime(record.breakStart)}</td>
                        <td>{formatTime(record.breakEnd)}</td>
                        <td>{record.totalHours.toFixed(2)}</td>
                        <td>{record.locationName || "-"}</td>
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
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
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

export default EmployeeAttendance;
