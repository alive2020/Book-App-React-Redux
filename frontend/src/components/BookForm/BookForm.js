import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// import { addBook } from "../../redux/books/actionCreators";
import {
  addBook,
  fetchBook,
  selectIsLoadingViaAPI,
} from "../../redux/slices/booksSlice";
import booksData from "../data/books.json";

import "./BookForm.css";
import createBookWithID from "../utils/createBookWithID";
import { setError } from "../../redux/slices/errorSlice";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const isLoadingViaAPI = useSelector(selectIsLoadingViaAPI);
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
    // try {
    //   setIsLoading(true);
    //   await dispatch(fetchBook("http://localhost:4000/random-book"));
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className=" book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            placeholder="Enter author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
        <button type="submit" className="randBtn" onClick={handleAddRandomBook}>
          Add Random
        </button>
        <button
          type="submit"
          className="apiBtn"
          onClick={handleAddRandomBookViaAPI}
          disabled={isLoadingViaAPI}
        >
          {isLoadingViaAPI ? (
            <>
              <span>Loading book...</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            "Add Random via API"
          )}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
