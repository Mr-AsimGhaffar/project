export function squareFeetToMarla(squareFeet) {
  const conversionFactor = 272.25;
  const marla = Math.floor(squareFeet / conversionFactor);
  return `${marla} Marla`;
}
