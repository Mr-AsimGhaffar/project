export function formatIsoToMonthYear(isoDateString) {
  const date = new Date(isoDateString);
  const options = { year: "numeric", month: "long" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
