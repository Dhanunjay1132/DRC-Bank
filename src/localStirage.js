// Save data
export const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Load data
export const loadFromLocalStorage = (key) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : null;
};

// Clear data (optional)
export const clearLocalStorage = (key) => {
  localStorage.removeItem(key);
};
