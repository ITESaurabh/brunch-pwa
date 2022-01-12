/* eslint-disable eqeqeq */
import { SESSION_TIME } from "../config/constants";
import Cookies from "js-cookie";

export function setAuth(auth, isRemeber) {
  Cookies.set("demo_token", auth.token, {
    expires: isRemeber ? SESSION_TIME : null,
  });

  let userObject = {};
  userObject.token = auth.token;

  return userObject;
}

export function resetApp() {
  Cookies.remove("demo_token");

  let userObject = {};

  return userObject;
}

export function setTheme(isLightTheme) {
  Cookies.set("theme_preference", isLightTheme, { expires: 365 });
  return isLightTheme === "true";
}

export function getTheme() {
  const isLightTheme = Cookies.get("theme_preference");

  if (isLightTheme === "true") {
    return true;
  }
  if (isLightTheme === "false") {
    return false;
  }
  return isLightTheme;
}