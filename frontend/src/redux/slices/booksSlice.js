import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import createBookWithID from "../../components/utils/createBookWithID";
import { setError } from "./errorSlice";

const initialState = [];

export const fetchBook = createAsyncThunk(
  "books/fetchBook",
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      throw error;
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
    },
    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload);
      //   const index = state.findIndex((book) => book.id === action.payload);
      //   if (index !== -1) {
      //     state.splice(index, 1);
      //   }
    },
    toggleFavorite: (state, action) => {
      //   return state.map((book) =>
      //     book.id === action.payload
      //       ? { ...book, isFavorite: !book.isFavorite }
      //       : book
      //   );
      state.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });
    },
  },
  // extraReducers:  {
  //   [fetchBook.fulfilled]: (state, action) => {
  //     if (action.payload.title && action.payload.title) {
  //       state.push(createBookWithID(action.payload, "API"));
  //     }
  //   };
  // },
  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      if (action.payload.title && action.payload.title) {
        state.push(createBookWithID(action.payload, "API"));
      }
    });
  },
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;
export const selectBooks = (state) => state.books;

export default booksSlice.reducer;
