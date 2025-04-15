/**
 * Checks if localStorage is available in the current environment.
 * This is useful when using server-side rendering (SSR) where window may be undefined.
 *
 * @returns {boolean} True if localStorage is available, false otherwise.
 */
const isLocalStorageAvailable = () => {
  try {
    // Check if window is defined, e.g., during SSR, window won't be available.
    if (typeof window === 'undefined') {
      return false;
    }
    // Test localStorage functionality.
    const testKey = '__ls_test__';
    window.localStorage.setItem(testKey, 'test');
    window.localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    console.error('LocalStorage is not available:', error);
    return false;
  }
};

/**
 * Sets a value in localStorage.
 * Automatically converts non-string values to JSON strings.
 *
 * @param {string} key The key under which the value will be stored.
 * @param {*} value The value to store. Non-string values are stringified.
 */
export const setLocalStorageItem = (key, value) => {
  if (!isLocalStorageAvailable()) return;

  try {
    // If the value is not a string, convert it to a JSON string.
    const data = typeof value === 'string' ? value : JSON.stringify(value);
    window.localStorage.setItem(key, data);
  } catch (error) {
    console.error(`Error setting localStorage item with key "${key}":`, error);
  }
};

/**
 * Retrieves a value from localStorage.
 * Attempts to parse the value from JSON before returning it.
 *
 * @param {string} key The key whose value is to be retrieved.
 * @returns {*} The parsed value, or null if not found.
 */
export const getLocalStorageItem = (key) => {
  if (!isLocalStorageAvailable()) return null;

  try {
    const data = window.localStorage.getItem(key);
    // If there's data, try parsing it. If parsing fails, return the raw string.
    return data ? JSON.parse(data) : null;
  } catch (error) {
    // Return the raw value if JSON parsing fails.
    console.warn(`Error parsing localStorage item with key "${key}":`, error);
    return window.localStorage.getItem(key);
  }
};

/**
 * Removes a specific item from localStorage.
 *
 * @param {string} key The key of the item to remove.
 */
export const removeLocalStorageItem = (key) => {
  if (!isLocalStorageAvailable()) return;

  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage item with key "${key}":`, error);
  }
};

/**
 * Clears all data from localStorage.
 * Use with caution as this will remove every key/value pair.
 */
export const clearLocalStorage = () => {
  if (!isLocalStorageAvailable()) return;

  try {
    window.localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

// Exporting as an object for a convenient default import.
const localStorageHelper = {
  set: setLocalStorageItem,
  get: getLocalStorageItem,
  remove: removeLocalStorageItem,
  clear: clearLocalStorage,
};

export default localStorageHelper;
