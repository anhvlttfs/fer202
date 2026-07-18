import "./index.css";

function ReadingProgress() {
  return (
    <div className="reading-progress">
      <div className="progress-info">Reading Progress</div>

      <div className="progress-bar">
        <div className="progress-fill"></div>
      </div>

      <p>10%</p>
    </div>
  );
}

export default ReadingProgress;
