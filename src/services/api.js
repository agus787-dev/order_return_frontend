const API_URL = import.meta.env.VITE_API_URL;

export async function predictOrder(data) {
  if (!API_URL) {
    throw new Error(
      "VITE_API_URL is not configured. Set it in .env or Vercel project settings.",
    );
  }

  let response;

  try {
    response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error("Could not reach the prediction service.");
  }

  const responseData = await response.json().catch(() => null);
  if (!response.ok) {
    const detail = responseData?.detail;
    const message = Array.isArray(detail)
      ? detail.map((issue) => issue.msg).join(" ")
      : typeof detail === "string"
        ? detail
        : `The prediction service returned an error (${response.status}).`;
    throw new Error(message);
  }

  if (
    !responseData ||
    typeof responseData.return_probability !== "number" ||
    typeof responseData.no_return_probability !== "number" ||
    typeof responseData.prediction !== "number" ||
    typeof responseData.label !== "string"
  ) {
    throw new Error("The prediction service returned an unexpected response.");
  }

  return responseData;
}
