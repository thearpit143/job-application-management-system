import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.hr.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/hr-login" replace />;
  }

  return children;
};

export default ProtectedRoute;
