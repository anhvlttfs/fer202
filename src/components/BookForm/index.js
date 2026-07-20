import { useState, useEffect } from "react";
import "./index.css";

export default function BookForm({ onSubmit, editingBook, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    description: "",
    pdfUrl: "",
    image: "",
  });

  useEffect(() => {
    if (editingBook) {
      setForm(editingBook);
    } else {
      setForm({
        title: "",
        author: "",
        genre: "",
        year: "",
        description: "",
        pdfUrl: "",
        image: "",
      });
    }
  }, [editingBook]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...form,
      year: Number(form.year),
    });
  };

  return (
    <div className="form-popup">
      <div className="form-box">
        <h3>{editingBook ? "Edit Book" : "Add Book"}</h3>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
          />

          <input
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={handleChange}
          />

          <input
            name="genre"
            placeholder="Genre"
            value={form.genre}
            onChange={handleChange}
          />

          <input
            type="number"
            name="year"
            placeholder="Year"
            value={form.year}
            onChange={handleChange}
            min="0"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
          <input
            name="pdfUrl"
            placeholder="PDF URL"
            value={form.pdfUrl}
            onChange={handleChange}
          />

          <input
            name="image"
            placeholder="Image URL (vd: images/book.jpg)"
            value={form.image}
            onChange={handleChange}
          />

          <div className="form-actions">
            <button type="submit">{editingBook ? "Update" : "Add"}</button>

            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
