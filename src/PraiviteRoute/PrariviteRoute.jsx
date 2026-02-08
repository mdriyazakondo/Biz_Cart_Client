import LoadingSpinner from "../components/LogdingSpnner/LoadingSpnner";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { users, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!users) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default PrivateRoute;
