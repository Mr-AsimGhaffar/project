export function formatPrice(price) {
  if (typeof price !== "number" || isNaN(price)) {
    return "-";
  }

  return price.toLocaleString("en-US");
}
