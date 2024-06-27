/**
 * Converts Marla into Square Feet.
 *
 * @param {number} marla - The number of Marlas to convert.
 * @returns {string} - The equivalent area in Square Feet.
 */
export function convertMarlaToSquareFeet(marla) {
  const conversionFactor = 272.25;
  const squareFeet = marla * conversionFactor;
  const roundedSquareFeet = Math.round(squareFeet);
  return roundedSquareFeet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
