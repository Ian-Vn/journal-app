import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';

import { authReducer } from "../reducers/authReducer";
import { uiReducer } from "../reducers/uiReducer";
import { notesReducer } from "../reducers/notesReducer";

// Constante para poder usar middlewares
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Se combina los reducer en un conjunto de reducers 
const reducers = combineReducers( {
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
})
// se le pasa como argumento un reducer
export const store = createStore( reducers, composeEnhancers( applyMiddleware( thunk )  ) );