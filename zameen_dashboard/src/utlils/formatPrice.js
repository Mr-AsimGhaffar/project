export function formatPrice(price) {
  if (price >= 1e7) {
    return (price / 1e7).toFixed(2) + " Cr"; // Crores
  } else if (price >= 1e5) {
    return (price / 1e5).toFixed(2) + " Lac"; // Lacs
  } else if (price >= 1e3) {
    return (price / 1e3).toFixed(2) + " K"; // Thousands
  } else {
    return price.toString(); // Less than 1000
  }
}
