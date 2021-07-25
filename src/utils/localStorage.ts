export const setItem = (key: string, data: any) => {
  localStorage.setItem(key, data);
};
export const getItem = (key: string) => {
  return localStorage.getItem(key);
};
export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};

export const clear = () => {
  localStorage.clear();
};
