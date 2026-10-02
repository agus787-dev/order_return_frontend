import { useState } from "react";
import {
  brandDisplayNames,
  categoricalOptions,
} from "../constants/categoricalOptions.js";

const initialValues = {
  item_price: "",
  item_size: "",
  item_color: "",
  brand_id: "",
  user_title: "",
  user_state: "",
  order_date: "",
  user_reg_date: "",
  user_dob: "",
  delivery_date: "",
};

function OrderForm({ onSubmit, isLoading }) {
  const [values, setValues] = useState(initialValues);
  const [validationError, setValidationError] = useState("");

  function updateValue(event) {
    const { name, value } = event.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
    setValidationError("");
  }

  function submitForm(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    if (values.user_reg_date > values.order_date) {
      setValidationError(
        "Registration date must be on or before the order date.",
      );
      return;
    }
    if (values.user_dob && values.user_dob > values.order_date) {
      setValidationError("Date of birth must be on or before the order date.");
      return;
    }
    if (values.delivery_date && values.delivery_date < values.order_date) {
      setValidationError("Delivery date must be on or after the order date.");
      return;
    }

    onSubmit({
      item_price: Number(values.item_price),
      item_size: values.item_size,
      item_color: values.item_color,
      brand_id: Number(values.brand_id),
      user_title: values.user_title,
      user_state: values.user_state,
      order_date: values.order_date,
      user_reg_date: values.user_reg_date,
      user_dob: values.user_dob || null,
      delivery_date: values.delivery_date || null,
    });
  }

  return (
    <form className="order-form" onSubmit={submitForm}>
      <fieldset className="form-group">
        <legend>
          <span className="group-number">01</span> ITEM DETAILS
        </legend>
        <div className="field-grid">
          <label className="field">
            <span>
              Item price <span className="required-star">*</span>
            </span>
            <span className="input-with-prefix">
              <span className="input-prefix" aria-hidden="true">
                $
              </span>
              <input
                name="item_price"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0.00"
                value={values.item_price}
                onChange={updateValue}
                required
                aria-label="Item price in dollars"
              />
            </span>
          </label>
          <label className="field">
            <span>
              Brand ID <span className="required-star">*</span>
              <span className="optional-label">SYNTHETIC NAMES</span>
            </span>
            <select
              name="brand_id"
              value={values.brand_id}
              onChange={updateValue}
              required
            >
              <option value="">Select a brand</option>
              {categoricalOptions.brand_id.map((brandId) => (
                <option key={brandId} value={brandId}>
                  {brandDisplayNames[brandId]} · ID {brandId}
                </option>
              ))}
            </select>
            <span className="field-note">
              Display aliases only; the model receives the numeric ID.
            </span>
          </label>
          <label className="field">
            <span>
              Item size <span className="required-star">*</span>
            </span>
            <select
              name="item_size"
              value={values.item_size}
              onChange={updateValue}
              required
            >
              <option value="">Select a size</option>
              {categoricalOptions.item_size.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>
              Item color <span className="required-star">*</span>
            </span>
            <select
              name="item_color"
              value={values.item_color}
              onChange={updateValue}
              required
            >
              <option value="">Select a color</option>
              {categoricalOptions.item_color.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </label>
        </div>
      </fieldset>

      <fieldset className="form-group">
        <legend>
          <span className="group-number">02</span> CUSTOMER
        </legend>
        <div className="field-grid">
          <label className="field">
            <span>
              Title <span className="required-star">*</span>
            </span>
            <select
              name="user_title"
              value={values.user_title}
              onChange={updateValue}
              required
            >
              <option value="">Select a title</option>
              {categoricalOptions.user_title.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>
              State <span className="required-star">*</span>
            </span>
            <select
              name="user_state"
              value={values.user_state}
              onChange={updateValue}
              required
            >
              <option value="">Select a state</option>
              {categoricalOptions.user_state.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>
        </div>
      </fieldset>

      <fieldset className="form-group form-group-last">
        <legend>
          <span className="group-number">03</span> TIMELINE
        </legend>
        <div className="field-grid">
          <label className="field">
            <span>
              Order date <span className="required-star">*</span>
            </span>
            <input
              name="order_date"
              type="date"
              value={values.order_date}
              onChange={updateValue}
              required
            />
          </label>
          <label className="field">
            <span>
              Customer since <span className="required-star">*</span>
            </span>
            <input
              name="user_reg_date"
              type="date"
              value={values.user_reg_date}
              onChange={updateValue}
              required
            />
          </label>
          <label className="field">
            <span>
              Date of birth <span className="optional-label">OPTIONAL</span>
            </span>
            <input
              name="user_dob"
              type="date"
              value={values.user_dob}
              onChange={updateValue}
            />
          </label>
          <label className="field">
            <span>
              Delivery date <span className="optional-label">OPTIONAL</span>
            </span>
            <input
              name="delivery_date"
              type="date"
              value={values.delivery_date}
              onChange={updateValue}
            />
          </label>
        </div>
      </fieldset>

      {validationError && (
        <p className="validation-message" role="alert">
          {validationError}
        </p>
      )}
      <button className="predict-button" type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <span className="button-spinner" aria-hidden="true" />
            Analyzing order...
          </>
        ) : (
          <>
            Predict return likelihood{" "}
            <span className="button-arrow" aria-hidden="true">
              &#8594;
            </span>
          </>
        )}
      </button>
      <p className="form-disclaimer">
        Order details are sent securely to the prediction service.
      </p>
    </form>
  );
}

export default OrderForm;
