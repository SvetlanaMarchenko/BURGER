const BASE_URL = 'https://norma.nomoreparties.space/api';

function checkResponse(res) {
   if (res.ok) {
       return res.json();
   }
   return Promise.reject(`Ошибка ${res.status}`);
}

export function requestFromApi(endpoint, options = {}) {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse); 
}


// // В проектной работе эта функция будет обращаться к серверу
// // и обновлять токены если они уже устарели.
// const getUser = async () => {
//     const result = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve({
//                 user: {},
//             });
//         }, 1000);
//     });

//     try {
//         return await result;
//     } catch (error) {
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         throw error;
//     }
// }

// const login = () =>
//     new Promise((resolve, reject) => {
//         setTimeout(() => {
//             localStorage.setItem("accessToken", "test-token");
//             localStorage.setItem("refreshToken", "test-refresh-token");
//             resolve({
//                 user: {},
//             });
//         }, 1000);
//     });

// const logout = () =>
//     new Promise((resolve, reject) => {
//         setTimeout(() => {
//             localStorage.removeItem("accessToken");
//             localStorage.removeItem("refreshToken");
//             resolve();
//         }, 1000);
//     });

// export const api = {
//     getUser,
//     login,
//     logout
// };
