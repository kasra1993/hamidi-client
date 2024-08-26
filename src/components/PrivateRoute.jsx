import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../context/auth_context";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  return user ? (
    children
  ) : (
    <Navigate to="/user-login" state={{ from: location }} />
  );
};

export default PrivateRoute;
