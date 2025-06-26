import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react";
import UserSidebar from "./UserSidebar";
import "../AdminDashboard/AdminDashboard.css"


const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(false); 
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="admin-dashboard">
      <div className={`sidebar-container ${sidebarOpen ? "open" : ""}`}>
        <UserSidebar closeSidebar={() => setSidebarOpen(false)} />
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
export default UserDashboard
