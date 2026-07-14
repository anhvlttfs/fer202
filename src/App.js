import { Routes, Route } from "react-router-dom";
import { TopBar, Footer } from "./components/index"
import { Home } from "./pages";

const App = () => {
    return (
        <>
            <header>
                <TopBar />
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default App;