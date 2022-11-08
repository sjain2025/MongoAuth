import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "/Users/sandeepjain/mongoauth/src/contexts/user.contexts.js";

const PrivateRoute = (props) => {

  const { user } = useContext(UserContext);
  const location = useLocation();

  return user ? <Outlet /> : <Navigate to={`/login?redirectTo=${encodeURI(location.pathname)}`} />;
}

export default PrivateRoute;