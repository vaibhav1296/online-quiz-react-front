import React from "react";
import { NavLink } from "react-router-dom";
import LogOut from "./LogOut";

const SignInLink = () => {
  return (
    <ul className="d-flex flex-row justify-content-evenly mt-3">
      <li>
        <NavLink to="/profile" className="signOutLink">
          <i class="fas fa-id-badge"></i> Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="/logout" className="signOutLink">
          <LogOut />
        </NavLink>
      </li>
    </ul>
  );
};
export default SignInLink;
