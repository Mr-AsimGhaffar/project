export function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error saving to local storage", e);
  }
}
export function getFromLocalStorage(key) {
  // Retrieve the item from local storage
  const item = localStorage.getItem(key);

  // If the item exists, parse it as JSON and return
  if (item) {
    try {
      return JSON.parse(item);
    } catch (error) {
      console.error(
        `Error parsing JSON from localStorage for key "${key}":`,
        error
      );
      return null; // Return null in case of error
    }
  }

  // Return null if the item does not exist
  return null;
}
