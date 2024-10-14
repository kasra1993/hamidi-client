import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { provider } = useSelector((state) => state.provider);
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  return user || provider ? (
    children
  ) : (
    <Navigate to="/user-login" state={{ from: location }} />
  );
};

export default PrivateRoute;
