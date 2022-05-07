import React, { useContext } from "react";

import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const UserBanner = () => {
  const [user, setUser] = useContext(UserContext);

  const logout = () => {
    setUser({ isAuth: false });
    localStorage.removeItem("token");
  };

  if (user.isAuth) {
    return (
      <div className="banner">
        <div>
          <div>Hello, {user.firstName}</div>
        </div>
        <div>
          <Link className="link primary" to="/dashboard">
            Dashboard
          </Link>
          <Link className="link primary" to="/createblog">
            Create Blog
          </Link>
          <Link className="link cta" to="/" onClick={logout}>
            Logout
          </Link>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default UserBanner;
