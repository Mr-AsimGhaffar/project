export function formatTimeFromNow(epochTimeInSeconds) {
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  const elapsedTimeInSeconds = currentTimeInSeconds - epochTimeInSeconds;
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;

  if (elapsedTimeInSeconds < minute) {
    return "Just now";
  } else if (elapsedTimeInSeconds < hour) {
    const minutes = Math.floor(elapsedTimeInSeconds / minute);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (elapsedTimeInSeconds < day) {
    const hours = Math.floor(elapsedTimeInSeconds / hour);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (elapsedTimeInSeconds < month) {
    const days = Math.floor(elapsedTimeInSeconds / day);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (elapsedTimeInSeconds < year) {
    const months = Math.floor(elapsedTimeInSeconds / month);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    const years = Math.floor(elapsedTimeInSeconds / year);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }
}
