export function squareFeetToMarla(squareFeet) {
  const conversionFactor = 225;
  const marla = squareFeet / conversionFactor;
  return `${marla} Marla`;
}
