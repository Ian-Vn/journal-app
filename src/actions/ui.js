import { types } from "../types/types";


export const setError = (mensaje) => ({ type: types.uiSetError, payload: mensaje  });
export const removeError = () => ({ type: types.uiRemoveError  });
// Accion para el startLoading
export const startLoading = () => ( { type: types.uiStartLoading });

// Accion para el finishLoading
export const finishLoading = () => ( { type: types.uiFinishLoading });