import { utilityFunctions } from "../../config/utility";
const initState = {
  loggedIn: false,
  success: null,
  isError: false,
  errorData: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "REGISTER":
      utilityFunctions.saveKey("userToken", action.data.token);
      return {
        ...state,
        loggedIn: true,
        success: action.data.user,
        isError: false,
        errorData: null,
      };
    case "REGISTER_ERROR":
      return {
        ...state,
        isError: true,
        errorData: action.data,
      };
    case "LOGIN":
      utilityFunctions.saveKey("userToken", action.data.token);
      return {
        ...state,
        loggedIn: true,
        success: action.data.user,
        isError: false,
        errorData: null,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        isError: true,
        errorData: action.data,
      };
    case "LOGOUT":
      return {
        ...state,
        loggedIn: false,
        success: {},
        isError: false,
        errorData: null,
      };
    case "LOGOUT_ERROR":
      return {
        ...state,
        isError: true,
        errorData: action.data,
      };
    case "RESET_AUTH_ERROR":
      return {
        ...state,
        isError: false,
        errorData: null,
      };
    default:
      return state;
  }
};

export default authReducer;
