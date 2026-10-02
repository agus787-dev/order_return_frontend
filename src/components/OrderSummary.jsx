import { brandDisplayNames } from "../constants/categoricalOptions.js";

function formatDate(value) {
  if (!value) return "Not provided";

  return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function OrderSummary({ order }) {
  const brandId = Number(order.brand_id);
  const details = [
    [
      "Item price",
      new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD",
      }).format(order.item_price),
    ],
    ["Item size", order.item_size],
    ["Item color", order.item_color],
    ["Brand", `${brandDisplayNames[brandId]} · ID ${brandId}`],
    ["Customer title", order.user_title],
    ["State", order.user_state],
    ["Order date", formatDate(order.order_date)],
    ["Customer since", formatDate(order.user_reg_date)],
    ["Date of birth", formatDate(order.user_dob)],
    ["Delivery date", formatDate(order.delivery_date)],
  ];

  return (
    <section className="order-summary" aria-labelledby="order-summary-title">
      <div className="order-summary-heading">
        <h3 id="order-summary-title">Submitted order</h3>
        <span>INPUT DETAILS</span>
      </div>
      <dl className="order-summary-list">
        {details.map(([label, value]) => (
          <div className="order-summary-row" key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default OrderSummary;
