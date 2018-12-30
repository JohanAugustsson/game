export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
        console.log("could not save state to localstorage")
    }
};

export const clearState = () => {
    try {
        localStorage.removeItem('state');
    } catch {
        // ignore write errors
        console.log("could not remove state from localstorage")
    }
};

export const wait = (ms) => {
    let start = new Date().getTime();
    let end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
};