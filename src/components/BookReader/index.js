import "./index.css";
import { useEffect, useState } from "react";

function BookReader({ bookId }) {
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/books/${bookId}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [bookId]);

  if (!book) {
    return <div className="book-reader-loading">Loading PDF...</div>;
  }

  return (
    <div className="book-reader">
      <div className="book-reader-shell">
        <iframe
          className="book-reader-iframe"
          src={book.pdfUrl}
          title={book.title}
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default BookReader;
