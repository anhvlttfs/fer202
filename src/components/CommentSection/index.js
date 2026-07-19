import "./index.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function CommentSection({ bookId }) {
  const user = useSelector((state) => state.auth.user);

  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    loadComments();
  }, [bookId]);

  const loadComments = () => {
    fetch(`http://localhost:5000/comments?bookId=${bookId}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  };

  const handlePost = () => {
    if (!user) {
      alert("Please login to comment.");
      return;
    }

    if (!content.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    const comment = {
      bookId,
      userId: user.id,
      userName: user.name,
      content,
      createdAt: new Date().toLocaleString(),
    };

    fetch("http://localhost:5000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    }).then(() => {
      setContent("");
      loadComments();
    });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/comments/${id}`, {
      method: "DELETE",
    }).then(loadComments);
  };

  const handleSave = (comment) => {
    fetch(`http://localhost:5000/comments/${comment.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...comment,
        content: editContent,
      }),
    }).then(() => {
      setEditingId(null);
      loadComments();
    });
  };

  return (
    <div className="comment-section">
      <h3>🗒️ Comments</h3>

      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div className="comment-card" key={comment.id}>
            <div className="comment-header">
              <strong>{comment.userName}</strong>

              {user &&
                (user.id === comment.userId || user.role === "admin") && (
                  <div>
                    {user.id === comment.userId && (
                      <button
                        className="edit-btn rounded bg-secondary text-white"
                        onClick={() => {
                          setEditingId(comment.id);
                          setEditContent(comment.content);
                        }}
                      >
                        Edit
                      </button>
                    )}

                    <button
                      className="delete-btn rounded bg-danger text-white"
                      onClick={() => handleDelete(comment.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
            </div>

            {editingId === comment.id ? (
              <>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />

                <button
                  onClick={() => handleSave(comment)}
                  className="me-3 bg-success text-white rounded"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditingId(null)}
                  className="me-3 bg-secondary text-white rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p>{comment.content}</p>
                <small>{comment.createdAt}</small>
              </>
            )}
          </div>
        ))
      )}

      <hr />

      {user ? (
        <>
          <textarea
            placeholder="Write your comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            className="post-btn rounded bg-success text-white"
            onClick={handlePost}
          >
            Post Comment
          </button>
        </>
      ) : (
        <strong className="ms-2">Please login to comment.</strong>
      )}
    </div>
  );
}

export default CommentSection;
