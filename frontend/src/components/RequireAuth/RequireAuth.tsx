import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { AuthState, login, selectUser } from "../../store/slices/authSlice";

const getAuth = () => {
  const str = localStorage.getItem("user");
  if (str) {
    const auth = JSON.parse(str) as AuthState;
    return auth;
  }
  return null;
};

const checkType = (
  userType: string | null,
  allowedType: string | undefined
) => {
  if (!allowedType) return true;
  return userType === allowedType;
};

interface Props {
  allowedType?: "admin" | "normalUser" | "businessUser";
}

const RequireAuth: React.FC<Props> = ({ allowedType }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  let isLoggedIn;
  let isAllowedUser;
  let userType;

  if (user.token) {
    isLoggedIn = true;
    isAllowedUser = checkType(user.userType, allowedType);
    userType = user.userType;
  } else {
    const auth = getAuth();

    if (auth) {
      isAllowedUser = checkType(auth.userType, allowedType);
      dispatch(login(auth));
      isLoggedIn = true;
      userType = auth.userType;
    }
  }

  if (!isLoggedIn) {
    return <Navigate to={"/login"} replace />;
  }
  if (isAllowedUser) {
    return <Outlet />;
  } else {
    if (userType === "normalUser") {
      return <Navigate to={"/places"} replace />;
    } else if (userType === "businessUser") {
      return <Navigate to={"/business/dashboard"} replace />;
    } else {
      return <Navigate to={"/admin/dashboard"} replace />;
    }
  }
};

export default RequireAuth;
