import OrderSummary from "./OrderSummary.jsx";

function formatProbability(value) {
  return `${(value * 100).toFixed(2)}%`;
}

function PredictionResult({ result, order }) {
  const isReturn = result.prediction === 1;
  const returnProbability = Number(result.return_probability);
  const noReturnProbability = Number(result.no_return_probability);

  return (
    <div
      className={`prediction-result ${isReturn ? "is-return" : "is-no-return"}`}
    >
      <div className="result-status-row">
        <span className="status-marker" aria-hidden="true">
          {isReturn ? "!" : "\u2713"}
        </span>
        <span className="status-caption">MODEL ASSESSMENT</span>
        <span className="status-line" />
      </div>
      <p className="prediction-label">{result.label}</p>
      <p className="prediction-summary">
        {isReturn
          ? "This order is more likely to be returned."
          : "This order is more likely to be kept."}
      </p>

      <div className="probability-block">
        <div className="probability-heading">
          <span>Return probability</span>
          <strong>{formatProbability(returnProbability)}</strong>
        </div>
        <div
          className="probability-track return-track"
          role="meter"
          aria-label="Return probability"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={Math.round(returnProbability * 100)}
        >
          <span
            style={{
              width: `${Math.min(Math.max(returnProbability * 100, 0), 100)}%`,
            }}
          />
        </div>
      </div>

      <div className="probability-block no-return-block">
        <div className="probability-heading">
          <span>No-return probability</span>
          <strong>{formatProbability(noReturnProbability)}</strong>
        </div>
        <div
          className="probability-track no-return-track"
          role="meter"
          aria-label="No-return probability"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={Math.round(noReturnProbability * 100)}
        >
          <span
            style={{
              width: `${Math.min(Math.max(noReturnProbability * 100, 0), 100)}%`,
            }}
          />
        </div>
      </div>

      <div className="result-detail-row">
        <span>Prediction code</span>
        <strong>{result.prediction}</strong>
      </div>
      <p className="result-model-note">
        Probabilities returned by the live prediction API.
      </p>
      {order && <OrderSummary order={order} />}
    </div>
  );
}

export default PredictionResult;
