import { useEffect, useState, useRef } from "react";
import { checkIn, checkOut, endBreak, startBreak } from "../../Services/AttendanceApi";
import { useAuth } from "../../Contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeHome = () => {
  const { token } = useAuth();
  const [status, setStatus] = useState("");
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [workSeconds, setWorkSeconds] = useState(0);
 const timerRef = useRef<number | null>(null);


  // Timer start/resume
  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setWorkSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  // Timer pause
  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Convert seconds to HH:MM:SS
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const getLocationAndCheckIn = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const res = await checkIn(token, latitude, longitude);
            setStatus(res.data);
            setIsCheckedIn(true);
            startTimer();
          } catch (err: any) {
            setStatus(err.response?.data || "Check-in failed");
          }
        },
        () => {
          setStatus("Location access denied");
        }
      );
    } else {
      setStatus("Geolocation not supported");
    }
  };

  const handleCheckOut = async () => {
    try {
      const res = await checkOut(token);
      setStatus(res.data);
      setIsCheckedOut(true);
      pauseTimer();
    } catch (err: any) {
      setStatus(err.response?.data || "Check-out failed");
    }
  };

  const handleStartBreak = async () => {
    try {
      const res = await startBreak(token);
      setStatus(res.data);
      setIsOnBreak(true);
      pauseTimer();
    } catch (err: any) {
      setStatus(err.response?.data || "Break start failed");
    }
  };

  const handleEndBreak = async () => {
    try {
      const res = await endBreak(token);
      setStatus(res.data);
      setIsOnBreak(false);
      startTimer();
    } catch (err: any) {
      setStatus(err.response?.data || "Break end failed");
    }
  };

  useEffect(() => {
    return () => {
      // cleanup timer when component unmounts
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
<div className="container-fluid">
    <div className=" d-flex justify-content-center vh-100 bg-light"   >
      <div className="card p-4 shadow rounded" style={{ width: "100%", maxWidth: "550px",height:'fit-content',marginTop:'50px' }}>
        <h4 className="text-center mb-4">Employee Dashboard</h4>

        {isCheckedIn && (
          <div className="alert alert-info text-center">
            ⏱️ Work Time: <strong>{formatTime(workSeconds)}</strong>
            {isOnBreak && <div>(Break Paused)</div>}
          </div>
        )}

        <button
          className="btn btn-success mb-3"
          onClick={getLocationAndCheckIn}
          disabled={isCheckedIn}
        >
          ✅ Check In
        </button>

        <button
          className="btn btn-danger mb-3"
          onClick={handleCheckOut}
          disabled={!isCheckedIn || isCheckedOut}
        >
          ⛔ Check Out
        </button>

        <button
          className="btn btn-warning mb-3"
          onClick={handleStartBreak}
          disabled={!isCheckedIn || isOnBreak || isCheckedOut}
        >
          ☕ Start Break
        </button>

        <button
          className="btn btn-primary mb-3"
          onClick={handleEndBreak}
          disabled={!isOnBreak || isCheckedOut}
        >
          🔁 End Break
        </button>

        <p className="mt-3 text-center  text-danger " style={{fontSize:'24px'}}>{status}</p>
      </div>
      </div>
    </div>

  );
};

export default EmployeeHome;
