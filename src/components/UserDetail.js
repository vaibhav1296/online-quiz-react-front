import React from "react";
import helper from "../config/helper";

const UserDetail = (props) => {
  const name = helper.editName(props.user.name);
  const gender = helper.editName(props.user.gender);
  return (
    <div
      className="container mt-5 mb-3 p-3 border rounded"
      style={{
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fed7d7",
      }}
    >
      <div className="row">
        <div className="col-sm-4">
          <h5 style={{ fontWeight: "bolder", letterSpacing: "2px" }}>
            <i class="fas fa-file-signature"></i> Name:
          </h5>
        </div>
        <div className="col-sm-8">
          <p>{name}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4">
          <h5 style={{ fontWeight: "bolder", letterSpacing: "2px" }}>
            <i class="fas fa-envelope"></i> Email:
          </h5>
        </div>
        <div className="col-sm-8">
          <p>{props.user.email}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4">
          <h5 style={{ fontWeight: "bolder", letterSpacing: "2px" }}>
            <i class="fas fa-genderless"></i> Gender:
          </h5>
        </div>
        <div className="col-sm-8">
          <p>{gender}</p>
        </div>
      </div>
    </div>
  );
};
export default UserDetail;
