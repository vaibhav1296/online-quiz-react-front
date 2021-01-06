import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignInLink from "./SignInLink";
import SignOutLink from "./SignOutLink";
import { connect } from "react-redux";

class NavBar extends Component {
  render() {
    const { loggedIn } = this.props;
    return (
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#fd9696" }}
      >
        <div className="container d-flex">
          <div
            // style={{ width: "60%" }}
            id="navBrand"
          >
            <Link
              className="navbar-brand"
              to="/home"
              id="brandLink"
              // style={{
              //   color: "#fff",
              //   letterSpacing: "3px",
              //   fontWeight: "bold",
              //   fontFamily: "Noto Sans",
              // }}
            >
              BarbiQuiz
            </Link>
          </div>
          <div
            id="conditionDiv"
            // style={{ width: "40%" }}
          >
            {loggedIn ? <SignInLink /> : <SignOutLink />}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    loggedIn: auth.loggedIn,
    success: auth.success,
  };
};

export default connect(mapStateToProps)(NavBar);
