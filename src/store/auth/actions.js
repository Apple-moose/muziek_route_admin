import axios from "axios";
import {
  startLoading,
  getToken,
  userLoggedIn,
  getUserId,
  getUserData,
} from "./slice";

//Local URL------>
const API_URL = `http://localhost:5432`;

//Web URL------>
// const API_URL = `https://webshop-api-sr7l.onrender.com`;

export function Signup(signUsername, signPassword, is_Admin, navigate) {
  return async function thunk(dispatch, getState) {
    dispatch(startLoading());
    await axios
      .post(API_URL + "/auth/admin", {
        username: signUsername,
        password: signPassword,
        is_Admin: is_Admin,
      })
      .catch((err) => console.log("New User Login Error", err));

    await axios
      .post(API_URL + "/auth/login", {
        username: signUsername,
        password: signPassword,
      })
      .then((data) => {
        const token = data.data.access_token;
        // console.log("data.data is: ", data.data);
        // console.log("token from login?:", data.data.access_token);
        dispatch(getToken(token));
        // dispatch(newUserLogOut());
      })
      .catch((err) => console.log("Login Error", err));

    const tokenReceived = getState().signup.accessToken;
    localStorage.setItem("tokenReceived", tokenReceived);
    // console.log("from auth actions:", tokenReceived);
    axios
      .get(API_URL + "/auth/login", {
        headers: { Authorization: `Bearer ${tokenReceived} ` },
      })
      .then((data) => {
        const userName = data.data.firstname;
        dispatch(startLoading());
        dispatch(userLoggedIn(userName));
        // console.log("localstorage:",localStorage)
        navigate("/");
      })
      .catch((err) => console.log("err", err));
  };
}

export function Login(username, password, navigate) {
  return async function thunk(dispatch, getState) {
    //best idea would be (correct syntax await fault)
    /* <script src="https://gist.github.com/wearethefoos/9623c25126cab91fe51f6bbda874a16a.js"></script> */

    //SEE BELLOW OR PROMISES.JS!!

    dispatch(startLoading());
    await axios
      .post(API_URL + "/auth/login", {
        username: username,
        password: password,
      })
      .then((data) => {
        const token = data.data.access_token;
        dispatch(getToken(token));
      })
      .catch((err) => console.log("Login Error", err));

    const tokenReceived = getState().auth.accessToken;
    localStorage.setItem("tokenReceived", tokenReceived);
    // console.log("from auth actions:", tokenReceived);
    axios
      .get(API_URL + "/auth/login", {
        headers: { Authorization: `Bearer ${tokenReceived} ` },
      })
      .then((data) => {
        const userName = data.data.firstname;
        dispatch(startLoading());
        dispatch(userLoggedIn(userName));
        dispatch(getUserId(data.data.id));
        //???for some reason call useNavigate on the loginPage???
        navigate("/");
      })
      .catch((err) => console.log("err", err));
  };
}

export const bootstrapLogInState = () => async (dispatch) => {
  const tokenFromStorage = localStorage.getItem("tokenReceived");

  if (!tokenFromStorage) return;

  await axios
    .get(API_URL + "/auth/login", {
      headers: { Authorization: `Bearer ${tokenFromStorage} ` },
    })
    .then((data) => {
      // const userName = data.data.firstname;
      dispatch(userLoggedIn(data.data.username));
      dispatch(getUserId(data.data.id));
    })
    .catch((err) => console.log("err", err));
};

export const getMyUserData = () => async (dispatch, getState) => {
  const tokenFromStorage = localStorage.getItem("tokenReceived");
  axios
    .get(API_URL + "/auth/me", {
      headers: { Authorization: `Bearer ${tokenFromStorage} ` },
    })
    .then((data) => {
      dispatch(startLoading());
      dispatch(getUserData(data.data));
    })
    .catch((err) => console.log("err", err));
};
