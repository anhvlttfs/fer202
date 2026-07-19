import "./index.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import BookReader from "../../components/BookReader";
import FavouriteButton from "../../components/FavouriteButton";
import CommentSection from "../../components/CommentSection";

export const Reader = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  if (!book) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="reader-page">
      <div className="reader-header">
        <div className="book-info">
          <h1>{book.title}</h1>
          <p>{book.author}</p>
        </div>

        <div className="favorite-container">
          <FavouriteButton bookId={book.id} />
        </div>
      </div>

      <BookReader book={book} />
      <CommentSection bookId={book.id} />
    </div>
  );
};
