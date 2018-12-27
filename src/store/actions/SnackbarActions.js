import { SNACKBAR_MSG, SNACKBAR_CLOSE , SNACKBAR_ERROR } from '../reducers/SnackbarReducer';

const snackbarMsg = (payload) => ({
    type: SNACKBAR_MSG,
    payload
});

const snackbarError = (payload) => ({
  type: SNACKBAR_ERROR,
  payload
});

const snackbarClose = (payload) => ({
    type: SNACKBAR_CLOSE,
    payload
});

export { snackbarMsg, snackbarError, snackbarClose }; 
