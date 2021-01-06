import React, { Component } from "react";
import { connect } from "react-redux";
import { login, resetAuthErrorState } from "../store/actions/userActions";
import { Link, Redirect } from "react-router-dom";
import "../App.css";
import PopUp from "./PopUp";

class LogInForm extends Component {
  state = {
    email: "",
    password: "",
    role: "",
    alertCondition: false,
    message: "",
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state);
  };
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.isError && this.props.isError) {
      this.setState({
        message: this.props.errorData.status.message,
        alertCondition: true,
      });
    }
  }
  handleClose = () => {
    this.props.resetAuthErrorState();
    this.setState({
      alertCondition: false,
    });
  };
  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  render() {
    const { loggedIn } = this.props;
    return (
      <div>
        <PopUp
          open={this.state.alertCondition}
          close={this.handleClose}
          message={this.state.message}
        />
        <div
          className="container mt-3"
          id="logInDiv"
          // style={{
          //   width: "50%",
          //   backgroundColor: "#dedfdc",
          //   borderRadius: "10px",
          // }}
        >
          {!loggedIn ? (
            <div>
              <form onSubmit={this.handleSubmit}>
                <h5
                  className="pt-3 d-flex justify-content-center"
                  id="signInTitle"
                  // style={{
                  //   fontSize: "25px",
                  //   letterSpacing: "3px",
                  //   fontWeight: "bolder",
                  // }}
                >
                  Sign In
                </h5>
                <hr
                  id="hrStyle"
                  // style={{
                  //   width: "80%",
                  //   backgroundColor: "black",
                  //   height: "2px",
                  //   margin: "auto",
                  // }}
                />
                <div className="mb-3 mt-3">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label"
                    id="labelTag"
                    // style={{ fontWeight: "bolder", fontSize: "18px" }}
                  >
                    <i class="fas fa-envelope"></i> Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={this.handleChange}
                  />
                  <small id="emailHelp" class="form-text text-muted">
                    Use a gmail email id if you're candidate.
                  </small>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="form-label"
                    id="labelTag"
                    // style={{ fontWeight: "bolder", fontSize: "18px" }}
                  >
                    <i class="fas fa-lock"></i> Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    aria-describedby="passwordHelp"
                    onChange={this.handleChange}
                  />
                  <small id="passwordHelp" class="form-text text-muted">
                    Password length must be between 7-14 with one capital letter
                    and numbers( no special character).
                  </small>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="role"
                    className="form-label"
                    id="labelTag"
                    // style={{ fontWeight: "bolder", fontSize: "18px" }}
                  >
                    <i class="fas fa-user-tag"></i> Role:
                  </label>
                  <select
                    id="role"
                    onChange={this.handleChange}
                    className="form-control"
                  >
                    <option>Please select a value</option>
                    <option value="candidate">candidate</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
                <div className="mb-3 d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn"
                    style={{ letterSpacing: "2px" }}
                  >
                    Log In
                  </button>
                </div>
              </form>
              <div className="d-flex justify-content-center">
                <p>
                  If not a user then{" "}
                  <Link to="/register" style={{ color: "black" }}>
                    Register
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            <Redirect to="/home" />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    loggedIn: auth.loggedIn,
    success: auth.success,
    isError: auth.isError,
    errorData: auth.errorData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (userDetails) => dispatch(login(userDetails)),
    resetAuthErrorState: () => dispatch(resetAuthErrorState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);
