import { Route } from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoute";
import UserDashboard from "../pages/UserDashboard/UserDashboard";
import EmployeeHome from "../pages/UserDashboard/EmployeeHome";


const employeeroutes=(
    <Route element={<ProtectedRoute allowedRoles={["Employee"]}/>}>
        <Route path="/userdashboard" element={<UserDashboard/>}>
        <Route index element={<EmployeeHome/>}/>
          <Route path="user-homepage" element={<EmployeeHome/>}/>


        </Route>
    </Route>

);

export default employeeroutes;