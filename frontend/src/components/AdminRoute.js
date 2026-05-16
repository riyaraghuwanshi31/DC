import { Navigate } from "react-router-dom";
import { getRole, getToken } from "../utils/auth";

const AdminRoute = ({ children }) => {

  const token = getToken();
  const role = getRole();

  // Not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Not admin
  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  // Allow admin
  return children;
};

export default AdminRoute;