import { Route } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "../utils/ProtectedRoute";

// Lazy-loaded components
const UserDashboard = lazy(() => import("../pages/UserDashboard/UserDashboard"));
const EmployeeHome = lazy(() => import("../pages/UserDashboard/EmployeeHome"));
const EmployeeAttendance = lazy(() => import("../pages/UserDashboard/EmployeeAttendance"));

const employeeroutes = (
  <Route element={<ProtectedRoute allowedRoles={["Employee"]} />}>
    <Route path="/userdashboard" element={<UserDashboard />}>
      <Route index element={<EmployeeHome />} />
      <Route path="user-homepage" element={<EmployeeHome />} />
      <Route path="see-attendance" element={<EmployeeAttendance />} />
    </Route>
  </Route>
);

export default employeeroutes;
