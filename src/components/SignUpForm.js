import React, { Component } from "react";
import { connect } from "react-redux";
import { register, resetAuthErrorState } from "../store/actions/userActions";
import { Redirect } from "react-router-dom";
import PopUp from "./PopUp";

class SignUpForm extends Component {
  state = {
    email: "",
    password: "",
    name: "",
    gender: "",
    role: "",
    alertCondition: false,
    message: "",
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
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.register(this.state);
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
        {!loggedIn ? (
          <div className="container mt-3 mb-3" id="logInDiv">
            <form onSubmit={this.handleSubmit}>
              <h5
                id="signInTitle"
                className="pt-3 d-flex justify-content-center"
              >
                Sign Up
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
                <label htmlFor="name" className="form-label" id="labelTag">
                  <i class="fas fa-file-signature"></i> Name:
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>
              <div className="mb-3 mt-3">
                <label htmlFor="gender" className="form-label" id="labelTag">
                  <i class="fas fa-genderless"></i> Gender:
                </label>
                <select
                  className="form-control"
                  id="gender"
                  onChange={this.handleChange}
                >
                  <option>Please select a value</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="lgbtq">LGBTQ</option>
                </select>
              </div>
              <div className="mb-3 mt-3">
                <label htmlFor="role" className="form-label" id="labelTag">
                  <i class="fas fa-user-tag"></i> Role:
                </label>
                <select
                  id="role"
                  className="form-control"
                  onChange={this.handleChange}
                >
                  <option>Please select a value</option>
                  <option value="candidate">candidate</option>
                  <option value="admin">admin</option>
                </select>
              </div>
              <div className="mb-3 mt-3">
                <label htmlFor="email" className="form-label" id="labelTag">
                  <i class="fas fa-envelope"></i> Email:
                </label>
                <input
                  type="email"
                  aria-describedby="emailHelp"
                  id="email"
                  className="form-control"
                  onChange={this.handleChange}
                />
                <small id="emailHelp" class="form-text text-muted">
                  Use a gmail email id if you're candidate.
                </small>
              </div>
              <div className="mb-3 mt-3">
                <label htmlFor="password" id="labelTag" className="form-label">
                  <i class="fas fa-lock"></i> Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  onChange={this.handleChange}
                />
                <small id="emailHelp" class="form-text text-muted">
                  Password length must be between 7-14 with one capital letter
                  and numbers( no special character).
                </small>
              </div>
              <div className="mb-3 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn mb-3"
                  style={{ letterSpacing: "2px" }}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        ) : (
          <Redirect to="/home" />
        )}
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
    register: (userDetails) => dispatch(register(userDetails)),
    resetAuthErrorState: () => dispatch(resetAuthErrorState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
