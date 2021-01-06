import React, { Component } from "react";
import TopicCard from "./TopicCard";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  getAllTopics,
  resetTestErrorState,
} from "../store/actions/userActions";
import Loader from "./Loader";
import PopUp from "./PopUp";

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: null,
      alertCondition: false,
      message: "",
    };
  }
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
  static getDerivedStateFromProps(props, state) {
    if (props.loader) {
      return null;
    } else {
      return {
        topics: props.topics,
      };
    }
  }
  goToDetailPage = (topicId) => {
    this.props.history.push(`/test-details/${topicId}`);
  };
  componentDidMount() {
    this.props.getAllTopics();
  }
  render() {
    const { loggedIn } = this.props;
    return (
      <div>
        {loggedIn ? (
          <div>
            <PopUp
              open={this.state.alertCondition}
              close={this.handleClose}
              message={this.state.message}
            />
            <div
              className="container mt-3 mb-3 p-3"
              id="home-container"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom right, rgba(254,215,215,0), rgba(254,215,215,1))",
              }}
            >
              {this.props.loader ? (
                <Loader />
              ) : (
                <div className="row">
                  {this.state.topics.map((topic) => {
                    // return <TopicCard key={topic.topicId} topic={topic} />;
                    return (
                      <div className="col-md-6">
                        <TopicCard
                          key={topic.topicId}
                          topic={topic}
                          goToDetailPage={this.goToDetailPage}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
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
    success: auth.success,
    topics: test.topics,
    loader: test.loader,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllTopics: () => dispatch(getAllTopics()),
    resetTestErrorState: () => dispatch(resetTestErrorState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
