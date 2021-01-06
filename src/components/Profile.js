import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { getUserProfile } from "../store/actions/userActions";
import UserDetail from "./UserDetail";
import UserQuizDetail from "./UserQuizDetail";
import "../App.css";
import Loader from "./Loader";

class Profile extends Component {
  state = {
    profileData: null,
    currentPage: 1,
    pageCount: null,
    disableBack: false,
    disableForward: false,
  };
  static getDerivedStateFromProps(props, state) {
    if (!props.profileLoader) {
      const profileData = props.profile.profileData;
      const pageCount = props.profile.pageCount;
      let disableBack = false;
      let disableForward = false;
      if (state.currentPage === 1) {
        disableBack = true;
      }
      if (state.currentPage === state.pageCount) {
        disableForward = true;
      }
      return {
        profileData,
        pageCount,
        disableBack,
        disableForward,
      };
    } else {
      return null;
    }
  }
  componentDidMount() {
    const { userId } = { ...this.props.loggedUser };
    const { currentPage } = { ...this.state };
    this.props.getUserProfile(userId, currentPage);
  }
  goBack = () => {
    if (this.state.currentPage !== 1) {
      const { currentPage } = { ...this.state };
      let page = currentPage;
      page -= 1;
      this.setState({
        currentPage: page,
      });
      this.props.getUserProfile(this.props.loggedUser.userId, page);
    }
  };
  goForward = () => {
    if (this.state.currentPage !== this.state.pageCount) {
      const { currentPage } = { ...this.state };
      let page = currentPage;
      page += 1;
      this.setState({
        currentPage: page,
      });
      this.props.getUserProfile(this.props.loggedUser.userId, page);
    }
  };
  render() {
    const { loggedIn } = this.props;
    return (
      <div>
        {loggedIn ? (
          <div>
            {this.props.profileLoader ? (
              <Loader />
            ) : (
              <div className="container">
                <UserDetail user={this.props.loggedUser} />
                <UserQuizDetail profileData={this.state.profileData} />
                <div className="container d-flex justify-content-center">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item">
                        <Link
                          className={
                            "page-link " +
                            (this.state.disableBack ? "disabled-link" : "")
                          }
                          style={{
                            textDecoration: "none",
                            color: "white",
                            backgroundColor: "#fd7c7c",
                          }}
                          aria-label="Previous"
                          onClick={this.goBack}
                        >
                          <span aria-hidden="true">&laquo;</span>
                        </Link>
                      </li>
                      <li
                        className="page-item bg-light d-flex justify-content-center align-items-center"
                        style={{ width: "40px" }}
                      >
                        {this.state.currentPage}
                      </li>
                      <li className="page-item">
                        <Link
                          className={
                            "page-link " +
                            (this.state.disableForward ? "disabled-link" : "")
                          }
                          style={{
                            textDecoration: "none",
                            color: "white",
                            backgroundColor: "#fd7c7c",
                          }}
                          aria-label="Next"
                          onClick={this.goForward}
                        >
                          <span aria-hidden="true">&raquo;</span>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
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
    loggedUser: auth.success,
    profileLoader: test.profileLoader,
    profile: test.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProfile: (userId, currentPage) =>
      dispatch(getUserProfile(userId, currentPage)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
