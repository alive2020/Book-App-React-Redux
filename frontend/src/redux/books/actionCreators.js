import * as actions from "./actionTypes";

export const addBook = (newBook) => {
  return {
    type: actions.ADD_BOOK,
    payload: newBook,
  };
};

export const deleteBook = (id) => {
  return {
    type: actions.DELETE_BOOK,
    payload: id,
  };
};
