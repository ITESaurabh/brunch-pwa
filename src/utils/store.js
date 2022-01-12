import React, { createContext, useReducer } from 'react';

const initialState = {
    serviceWorkerInitialized: false,
    serviceWorkerUpdated: false,
    serviceWorkerRegistration: null,
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'SW_INIT':
                return {
                    ...state,
                    serviceWorkerInitialized: !state.serviceWorkerInitialized,
                };
            case 'SW_UPDATE':
                return {
                    ...state,
                    serviceWorkerUpdated: !state.serviceWorkerUpdated,
                    serviceWorkerRegistration: action.payload,
                };
            default:
                return state;
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }