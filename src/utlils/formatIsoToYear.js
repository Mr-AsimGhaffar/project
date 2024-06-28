export function formatIsoToYear(isoDateString) {
  const date = new Date(isoDateString);
  const options = { year: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
