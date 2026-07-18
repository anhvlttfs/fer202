import { Routes, Route } from "react-router-dom";
import { TopBar, Footer } from "./components/index"
import { Home, Login, Book, Reader } from "./pages";

const App = () => {
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
                </Routes>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default App;
