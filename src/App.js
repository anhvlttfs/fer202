import { Routes, Route } from "react-router-dom";
import { TopBar, Footer } from "./components/index"
import { Home, Login } from "./pages";

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
                </Routes>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default App;