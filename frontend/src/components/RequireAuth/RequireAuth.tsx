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

const RequireAuth = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  let isAuthenticated;

  if (user.token) {
    isAuthenticated = true;
  } else {
    const auth = getAuth();

    if (auth) {
      dispatch(login(auth));
      isAuthenticated = true;
    }
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default RequireAuth;
