import { NavLink } from "react-router-dom";
import "../AdminDashboard/Sidebar.css"

const UserSidebar = ({ closeSidebar }: { closeSidebar: () => void }) => {
  return (
    <div className="sidebar">
      {/* Close icon only for small screens */}
      <button className="close-sidebar-btn" onClick={closeSidebar}>
        ×
      </button>
      <h3>Employee Panel</h3>
      <ul>
         <li><NavLink to="user-homepage" onClick={closeSidebar}> Homepage</NavLink></li>
        <li><NavLink to="see-attendance" onClick={closeSidebar}> Attendance History</NavLink></li>
      </ul>
    </div>
  );
};

export default UserSidebar;
