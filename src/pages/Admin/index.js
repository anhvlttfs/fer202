import { useEffect, useState } from "react";
import "./index.css";
import BookForm from "../../components/BookForm";

export default function Admin() {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const loadBooks = () => {
    fetch("http://localhost:5000/books")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(Array.isArray(data)); // phải là true
        setBooks(data);
      });
  };
  useEffect(() => {
    loadBooks();
  }, []);

  // ✅ ADD
  const handleAdd = (data) => {
    // Kiểm tra trùng tên (không phân biệt hoa thường và bỏ khoảng trắng đầu/cuối)
    const isExist = books.some(
      (book) =>
        book.title.trim().toLowerCase() === data.title.trim().toLowerCase(),
    );

    if (isExist) {
      alert("Book title already exists!");
      return;
    }

    // Lấy id lớn nhất
    const numericIds = books
      .map((book) => Number(book.id))
      .filter((id) => !isNaN(id));

    const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;

    const newBook = {
      id: maxId + 1,
      ...data,
    };

    fetch("http://localhost:5000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    }).then(() => {
      setShowForm(false);
      loadBooks();
    });
  };
  // ✅ EDIT
  const handleEdit = (data) => {
    fetch(`http://localhost:5000/books/${editingBook.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...editingBook,
        ...data,
      }),
    }).then(() => {
      setEditingBook(null);
      setShowForm(false);
      loadBooks();
    });
  };

  // DELETE
  const deleteBook = (id) => {
    fetch(`http://localhost:5000/books/${id}`, {
      method: "DELETE",
    }).then(loadBooks);
  };

  // CLICK EDIT
  const editBook = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  return (
    <div className="admin-container">
      <h2>ADMIN - MANAGE BOOKS</h2>

      <button
        onClick={() => {
          setEditingBook(null);
          setShowForm(true);
        }}
      >
        Add Book
      </button>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Year</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.genre}</td>
              <td>{b.year}</td>
              <td>
                <button onClick={() => editBook(b)}>Edit</button>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this book?",
                      )
                    ) {
                      deleteBook(b.id);
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <BookForm
          onSubmit={editingBook ? handleEdit : handleAdd}
          editingBook={editingBook}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
