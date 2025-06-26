import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ closeSidebar }: { closeSidebar: () => void }) => {
  return (
    <div className="sidebar">
      {/* Close icon only for small screens */}
      <button className="close-sidebar-btn" onClick={closeSidebar}>
        ×
      </button>
      <h3>Admin Panel</h3>
      <ul>
        <li><NavLink to="see-attendance" onClick={closeSidebar}>See Attendance</NavLink></li>
        <li><NavLink to="add-employee" onClick={closeSidebar}>Add Employee</NavLink></li>
        <li><NavLink to="add-branch" onClick={closeSidebar}>Add New Branch</NavLink></li>
        <li><NavLink to="see-branch" onClick={closeSidebar}>See All Branches</NavLink></li>
        <li><NavLink to="list-of-employees" onClick={closeSidebar}>List of Employees</NavLink></li>
        
      </ul>
    </div>
  );
};

export default Sidebar;
