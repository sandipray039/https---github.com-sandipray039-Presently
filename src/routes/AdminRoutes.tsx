import { lazy } from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoute";

const AdminDashboard = lazy(() => import("../pages/AdminDashboard/AdminDashboard"));
const WelcomeAdmin = lazy(() => import("../pages/AdminDashboard/WelcomeAdmin"));
const AddEmployee = lazy(() => import("../pages/AdminDashboard/AddEmployee"));
const AddBranch = lazy(() => import("../pages/AdminDashboard/AddBranch"));
const ViewAttendance = lazy(() => import("../pages/AdminDashboard/ViewAttendance"));

const adminroutes = (
  <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
    <Route path="/admindashboard" element={<AdminDashboard />}>
      <Route index element={<WelcomeAdmin />} />
      <Route path="add-employee" element={<AddEmployee />} />
      <Route path="add-branch" element={<AddBranch />} />
      <Route path="see-attendance" element={<ViewAttendance />} />
    </Route>
  </Route>
);

export default adminroutes;
