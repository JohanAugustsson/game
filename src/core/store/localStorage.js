export const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        let state = JSON.parse(serializedState);
        let date = new Date(state.timestamp).getDate();
        let notBeforeDate = new Date().getDate() - 1;
        if (date >= notBeforeDate) {
            delete state.timestamp;
            return state;
        } else {
            return undefined
        }
    } catch (err) {
        return undefined;
    }
};

export const saveStateToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
        console.log("could not save state to localstorage")
    }
};

export const clearStateFromLocalStorage = () => {
    try {
        localStorage.removeItem('state');
    } catch {
        // ignore write errors
        console.log("could not remove state from localstorage")
    }
};