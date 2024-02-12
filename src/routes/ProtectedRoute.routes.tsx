import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { Navigate } from "react-router-dom";
import { logOut } from "../redux/feature/auth/authSlice";
import { VerifyToken } from "../utils/verifyToken";
import { TUser } from "../types/user.types";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const { token } = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();

  let user;
  if (token) {
    user = VerifyToken(token);
  }
  if (role !== undefined && (user as TUser)?.role !== role) {
    dispatch(logOut());
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  if (!token) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
