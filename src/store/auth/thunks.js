import {
  loginUserWithEmailAndPassword,
  logoutFirebase,
  registerUserWithEmailAndPassword,
  singInWithGoogle,
} from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startLoginWithEmailAndPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const { ok, errorMessage, displayName, uid, photoURL } =
      await loginUserWithEmailAndPassword({
        email,
        password,
      });

    if (!ok) return dispatch(logout({ errorMessage }));
    dispatch(login({ displayName, uid, photoURL, email }));
  };
};
export const startGoogleSingIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await singInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));
    dispatch(login(result));
  };
};

export const startCreatingUserWithEmailAndPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const { uid, ok, photoURL, errorMessage } =
      await registerUserWithEmailAndPassword({
        email,
        password,
        displayName,
      });
    if (!ok) return dispatch(logout({ errorMessage }));
    dispatch(login({ uid, photoURL, displayName, email }));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(clearNotesLogout());
    dispatch(logout());
  };
};
