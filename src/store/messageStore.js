import { createContext } from "react";

// useContext
export const MessageContext = createContext({});

export const initState = {
  type: "", // success, danger
  title: "",
  text: "",
};

// Reducer
export const messageReducer = (state, action) => {
  switch (action.type) {
    case "POST_MESSAGE":
      return {
        ...action.payload,
      };
    case "CLEAR_MESSAGE":
      return {
        ...initState,
      };
    default:
      return state;
  }
};

export const handleSuccessMessage = (dispatch, res) => {
  dispatch({
    type: "POST_MESSAGE",
    payload: {
      type: "success",
      title: "更新成功",
      text: res.data.message,
    },
  });
  setTimeout(() => {
    dispatch({
      type: "CLEAR_MESSAGE",
    });
  }, 3000);
};

export const handleErrorMessage = (dispatch, error) => {
  dispatch({
    type: "POST_MESSAGE",
    payload: {
      type: "danger",
      title: "失敗",
      text: Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message.join("、")
        : error?.response?.data?.message,
    },
  });
  setTimeout(() => {
    dispatch({
      type: "CLEAR_MESSAGE",
    });
  }, 3000);
};
