export function squareFeetToMarla(squareFeet) {
  const conversionFactor = 225;
  const marla = Math.floor(squareFeet / conversionFactor);
  return `${marla} Marla`;
}
