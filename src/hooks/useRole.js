import { useGetRoleByUserQuery } from "../redux/features/users/userApi";
import useAuth from "./useAuth";

const useRole = () => {
  const { users } = useAuth();

  const { data, error, isLoading } = useGetRoleByUserQuery(
    { email: users?.email },
    { skip: !users?.email },
  );

  const roleUser = data?.user?.role;
  console.log("role", roleUser);

  return { roleUser, error, isLoading };
};

export default useRole;
