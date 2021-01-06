import React, { Component } from "react";
import { logout } from "../store/actions/userActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
class LogOut extends Component {
  render() {
    const { loggedIn } = this.props;
    return (
      <div>
        {loggedIn ? (
          <div onClick={this.props.logout}>
            <i class="fas fa-sign-out-alt"></i> LogOut
          </div>
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    loggedIn: auth.loggedIn,
    success: auth.success,
  };
};

const mapDisPatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDisPatchToProps)(LogOut);
