import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BookFilters, BookHeroSection, BookListSection } from "../../components";
import "./index.css";

export const Book = () => {
    const booksPerPage = 12;
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [genreFilter, setGenreFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [favoriteBooks, setFavoriteBooks] = useState({});

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch("http://localhost:5000/books");

                if (!response.ok) {
                    throw new Error("Unable to load books right now.");
                }

                const data = await response.json();
                setBooks(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message || "Something went wrong while loading books.");
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, []);

    useEffect(() => {
        const loadFavorites = async () => {
            if (!user) {
                setFavoriteBooks({});
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/favourites?userId=${user.id}`);
                const favourites = response.ok ? await response.json() : [];
                const nextFavorites = {};

                (Array.isArray(favourites) ? favourites : []).forEach((item) => {
                    nextFavorites[item.bookId] = true;
                });

                setFavoriteBooks(nextFavorites);
            } catch (err) {
                setFavoriteBooks({});
            }
        };

        loadFavorites();
    }, [user]);

    const genres = useMemo(() => {
        const uniqueGenres = books
            .map((book) => book.genre)
            .filter(Boolean);

        return ["all", ...new Set(uniqueGenres)];
    }, [books]);

    const filteredBooks = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase();

        return books.filter((book) => {
            const title = (book.title || "").toLowerCase();
            const genre = (book.genre || "").toLowerCase();
            const isFavorite = Boolean(favoriteBooks[book.id]);
            const matchesSearch = title.includes(normalizedSearch);
            const matchesGenre = genreFilter === "all" || genreFilter === "favorites" || genre === genreFilter.toLowerCase();
            const matchesFavorite = genreFilter === "favorites" ? isFavorite : true;

            return matchesSearch && matchesGenre && matchesFavorite;
        });
    }, [books, favoriteBooks, genreFilter, searchTerm]);

    const featuredBook = books.find((book) => book.id === "1") || books[0] || null;
    const totalPages = Math.max(1, Math.ceil(filteredBooks.length / booksPerPage));
    const paginatedBooks = filteredBooks.slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, genreFilter]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const toggleFavorite = async (bookId) => {
        if (!user) {
            window.alert("Please sign in to save favorite books.");
            navigate("/login");
            return;
        }

        const existingResponse = await fetch(`http://localhost:5000/favourites?userId=${user.id}&bookId=${bookId}`);
        const existing = existingResponse.ok ? await existingResponse.json() : [];

        if (Array.isArray(existing) && existing.length > 0) {
            await Promise.all(
                existing.map((item) =>
                    fetch(`http://localhost:5000/favourites/${item.id}`, { method: "DELETE" }),
                ),
            );

            setFavoriteBooks((previousFavorites) => ({
                ...previousFavorites,
                [bookId]: false,
            }));
            return;
        }

        await fetch("http://localhost:5000/favourites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: user.id,
                bookId,
            }),
        });

        setFavoriteBooks((previousFavorites) => ({
            ...previousFavorites,
            [bookId]: true,
        }));
    };

    const handleReadBook = (bookId) => {
        if (!user) {
            window.alert("Please sign in to read books.");
            navigate("/login");
            return;
        }

        navigate(`/book/${bookId}`);
    };

    const favoriteCount = Object.values(favoriteBooks).filter(Boolean).length;

    return (
        <>
            <BookHeroSection
                bookCount={books.length}
                favoriteCount={favoriteCount}
                genreCount={genres.length > 0 ? genres.length - 1 : 0}
                featuredBook={featuredBook}
            />

            <section className="book-list-wrapper">
                <BookFilters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    genreFilter={genreFilter}
                    setGenreFilter={setGenreFilter}
                    genres={genres}
                />

                <BookListSection
                    loading={loading}
                    error={error}
                    filteredBooks={filteredBooks}
                    paginatedBooks={paginatedBooks}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    favoriteBooks={favoriteBooks}
                    onToggleFavorite={toggleFavorite}
                    onReadBook={handleReadBook}
                    onPageChange={setCurrentPage}
                />
            </section>
        </>
    );
};
