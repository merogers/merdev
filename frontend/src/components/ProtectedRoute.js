import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ redirectPath = "/login", children }) => {
  const [user, setUser] = useContext(UserContext);

  if (!user.isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
