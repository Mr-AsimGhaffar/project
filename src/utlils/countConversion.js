export function countConversion(value) {
  if (value >= 10000000) {
    return (value / 10000000).toFixed(2) + " Crore";
  } else if (value >= 100000) {
    return (value / 100000).toFixed(2) + " Lacs";
  } else if (value >= 1000) {
    return (value / 1000).toFixed(2) + " Thousand";
  } else {
    return value.toString();
  }
}
