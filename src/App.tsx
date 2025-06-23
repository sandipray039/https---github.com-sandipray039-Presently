import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./Layouts/MainLayout";
import "./App.css"
import LoginPage from "./pages/LoginPage";
import UserDashboard from "./pages/UserDashboard";
import PublicRoute from "./utils/PublicRoute";
import ProtectedRoute from "./utils/ProtectedRoute";

import NotFound from "./pages/NotFound";
import adminroutes from "./routes/AdminRoutes";
import { Suspense } from "react";

const App = () => {
  return (
    <div>
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
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
</Suspense>



      </main>
    </div>
  );
};

export default App;
