import "./index.css";
import { useParams } from "react-router-dom";

import BookReader from "../../components/BookReader";
import FavouriteButton from "../../components/FavouriteButton";
import ReadingProgress from "../../components/ReadingProgress";
import CommentSection from "../../components/CommentSection";

export const Reader = () => {
  const { id } = useParams();

  return (
    <div className="reader-page">
      <div className="reader-header">
        <div className="book-info">
          <h1>Title of the book #{id}</h1>
          <p>Author Name</p>
        </div>

        <div className="favorite-container">
          <FavouriteButton />
        </div>
      </div>

      <BookReader />

      <div className="reader-toolbar">
        <button> Previous</button>

        <span>Page 1 / 100</span>

        <button>Next </button>

        <div className="zoom-controls">
          <button>-</button>
          <span>100%</span>
          <button>+</button>
        </div>
      </div>

      <ReadingProgress />

      <CommentSection />
    </div>
  );
};
