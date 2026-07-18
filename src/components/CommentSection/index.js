import "./index.css";

function CommentSection() {
  return (
    <div className="comment-section">
      <h3>🗒️Comments</h3>

      <textarea placeholder="Write your comment..."></textarea>

      <button>Post Comment</button>
    </div>
  );
}

export default CommentSection;
