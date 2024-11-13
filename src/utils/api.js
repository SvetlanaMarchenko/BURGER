export const BASE_URL = 'https://norma.nomoreparties.space/api';

export function checkResponse(res) {
   if (res.ok) {
       return res.json();
   }
   return Promise.reject(`Ошибка ${res.status}`);
}

// export function request(endpoint, options = {}) {
//   return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse); 
// }



