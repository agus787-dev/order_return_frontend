function Loading() {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="loading-orbit" aria-hidden="true">
        <span />
      </span>
      <p className="loading-title">Reading order signals</p>
      <p className="loading-copy">The model is assessing this order profile.</p>
      <span className="loading-track" aria-hidden="true">
        <span />
      </span>
    </div>
  );
}

export default Loading;
