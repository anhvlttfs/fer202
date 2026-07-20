import { Routes, Route } from "react-router-dom";
import { TopBar, Footer } from "./components/index";
import { Home, Login, Book, Reader } from "./pages";
import Admin from "./pages/Admin";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const App = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <header>
        <TopBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book" element={<Book />} />
          <Route path="/book/:id" element={<Reader />} />
          <Route
            path="/admin"
            element={
              user?.role === "admin" ? (
                <Admin />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default App;
