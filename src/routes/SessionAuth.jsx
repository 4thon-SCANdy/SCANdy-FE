import { Navigate, Outlet } from "react-router-dom";

const SessionAuth = () => {
  const token = sessionStorage.getItem("access_token");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default SessionAuth;
