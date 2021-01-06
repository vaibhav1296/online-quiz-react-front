import axios from "axios";
const baseUrl = "http://localhost:3001/online-quiz";
export const register = (userDetails) => {
  return (dispatch, getState) => {
    axios({
      method: "POST",
      url: `${baseUrl}/register`,
      data: {
        ...userDetails,
      },
    })
      .then((res) => {
        dispatch({ type: "REGISTER", data: res.data });
      })
      .catch((err) => {
        dispatch({ type: "REGISTER_ERROR", data: err.response.data });
      });
  };
};

export const login = (userDetails) => {
  return (dispatch, getState) => {
    axios({
      method: "POST",
      url: `${baseUrl}/login`,
      data: {
        ...userDetails,
      },
    })
      .then((res) => {
        dispatch({ type: "LOGIN", data: res.data });
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_ERROR", data: err.response.data });
      });
  };
};

export const logout = () => {
  const token = sessionStorage.getItem("userToken");
  return (dispatch, getState) => {
    axios({
      method: "DELETE",
      url: `${baseUrl}/logout`,
      headers: {
        authorization: `bearer ${token}`,
      },
    })
      .then(async (res) => {
        await sessionStorage.clear();
        dispatch({ type: "LOGOUT", data: res.data });
      })
      .catch((err) => {
        dispatch({ type: "LOGOUT_ERROR", data: err.response.data });
      });
  };
};

export const getAllTopics = () => {
  const token = sessionStorage.getItem("userToken");
  return (dispatch, getState) => {
    axios({
      method: "GET",
      url: `${baseUrl}/system/topics`,
      headers: {
        authorization: `bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch({ type: "GET_ALL_TOPICS", data: res.data });
      })
      .catch((err) => {
        dispatch({ type: "GET_ALL_TOPIC_ERROR", data: err.response.data });
      });
  };
};

export const resetTestErrorState = () => {
  return (dispatch, getState) => {
    dispatch({ type: "RESET_TEST_ERROR", data: true });
  };
};
export const resetAuthErrorState = () => {
  return (dispatch, getState) => {
    dispatch({ type: "RESET_AUTH_ERROR", data: true });
  };
};

export const startTest = (testDetail) => {
  const token = sessionStorage.getItem("userToken");
  return (dispatch, getState) => {
    axios({
      method: "POST",
      url: `${baseUrl}/user/create-quiz`,
      headers: {
        authorization: `bearer ${token}`,
      },
      data: {
        ...testDetail,
      },
    })
      .then((res) => {
        dispatch({ type: "TEST", data: res.data });
      })
      .catch((err) => {
        dispatch({ type: "TEST_ERROR", data: err.response.data });
      });
  };
};

export const submitTest = (answerSheet) => {
  const token = sessionStorage.getItem("userToken");
  // const body = JSON.stringify(answerSheet);
  return (dispatch, getState) => {
    axios({
      method: "POST",
      url: `${baseUrl}/user/submit-quiz`,
      headers: {
        authorization: `bearer ${token}`,
      },
      data: {
        ...answerSheet,
      },
    })
      .then((res) => {
        dispatch({ type: "SUBMIT_TEST", data: res.data });
      })
      .catch((err) => {
        dispatch({ type: "SUBMIT_TEST_ERROR", data: err.response.data });
      });
  };
};

export const getUserProfile = (userId, currentPage) => {
  const token = sessionStorage.getItem("userToken");

  return (dispatch, getState) => {
    axios({
      method: "GET",
      url: `${baseUrl}/user/profile/${userId}?page=${currentPage}`,
      headers: {
        authorization: `bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch({ type: "GET_PROFILE", data: res.data });
      })
      .catch((err) => {
        dispatch({ type: "GET_PROFILE_ERROR", data: err.response.data });
      });
  };
};
