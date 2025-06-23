import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="home-container">
      <div className="home-overlay">
        <h1 className="home-title">Welcome to Geo-Attendance Registry</h1>
        <p className="home-subtitle">
          A location-based attendance system for smart workforce management.
        </p>
        <button className="home-btn" onClick={handleLogin}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;
