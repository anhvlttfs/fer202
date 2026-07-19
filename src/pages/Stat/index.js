import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    LineChart,
    Line,
    Legend,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell,
    ResponsiveContainer,
} from "recharts";
import { BookStatePanel } from "../../components";
import "./index.css";

const API_BASE = "http://localhost:5000";

const GENRE_COLORS = [
    "#ff5833",
    "#38264b",
    "#a78bfa",
    "#4a2e65",
    "#e6a86b",
    "#111827",
    "#7c9885",
    "#c17f59",
];

export default function Stat() {
    const [books, setBooks] = useState(null);
    const [users, setUsers] = useState(null);
    const [comments, setComments] = useState(null);
    const [favourites, setFavourites] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        Promise.all([
            fetch(`${API_BASE}/books`).then((res) => res.json()),
            fetch(`${API_BASE}/user`).then((res) => res.json()),
            fetch(`${API_BASE}/comments`).then((res) => res.json()),
            fetch(`${API_BASE}/favourites`).then((res) => res.json()),
        ])
            .then(([booksData, usersData, commentsData, favouritesData]) => {
                setBooks(booksData);
                setUsers(usersData);
                setComments(commentsData);
                setFavourites(favouritesData);
            })
            .catch(() => {
                setError("Không thể tải dữ liệu thống kê. Vui lòng kiểm tra kết nối tới server.");
            });
    }, []);

    const genreData = useMemo(() => {
        if (!books) return [];
        const counts = {};
        books.forEach((b) => {
            const genre = b.genre || "Khác";
            counts[genre] = (counts[genre] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([genre, count]) => ({ genre, count }))
            .sort((a, b) => b.count - a.count);
    }, [books]);

    const decadeData = useMemo(() => {
        if (!books) return [];
        const counts = {};
        books.forEach((b) => {
            const year = Number(b.year);
            if (!year) return;
            const decade = Math.floor(year / 10) * 10;
            counts[decade] = (counts[decade] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([decade, count]) => ({ decade: `${decade}s`, count, sortKey: Number(decade) }))
            .sort((a, b) => a.sortKey - b.sortKey);
    }, [books]);

    const topFavourited = useMemo(() => {
        if (!books || !favourites) return [];
        const counts = {};
        favourites.forEach((f) => {
            const key = String(f.bookId);
            counts[key] = (counts[key] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([bookId, count]) => ({
                book: books.find((b) => String(b.id) === bookId),
                count,
            }))
            .filter((item) => item.book)
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [books, favourites]);

    const topCommented = useMemo(() => {
        if (!books || !comments) return [];
        const counts = {};
        comments.forEach((c) => {
            const key = String(c.bookId);
            counts[key] = (counts[key] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([bookId, count]) => ({
                book: books.find((b) => String(b.id) === bookId),
                count,
            }))
            .filter((item) => item.book)
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [books, comments]);

    const isLoading = !error && (!books || !users || !comments || !favourites);

    if (error) {
        return (
            <div className="stat-wrapper">
                <Container className="py-5">
                    <BookStatePanel error>{error}</BookStatePanel>
                </Container>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="stat-wrapper">
                <Container className="py-5">
                    <BookStatePanel>Đang tải số liệu thống kê...</BookStatePanel>
                </Container>
            </div>
        );
    }

    return (
        <div className="stat-wrapper">
            <Container className="stat-container p-5">
                <span className="stat-tag d-block mb-3">Tổng quan thư viện</span>
                <h1 className="stat-title mb-3">Thư viện của bạn, nhìn từ những con số</h1>
                <p className="stat-description mb-5">
                    Toàn bộ số liệu bên dưới được lấy trực tiếp từ dữ liệu sách, người dùng, bình luận
                    và mục yêu thích hiện có trên hệ thống.
                </p>

                {/* Overview numbers */}
                <Row className="g-4 mb-5">
                    <Col md={3} sm={6}>
                        <div className="stat-mini-card">
                            <span className="stat-number">{books.length}</span>
                            <span className="stat-label">Đầu sách</span>
                        </div>
                    </Col>
                    <Col md={3} sm={6}>
                        <div className="stat-mini-card">
                            <span className="stat-number">{users.length}</span>
                            <span className="stat-label">Người dùng</span>
                        </div>
                    </Col>
                    <Col md={3} sm={6}>
                        <div className="stat-mini-card">
                            <span className="stat-number">{comments.length}</span>
                            <span className="stat-label">Bình luận</span>
                        </div>
                    </Col>
                    <Col md={3} sm={6}>
                        <div className="stat-mini-card">
                            <span className="stat-number">{favourites.length}</span>
                            <span className="stat-label">Lượt yêu thích</span>
                        </div>
                    </Col>
                </Row>

                {/* Genre distribution */}
                <Row className="mb-5">
                    <Col>
                        <div className="stat-chart-card p-4">
                            <span className="stat-tag-muted d-block mb-3">Phân bố thể loại</span>
                            <h2 className="stat-chart-title mb-4">Sách theo thể loại</h2>
                            <ResponsiveContainer width="100%" height={320}>
                                <BarChart data={genreData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0e6d8" vertical={false} />
                                    <XAxis
                                        dataKey="genre"
                                        tick={{ fill: "#64748b", fontSize: 12 }}
                                        interval={0}
                                        angle={-20}
                                        textAnchor="end"
                                        height={70}
                                    />
                                    <YAxis allowDecimals={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ background: "#fffaf3", border: "1px solid #f5ebe0", borderRadius: 12 }}
                                        labelStyle={{ color: "#1a202c", fontWeight: 600 }}
                                    />
                                    <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                                        {genreData.map((entry, index) => (
                                            <Cell key={entry.genre} fill={GENRE_COLORS[index % GENRE_COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Col>
                </Row>

                {/* Genre share (pie) + publication trend (line) */}
                <Row className="g-4 mb-5">
                    <Col lg={5}>
                        <div className="stat-chart-card p-4 h-100">
                            <span className="stat-tag-muted d-block mb-3">Tỷ trọng thể loại</span>
                            <h2 className="stat-chart-title mb-4">Tỷ lệ sách theo thể loại</h2>
                            <ResponsiveContainer width="100%" height={320}>
                                <PieChart>
                                    <Pie
                                        data={genreData}
                                        dataKey="count"
                                        nameKey="genre"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={55}
                                        outerRadius={100}
                                        paddingAngle={2}
                                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                                        labelLine={false}
                                    >
                                        {genreData.map((entry, index) => (
                                            <Cell key={entry.genre} fill={GENRE_COLORS[index % GENRE_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ background: "#fffaf3", border: "1px solid #f5ebe0", borderRadius: 12 }}
                                        labelStyle={{ color: "#1a202c", fontWeight: 600 }}
                                    />
                                    <Legend
                                        layout="vertical"
                                        verticalAlign="middle"
                                        align="right"
                                        wrapperStyle={{ fontSize: 12, color: "#64748b" }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Col>
                    <Col lg={7}>
                        <div className="stat-chart-card p-4 h-100">
                            <span className="stat-tag-muted d-block mb-3">Xu hướng xuất bản</span>
                            <h2 className="stat-chart-title mb-4">Số sách theo thập niên xuất bản</h2>
                            <ResponsiveContainer width="100%" height={320}>
                                <LineChart data={decadeData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0e6d8" vertical={false} />
                                    <XAxis dataKey="decade" tick={{ fill: "#64748b", fontSize: 12 }} />
                                    <YAxis allowDecimals={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ background: "#fffaf3", border: "1px solid #f5ebe0", borderRadius: 12 }}
                                        labelStyle={{ color: "#1a202c", fontWeight: 600 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#ff5833"
                                        strokeWidth={3}
                                        dot={{ fill: "#38264b", r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Col>
                </Row>

                {/* Top books */}
                <Row className="g-4">
                    <Col lg={6}>
                        <div className="stat-top-card p-4">
                            <span className="featured-tag d-block mb-3">Được yêu thích nhất</span>
                            <h2 className="stat-chart-title-dark mb-3">Top sách yêu thích</h2>
                            {topFavourited.length === 0 ? (
                                <p className="stat-empty">Chưa có dữ liệu yêu thích.</p>
                            ) : (
                                <ul className="stat-rank-list">
                                    {topFavourited.map((item, index) => (
                                        <li key={item.book.id} className="stat-rank-item">
                                            <span className="stat-rank-index">{String(index + 1).padStart(2, "0")}</span>
                                            <div className="stat-rank-info">
                                                <span className="stat-rank-title">{item.book.title}</span>
                                                <span className="stat-rank-author">{item.book.author}</span>
                                            </div>
                                            <span className="stat-rank-count">{item.count} lượt</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="stat-top-card p-4">
                            <span className="featured-tag d-block mb-3">Được bàn luận nhiều nhất</span>
                            <h2 className="stat-chart-title-dark mb-3">Top sách nhiều bình luận</h2>
                            {topCommented.length === 0 ? (
                                <p className="stat-empty">Chưa có bình luận nào.</p>
                            ) : (
                                <ul className="stat-rank-list">
                                    {topCommented.map((item, index) => (
                                        <li key={item.book.id} className="stat-rank-item">
                                            <span className="stat-rank-index">{String(index + 1).padStart(2, "0")}</span>
                                            <div className="stat-rank-info">
                                                <span className="stat-rank-title">{item.book.title}</span>
                                                <span className="stat-rank-author">{item.book.author}</span>
                                            </div>
                                            <span className="stat-rank-count">{item.count} bình luận</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}