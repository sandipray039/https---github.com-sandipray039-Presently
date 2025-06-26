import { lazy } from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoute";


const AdminDashboard = lazy(() => import("../pages/AdminDashboard/AdminDashboard"));
const WelcomeAdmin = lazy(() => import("../pages/AdminDashboard/WelcomeAdmin"));
const AddEmployee = lazy(() => import("../pages/AdminDashboard/AddEmployee"));
const AddBranch = lazy(() => import("../pages/AdminDashboard/AddBranch"));
const ViewAttendance = lazy(() => import("../pages/AdminDashboard/ViewAttendance"));
const ShowEmployee = lazy(() => import("../pages/AdminDashboard/ShowEmployee"));
const UpdateEmployee = lazy(() => import("../pages/AdminDashboard/UpdateEmployee"));
const SeeBranch= lazy(() => import("../pages/AdminDashboard/SeeBranch"));

const adminroutes = (
  <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
    <Route path="/admindashboard" element={<AdminDashboard />}>
      <Route index element={<WelcomeAdmin />} />
      <Route path="add-employee" element={<AddEmployee />} />
      <Route path="add-branch" element={<AddBranch />} />
      <Route path="see-branch" element={<SeeBranch/>} />
      <Route path="see-attendance" element={<ViewAttendance />} />
      <Route path="list-of-employees" element={<ShowEmployee/>}/>
      <Route path="update-employee/:id" element={<UpdateEmployee/>}/>
    </Route>
  </Route>
);

export default adminroutes;
