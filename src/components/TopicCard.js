import React, { Component } from "react";
import helper from "../config/helper";

class TopicCard extends Component {
  render() {
    const name = helper.editName(this.props.topic.name);
    return (
      <div className="card mt-2" id="topic-card">
        <div className="card-body">
          <h5 className="card-title">
            <i class="fas fa-book-open"></i>
            {` ${name}`}
          </h5>
          <p
            className="card-text mt-2"
            style={{ textIndent: "15px", fontSize: "15px", color: "#464643" }}
          >
            {`${this.props.topic.topicDescription
              .split(" ")
              .slice(0, 15)
              .join(" ")}....`}
          </p>
          <button
            className="btn"
            style={{ letterSpacing: "1px" }}
            onClick={() => this.props.goToDetailPage(this.props.topic.topicId)}
            // to={`/test-details/${this.props.topic.topicId}`}
          >
            Go to test details
          </button>
        </div>
      </div>
    );
  }
}

export default TopicCard;
