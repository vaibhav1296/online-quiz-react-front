import React, { Component } from "react";
import QuestionCard from "./QuestionCard";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { submitTest, resetTestErrorState } from "../store/actions/userActions";
import Loader from "./Loader";
import PopUp from "./PopUp";
class Test extends Component {
  state = {
    flagForRendering: true,
    topic_id: "",
    quizId: "",
    total_marks: "",
    questionSet: [],
    message: "",
    alertCondition: false,
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
    this.props.resetTestErrorState();
    this.setState(
      {
        alertCondition: false,
      },
      () => {
        this.props.history.push(
          `/test-details/${this.props.location.state.topicId}`
        );
      }
    );
  };
  static getDerivedStateFromProps(props, state) {
    if (props.renderTest && state.flagForRendering) {
      const { totalMarks, quizId, topicId } = { ...props.test };
      const questionSetArr = [...props.test.questionSet.list];
      const questionSet = questionSetArr.map((set) => {
        const question = JSON.parse(set.name);
        return {
          id: set.questionId,
          title: question.title,
          options: question.options,
          answer: question.answer,
          submittedChoice: "",
        };
      });

      return {
        flagForRendering: false,
        topic_id: topicId,
        quizId: quizId,
        total_marks: totalMarks,
        questionSet,
      };
    } else {
      return null;
    }
  }

  clickOnAnswer = (e, questionId, answerId) => {
    const questionSet = [...this.state.questionSet];
    const answeredQuestionSet = questionSet.map((question) => {
      if (question.id === questionId) {
        question.submittedChoice = answerId;
      }
      return question;
    });
    this.setState({ questionSet: answeredQuestionSet });
  };
  handleSubmit = () => {
    const componentState = { ...this.state };
    const stateQuestionSet = [...componentState.questionSet];
    const questionSet = stateQuestionSet.map((set) => {
      return {
        question: {
          id: set.id,
          title: set.title,
          options: set.options,
          answer: set.answer,
        },
        submittedChoice: set.submittedChoice,
      };
    });
    const answerSheet = {
      topic_id: componentState.topic_id,
      quizId: componentState.quizId,
      total_marks: componentState.total_marks,
      questionSet: questionSet,
    };
    this.props.submitTest(answerSheet);
  };
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
            <div className="container mt-3 mb-3" id="test-container">
              <div className="d-flex justify-content-center align-items-center p-3">
                <h5>Best Of Luck!!!!</h5>
              </div>
              {this.props.renderResult ? (
                <Redirect to="/home" />
              ) : (
                <div>
                  {!this.state.flagForRendering ? (
                    <div key={this.state.topic_id}>
                      {this.state.questionSet.map((question) => {
                        return (
                          <QuestionCard
                            key={question.id}
                            question={question}
                            clickOnAnswer={this.clickOnAnswer}
                          />
                        );
                      })}
                      <div className="d-flex justify-content-center align-items-center">
                        <Link
                          to="/result"
                          className="btn"
                          onClick={this.handleSubmit}
                        >
                          Submit Test
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <Loader />
                  )}
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
    renderTest: test.renderTest,
    isError: test.isError,
    errorData: test.errorData,
    test: test.test,
    renderResult: test.renderResult,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitTest: (answerSheet) => dispatch(submitTest(answerSheet)),
    resetTestErrorState: () => dispatch(resetTestErrorState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
