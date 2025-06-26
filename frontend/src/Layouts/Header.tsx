import { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const { token, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header bg text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h2 className="mb-0">
          <Link className="t text-white text-decoration-none" to="/home">Presently</Link>
        </h2>

        <button className="toggle-header-btn d-md-none" onClick={() => setMenuOpen(true)}>
          ☰
        </button>

        <div className="d-none d-md-flex gap-2">
          {token && user ? (
            <>
              {user.role === "Admin" && location.pathname !== "/admindashboard" && (
                <NavLink to="/admindashboard" className="btn btn-success">Go to Dashboard</NavLink>
              )}
              {user.role === "Employee" && location.pathname !== "/userdashboard" && (
                <NavLink to="/userdashboard" className="btn btn-success">Go to Dashboard</NavLink>
              )}
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-primary">Login</NavLink>
              {location.pathname !== "/signup" && (
                <NavLink to="/signup" className="btn btn-outline-light">Sign Up</NavLink>
              )}
            </>
          )}
        </div>
      </div>

      {/* Sliding panel for small screens */}
      <div className={`header-slideout ${menuOpen ? "open" : ""}`}>
        <button className="close-header-btn" onClick={closeMenu}>×</button>
        <div className="slideout-buttons">
          {token && user ? (
            <>
              {user.role === "Admin" && location.pathname !== "/admindashboard" && (
                <NavLink to="/admindashboard" onClick={closeMenu} className="btn btn-success">Go to Dashboard</NavLink>
              )}
              {user.role === "Employee" && location.pathname !== "/userdashboard" && (
                <NavLink to="/userdashboard" onClick={closeMenu} className="btn btn-success">Go to Dashboard</NavLink>
              )}
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-primary" onClick={closeMenu}>Login</NavLink>
              {location.pathname !== "/signup" && (
                <NavLink to="/signup" className="btn btn-outline-light" onClick={closeMenu}>Sign Up</NavLink>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
