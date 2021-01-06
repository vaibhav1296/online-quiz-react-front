import React from "react";
import helper from "../config/helper";

const UserQuizDetail = (props) => {
  return (
    <div
      className="container mt-5 mb-3"
      style={{
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fed7d7",
      }}
    >
      <div className="row mb-2" style={{ backgroundColor: "#fd9696" }}>
        <div className="col-3 p-1" style={{ fontWeight: "bolder" }}>
          Topic Name
        </div>
        <div className="col-2 p-1" style={{ fontWeight: "bolder" }}>
          Obtained Marks
        </div>
        <div className="col-2 p-1" style={{ fontWeight: "bolder" }}>
          Total Marks
        </div>
        <div className="col-2 p-1" style={{ fontWeight: "bolder" }}>
          Level
        </div>
        <div className="col-3 p-1" style={{ fontWeight: "bolder" }}>
          Date
        </div>
      </div>
      {/* <hr className="mt-2 mb-2" /> */}
      {props.profileData.map((obj) => {
        const topicName = helper.editName(obj.topicName);
        return (
          <div className="row" style={{ fontSize: "14px" }} key={obj.quizId}>
            <div className="col-3 p-2">{topicName}</div>
            <div className="col-2 p-2">{obj.obtainedMarks}</div>
            <div className="col-2 p-2">{obj.totalMarks}</div>
            <div className="col-2 p-2">{obj.level}</div>
            <div className="col-3 p-2">{obj.createdAt}</div>
          </div>
        );
      })}
    </div>
  );
};
export default UserQuizDetail;
