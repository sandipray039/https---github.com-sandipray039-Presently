import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const PublicRoute=()=>{
    const {token} =useAuth();

    return token? <Navigate to="/" replace/> : <Outlet/>;

}

export default PublicRoute;