const BASE_URL = 'https://norma.nomoreparties.space/api';

// Проверка ответа
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

// Функция для отправки запросов на сервер
export function requestFromApi(endpoint, options = {}) {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
}

// Функция для выполнения запроса с авторизацией
const fetchWithAuth = async (endpoint, options = {}) => {
  const accessToken = localStorage.getItem('accessToken');
  
  if (!accessToken) {
    throw new Error('Access token is missing');
  }

  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${accessToken}`,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Если ответ с ошибкой 401, обновляем токен и повторяем запрос
    await refreshAccessToken();
    return fetchWithAuth(endpoint, options);  // Повторно вызываем запрос с новым токеном
  }

  return response;
};

// Функция для обновления токенов
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (!refreshToken) {
    throw new Error('Refresh token is missing');
  }

  try {
    const response = await fetch('https://norma.nomoreparties.space/api/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: refreshToken }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';  // Перенаправление на страницу логина, если обновление не удалось
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    window.location.href = '/login';  // Перенаправление на страницу логина, если произошла ошибка
  }
};

export { fetchWithAuth };
