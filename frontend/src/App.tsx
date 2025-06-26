import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./Layouts/MainLayout";
import "./App.css"
import LoginPage from "./pages/LoginPage";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import PublicRoute from "./utils/PublicRoute";
import ProtectedRoute from "./utils/ProtectedRoute";

import NotFound from "./pages/NotFound";
import adminroutes from "./routes/AdminRoutes";
import { Suspense } from "react";
import employeeroutes from "./routes/EmployeeRoutes";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./pages/ScrollToTop";

const App = () => {
  return (
    <div>
      <ScrollToTop/>
      <main>
       <Suspense fallback={<div>Loading...</div>}>
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="home" element={<HomePage />} />

      <Route element={<PublicRoute />}>
        <Route path="login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["Employee", "Admin"]} />}>
        <Route path="userdashboard" element={<UserDashboard />} />
      </Route>

      {adminroutes}
      {employeeroutes}
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
</Suspense>


<ToastContainer position="top-right" className="mt-5" autoClose={3000}/>
      </main>
    </div>
  );
};

export default App;
