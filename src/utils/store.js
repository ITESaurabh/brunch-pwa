import React, { createContext, useReducer } from 'react';
import { setTheme } from './CookieUtil';

const initialState = {
    isLightTheme: true,
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'SET_THEME': {
                setTheme(action.payload)
                return {
                    ...state,
                    isLightTheme: action.payload,
                };
            }

            default:
                return state;
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }