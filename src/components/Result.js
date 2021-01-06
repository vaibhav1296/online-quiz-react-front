import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Result extends Component {
  state = {
    loader: true,
    totalMarks: "",
    obtainedMarks: "",
  };
  static getDerivedStateFromProps(props, state) {
    if (props.renderResult && state.loader) {
      const { totalMarks, obtainedMarks } = { ...props.testResult };
      return {
        loader: false,
        totalMarks,
        obtainedMarks,
      };
    } else {
      return null;
    }
  }
  // componentDidMount() {
  //   if (this.props.renderResult && this.state.loader) {
  //     const { totalMarks, obtainedMarks } = { ...this.props.testResult };
  //     this.setState({
  //       loader: false,
  //       totalMarks,
  //       obtainedMarks,
  //     });
  //   }
  // }
  render() {
    return (
      <div>
        {this.props.loggedIn ? (
          <div className="container mt-5 mb-3" id="logInDiv">
            {!this.state.loader ? (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <p className="mt-3">
                  You have got {this.state.obtainedMarks}/
                  {this.state.totalMarks} in the test.{" "}
                  <i class="fas fa-smile"></i>
                </p>
                <Link to="/home" className="btn mt-2 mb-3">
                  Go to home
                </Link>
              </div>
            ) : (
              <p>The result is loading...</p>
            )}
          </div>
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, test }) => {
  return {
    loggedIn: auth.loggedIn,
    renderResult: test.renderResult,
    testResult: test.testResult,
  };
};

export default connect(mapStateToProps)(Result);
