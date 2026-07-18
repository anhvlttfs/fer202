import { Col, Form, InputGroup, Row } from "react-bootstrap";
import "./index.css";

export const BookFilters = ({ searchTerm, setSearchTerm, genreFilter, setGenreFilter, genres }) => {
    return (
        <div className="book-controls">
            <Row className="g-3 align-items-center">
                <Col lg={7} md={12}>
                    <InputGroup className="book-search-group">
                        <InputGroup.Text className="book-search-icon">⌕</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Search books by title"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            className="book-search-input"
                        />
                    </InputGroup>
                </Col>

                <Col lg={5} md={12}>
                    <Form.Select
                        value={genreFilter}
                        onChange={(event) => setGenreFilter(event.target.value)}
                        className="book-filter-select"
                    >
                        <option value="all">All genres</option>
                        <option value="favorites">Favorites only</option>
                        {genres
                            .filter((genre) => genre !== "all")
                            .map((genre) => (
                                <option key={genre} value={genre}>
                                    {genre}
                                </option>
                            ))}
                    </Form.Select>
                </Col>
            </Row>
        </div>
    );
};
