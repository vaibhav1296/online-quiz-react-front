import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { startTest } from "../store/actions/userActions";

class TestDetails extends Component {
  state = {
    level: "",
    topicId: this.props.match.params.id,
    topic: null,
  };
  static getDerivedStateFromProps(props, state) {
    let topic = null;
    for (let i = 0; i < props.topics.length; i++) {
      if (String(props.topics[i].topicId) === String(props.match.params.id)) {
        topic = props.topics[i];
        break;
      }
    }
    return {
      topic: topic,
    };
  }
  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = (e) => {
    this.props.startTest({
      topic_id: this.state.topicId,
      level: this.state.level,
    });
    this.props.history.push("/test", {
      topicId: this.state.topicId,
    });
  };
  render() {
    const { loggedIn } = this.props;
    return (
      <div>
        {loggedIn ? (
          <div>
            <div className="container mt-3 mb-3" id="logInDiv">
              <h3
                id="signInTitle"
                className="pt-3 d-flex justify-content-center"
              >
                {this.state.topic.name}
              </h3>
              <hr id="hrStyle" />
              <h5 className="mt-3">
                <i class="fas fa-file-medical-alt"></i> Topic Description
              </h5>
              <p style={{ letterSpacing: "1px", fontSize: "14px" }}>
                {this.state.topic.topicDescription}
              </p>
              <h5 className="mt-3">
                <i class="fas fa-info-circle"></i> Test Detail
              </h5>
              <p style={{ letterSpacing: "1px", fontSize: "14px" }}>
                {this.state.topic.topicTestDetail}
              </p>
              {/* <p style={{ fontWeight: "bolder" }}>
              Please select the difficulty level
            </p> */}
              <div className="mb-3">
                <label htmlFor="level" className="form-label" id="labelTag">
                  <i class="fas fa-layer-group"></i> Level:
                </label>
                <select
                  id="level"
                  onChange={this.handleChange}
                  className="form-control"
                >
                  <option>Please select the difficulty level</option>
                  <option value="easy">easy</option>
                  <option value="medium">medium</option>
                  <option value="hard">hard</option>
                </select>
              </div>
              {/* <button onClick={this.handleSubmit}>Go for test</button> */}
              <div className="mb-3 d-flex justify-content-center">
                <button className="btn mb-3" onClick={this.handleSubmit}>
                  Go to Test
                </button>
              </div>
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
    startTest: (testDetail) => dispatch(startTest(testDetail)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestDetails);
