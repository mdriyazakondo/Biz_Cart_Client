import LoadingSpinner from "../components/LogdingSpnner/LoadingSpnner";
import useAuth from "../hooks/useAuth";
import { useGetRoleByUserQuery } from "../redux/features/users/userApi";
import { Navigate } from "react-router";

const Admin = ({ children }) => {
  const { users, loading } = useAuth();

  const { data, isLoading } = useGetRoleByUserQuery(
    { email: users?.email },
    { skip: !users?.email },
  );

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  const role = data?.user?.role;

  if (!users) {
    return <Navigate to="/auth/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default Admin;
