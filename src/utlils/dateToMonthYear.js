export function formatDateToMonthYear(dateString) {
  const date = new Date(dateString);
  const options = { month: "short", year: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
