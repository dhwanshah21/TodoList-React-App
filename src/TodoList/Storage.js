// To create Tasks in localstorage
export const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}
// To fetch the tasks stored in localstorage
export const getItem = (key) => {
    const value = JSON.parse(localStorage.getItem(key));
    return value;
}