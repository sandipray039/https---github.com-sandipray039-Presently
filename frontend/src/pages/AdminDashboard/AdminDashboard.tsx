import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auto-close sidebar on window resize (when going from mobile to desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(false); // sidebar visible by default in large, no need toggle state
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="admin-dashboard">
      <div className={`sidebar-container ${sidebarOpen ? "open" : ""}`}>
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      <div className="admin-main-content">
        <button className="toggle-sidebar-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰ Menu
        </button>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
