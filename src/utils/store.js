import Cookies from 'js-cookie';
import React, { createContext, useReducer } from 'react';
import { setTheme } from './CookieUtil';

const initialState = {
    isLightTheme: true,
    brunch_version: '',
    latest_stable: '',
    latest_unstable: '',
    chromeos_version: '',
    latest_chromeos: ''
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
            case 'SET_MY_BRUNCH': {
                Cookies.set("brunch_version", action.payload);
                return {
                    ...state,
                    brunch_version: action.payload,
                };
            }
            case 'SET_BRUNCH_ST': {
                Cookies.set("latest_stable", action.payload);
                return {
                    ...state,
                    latest_stable: action.payload,
                };
            }
            case 'SET_BRUNCH_US': {
                Cookies.set("latest_unstable", action.payload);
                return {
                    ...state,
                    latest_unstable: action.payload,
                };
            }
            case 'SET_MY_CHROS': {
                Cookies.set("chromeos_version", action.payload);
                return {
                    ...state,
                    chromeos_version: action.payload,
                };
            }
            case 'SET_CHROS_LATEST': {
                Cookies.set("latest_chromeos", action.payload);
                return {
                    ...state,
                    latest_chromeos: action.payload,
                };
            }
            case 'SET_ALL_TO_STATE': {
                return {
                    ...state,
                    brunch_version: Cookies.get("brunch_version"),
                    latest_stable: Cookies.get("latest_stable"),
                    latest_unstable: Cookies.get("latest_unstable"),
                    chromeos_version: Cookies.get("chromeos_version"),
                    latest_chromeos: Cookies.get("latest_chromeos")
                };
            }
            default:
                return state;
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }