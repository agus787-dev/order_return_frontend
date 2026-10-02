function ErrorMessage({ message }) {
  return (
    <div className="error-message" role="alert">
      <span className="error-icon" aria-hidden="true">
        !
      </span>
      <div>
        <p className="error-title">Prediction unavailable</p>
        <p className="error-copy">{message}</p>
        <p className="error-hint">Check your connection and try again.</p>
      </div>
    </div>
  );
}

export default ErrorMessage;
