export const messageReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_MESSAGES_REQUEST":
    case "SEND_MESSAGE_REQUEST":
    case "RESPOND_MESSAGE_REQUEST":
      return { ...state, loading: true, error: null };

    case "FETCH_MESSAGES_SUCCESS":
      return { ...state, loading: false, messages: action.payload };

    case "SEND_MESSAGE_SUCCESS":
      return {
        ...state,
        loading: false,
        messages: [...state.messages, action.payload],
        successMessage: "Message sent successfully", // Success message handled
      };

    case "RESPOND_MESSAGE_SUCCESS":
      return {
        ...state,
        loading: false,
        messages: state.messages.map((msg) =>
          msg._id === action.payload._id ? action.payload : msg
        ),
        successMessage: "Response sent successfully", // Success message handled
      };

    case "FETCH_MESSAGES_FAILURE":
    case "SEND_MESSAGE_FAILURE":
    case "RESPOND_MESSAGE_FAILURE":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
