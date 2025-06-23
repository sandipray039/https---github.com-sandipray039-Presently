// pages/NotFound.tsx
import { Link } from "react-router-dom";
import "./NotFound.css"; // CSS styles (provided below)

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-message">The page you’re looking for doesn’t exist.</p>
      <Link to="/home" className="notfound-button">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
