import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { addBook } from "../../redux/books/actionCreators";
import { addBook, fetchBook } from "../../redux/slices/booksSlice";
import booksData from "../data/books.json";

import "./BookForm.css";
import createBookWithID from "../utils/createBookWithID";
import { setError } from "../../redux/slices/errorSlice";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();

  const handleAddRandomBook = (e) => {
    e.preventDefault();

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
    } else {
      console.log("here");
      dispatch(setError("You must fill title and author"));
    }
  };

  const handleAddRandomBookViaAPI = (e) => {
    e.preventDefault();

    dispatch(fetchBook("http://localhost:4000/random-book"));
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
