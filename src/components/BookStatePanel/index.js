export const BookStatePanel = ({ children, error = false }) => {
    return <div className={`book-state-panel ${error ? "book-state-error" : ""}`}>{children}</div>;
};
