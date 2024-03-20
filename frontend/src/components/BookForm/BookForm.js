import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
// import { addBook } from "../../redux/books/actionCreators";
import { addBook } from "../../redux/slices/booksSlice";
import booksData from "../data/books.json";

import "./BookForm.css";
import createBookWithID from "../utils/createBookWithID";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];
    // const randomBookWithId = createBookWithID(randomBook);
    dispatch(addBook(createBookWithID(randomBook, "random")));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && author) {
      // const book = createBookWithID({ title, author });
      dispatch(addBook(createBookWithID({ title, author }, "manual")));

      setTitle("");
      setAuthor("");
    }
  };

  const handleAddRandomBookViaAPI = async () => {
    try {
      const response = await axios.get("http://localhost:4000/random-book");
      if (response?.data?.title && response?.data?.author) {
        console.log("res", response);
        dispatch(addBook(createBookWithID(response.data, "API")));
      }
    } catch (error) {
      console.log("errrr", error);
      // setError(error.message);
      // setResponseData(null);
    }
  };

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
        <button type="submit" onClick={handleAddRandomBook}>
          Add Random
        </button>
        <button type="submit" onClick={handleAddRandomBookViaAPI}>
          Add Random via API
        </button>
      </form>
    </div>
  );
};

export default BookForm;
