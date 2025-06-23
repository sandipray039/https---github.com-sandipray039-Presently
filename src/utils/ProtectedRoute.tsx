import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";


interface props{
  allowedRoles?:string[];
}

const ProtectedRoute:React.FC<props> = ({allowedRoles}) => {
  const { token,user } = useAuth();

  if(!token || !user){
    return <Navigate to="/login" replace/>
  }

  if(allowedRoles && !allowedRoles.includes(user.role)){
    return <Navigate to="/" replace/>
  }

  return  <Outlet /> ;
};

export default ProtectedRoute;