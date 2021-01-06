const initState = {
  topics: null,
  test: null,
  loader: true,
  isError: false,
  renderTest: false,
  profileLoader: true,
  profile: null,
  testResult: null,
  renderResult: false,
  errorData: null,
};
const testReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_ALL_TOPICS":
      return {
        ...state,
        topics: action.data.topics,
        loader: false,
        isError: false,
        errorData: null,
        renderResult: false,
      };
    case "GET_ALL_TOPICS_ERROR":
      return {
        ...state,
        isError: true,
        errorData: action.data,
      };
    case "TEST":
      return {
        ...state,
        test: action.data,
        renderTest: true,
        isError: false,
        errorData: null,
      };
    case "TEST_ERROR":
      return {
        ...state,
        isError: true,
        errorData: action.data,
      };
    case "SUBMIT_TEST":
      return {
        ...state,
        testResult: action.data,
        renderResult: true,
        renderTest: false,
        isError: false,
        errorData: null,
      };
    case "SUBMIT_TEST_ERROR":
      return {
        ...state,
        isError: true,
        errorData: action.data,
      };
    case "GET_PROFILE":
      return {
        ...state,
        profileLoader: false,
        profile: action.data,
        isError: false,
        errorData: null,
      };
    case "GET_PROFILE_ERROR":
      return {
        ...state,
        isError: true,
        errorData: action.data,
      };
    case "RESET_TEST_ERROR":
      return {
        ...state,
        isError: false,
        errorData: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export default testReducer;
