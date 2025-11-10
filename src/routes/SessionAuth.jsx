import { Navigate, Outlet, useLocation } from "react-router-dom";

const SessionAuth = () => {
  const token = sessionStorage.getItem("access_token");
  const location = useLocation();

  // 실패 상태면 메인 접근 허용
  if (!token && location.state?.success === false) {
    return <Outlet />;
  }

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default SessionAuth;
