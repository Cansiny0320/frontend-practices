export const addLocalStorage = (item, value) => {
    const data = JSON.parse(localStorage.getItem(item));
    if (data !== null) {
        if (data.some(ele => ele.keywords === value.keywords)) {
            return;
        }
        data.unshift(value);
        localStorage.setItem(item, JSON.stringify(data));
    } else {
        localStorage.setItem(item, JSON.stringify([value]));
    }
};
