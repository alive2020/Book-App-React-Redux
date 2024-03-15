import * as actions from "./actionTypes";

export const addBook = (newBook) => {
  return {
    type: actions.ADD_BOOK,
    payload: newBook,
  };
};
