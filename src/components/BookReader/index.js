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
    return <p>Loading PDF...</p>;
  }

  return (
    <iframe src={book.pdfUrl} width="100%" height="700px" title={book.title} />
  );
}
export default BookReader;
