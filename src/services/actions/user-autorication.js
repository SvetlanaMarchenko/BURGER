// import { api } from "../utils/api";

// export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
// export const SET_USER = "SET_USER";

// export const setAuthChecked = (value) => ({
//     type: SET_AUTH_CHECKED,
//     payload: value,
// });

// export const setUser = (user) => ({
//     type: SET_USER,
//     payload: user,
// });

// export const login = () => {
//     return (dispatch) => {
//         return api.login().then((res) => {
//             dispatch(setUser(res.user));
//             dispatch(setAuthChecked(true));
//         });
//     };
// };

// export const checkUserAuth = () => {
//     return (dispatch) => {
//         if (localStorage.getItem("accessToken")) {
//             api.getUser()
//                 .then(res => dispatch(res.user))
//                 .finally(() => dispatch(setAuthChecked(true)));
//         } else {
//             dispatch(setAuthChecked(true));
//         }
//     };
// };


// export const logout = () => {
//     return (dispatch) => {
//         return api.logout().then(() => {
//             dispatch(setUser(null));
//         });
//     };
// };
