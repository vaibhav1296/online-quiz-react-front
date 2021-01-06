import React, { Component } from "react";

class QuestionCard extends Component {
  render() {
    const options = this.props.question.options;
    const clickOnAnswer = this.props.clickOnAnswer;
    const idArr = Object.keys(options);
    const valuesArr = Object.values(options);
    let optionsArr = [];
    for (let i = 0; i < idArr.length; i++) {
      optionsArr.push([idArr[i], valuesArr[i]]);
    }
    return (
      <div
        className="card  mb-1"
        // style={{ width: "18rem" }}
        key={this.props.question.questionId}
      >
        <div className="card-body" style={{ backgroundColor: "#feaaaa" }}>
          <h5 className="card-title">Q. {this.props.question.title}</h5>
          <div className="list-group" id="myList" role="tablist">
            {optionsArr.map((option) => {
              return (
                <div
                  className="list-group-item list-group-item-action"
                  data-bs-toggle="list"
                  role="tab"
                  key={option[0]}
                  id={option[0]}
                  onClick={(e) =>
                    clickOnAnswer(e, this.props.question.id, option[0])
                  }
                >
                  {option[1]}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionCard;
