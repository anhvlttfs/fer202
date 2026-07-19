import "./index.css";

function BookReader({ book }) {
  return (
    <div className="book-reader">
      <iframe
        src={book.pdfUrl}
        width="100%"
        height="700px"
        title={book.title}
      />
    </div>
  );
}

export default BookReader;
