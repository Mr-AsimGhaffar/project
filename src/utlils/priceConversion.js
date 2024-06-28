export function priceConversion(value) {
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(2).replace(/\.00$/, "") + "B";
  } else if (value >= 1000000) {
    return (value / 1000000).toFixed(2).replace(/\.00$/, "") + "M";
  } else if (value >= 1000) {
    return (value / 1000).toFixed(2).replace(/\.00$/, "") + "K";
  } else {
    return value.toString();
  }
}
