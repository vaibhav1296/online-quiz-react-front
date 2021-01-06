import React from "react";
import { NavLink } from "react-router-dom";

const SignOutLink = () => {
  return (
    <ul className="d-flex flex-row justify-content-evenly mt-3">
      <li
      // style={{ listStyle: "none" }}
      >
        <NavLink
          to="/register"
          className="signOutLink"
          // style={{
          //   textDecoration: "none",
          //   letterSpacing: "2px",
          //   color: "#fff",
          //   fontSize: "18px",
          // }}
        >
          <i class="fas fa-user-plus"></i> Sign Up
        </NavLink>
      </li>
      <li
      // style={{ listStyle: "none" }}
      >
        <NavLink
          to="/"
          className="signOutLink"
          // style={{
          //   textDecoration: "none",
          //   letterSpacing: "2px",
          //   color: "#fff",
          //   fontSize: "18px",
          // }}
        >
          <i class="fas fa-sign-in-alt"></i> Log In
        </NavLink>
      </li>
    </ul>
  );
};

export default SignOutLink;
