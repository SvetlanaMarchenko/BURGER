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

// Функция для авторизации и сохранения токенов
export const loginUser = async (email, password) => {
  try {
    const data = await requestFromApi('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (data.success) {
      // Сохраняем токены в localStorage
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      return data;
    } else {
      throw new Error(data.message || 'Что-то пошло не так при входе');
    }
  } catch (error) {
    console.error('Ошибка при авторизации:', error);
    throw new Error('Что-то пошло не так! Попробуйте позже.');
  }
};

// Функция для регистрации пользователя и сохранения токенов
const registerUser = async (email, password, name) => {
  try {
    const data = await requestFromApi('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });

    if (data.success) {
      // Сохраняем токены в localStorage
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      return data;
    } else {
      throw new Error(data.message || 'Ошибка регистрации');
    }
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    throw new Error('Что-то пошло не так! Попробуйте позже.');
  }
};

// Функция для получения данных пользователя
const fetchUserData = async () => {
  const accessToken = localStorage.getItem('accessToken');
  
  if (!accessToken) {
    throw new Error('Access token is missing');
  }

  try {
    const data = await requestFromApi('/auth/user', {
      method: 'GET',
      headers: {
        'Authorization': `${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error);
    throw new Error('Не удалось загрузить данные пользователя. Попробуйте позже.');
  }
};

const fetchWithAuth = async (endpoint, options = {}) => {
  const accessToken = localStorage.getItem('accessToken');
  
  if (!accessToken) {
    throw new Error('Access token is missing');
  }

  const headers = {
    ...options.headers,
    'Authorization': `${accessToken}`,
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

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (!refreshToken) {
    throw new Error('Refresh token is missing');
  }

  try {
    const response = await fetch(`${BASE_URL}/auth/token`, {
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
      window.location.href = '/login';  
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    window.location.href = '/login';  
  }
};

const updateUserData = async (updatedUserData) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    throw new Error('Access token is missing');
  }

  try {
    const response = await fetchWithAuth('/auth/user', {
      method: 'PATCH', // Используем PATCH, чтобы обновить только нужные поля
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUserData), // Данные для обновления
    });

    const result = await response.json(); // Парсим ответ от сервера

    if (result.success) {
      // Если запрос прошел успешно, возвращаем обновленные данные
      return result;
    } else {
      throw new Error(result.message || 'Не удалось обновить данные');
    }
  } catch (error) {
    console.error('Ошибка при обновлении данных пользователя:', error);
    throw new Error('Что-то пошло не так. Попробуйте позже.');
  }
};

export const resetPassword = async (email) => {
  try {
    const data = await requestFromApi('/password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    return data; // Возвращаем результат, чтобы компонент мог обработать успех или ошибку
  } catch (error) {
    console.error("Ошибка при сбросе пароля:", error);
    throw new Error('Что-то пошло не так! Попробуйте позже.');
  }
};

// Функция для выхода из системы
const logoutUser = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (!refreshToken) {
    console.log('Нет токена для выхода');
    return;
  }

  try {
    const response = await fetchWithAuth('/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: refreshToken }),
    });

    const data = await response.json();

    if (data.success) {
      // Удаляем токены и данные пользователя из localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userData');
      window.location.href = '/login';  // Перенаправление на страницу логина
    } else {
      console.error('Ошибка при выходе из системы');
    }
  } catch (error) {
    console.error('Ошибка при запросе выхода:', error);
    throw new Error('Что-то пошло не так. Попробуйте позже.');
  }
};


export const resetPasswordRequest = async (password, token) => {
  try {
    const response = await requestFromApi('/password-reset/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, token }),
    });

    return response;  // Возвращаем результат, чтобы обработать его в компоненте
  } catch (error) {
    console.error('Ошибка при сбросе пароля:', error);
    throw new Error('Что-то пошло не так! Попробуйте позже.');
  }
};

export { fetchWithAuth, fetchUserData, registerUser, logoutUser, updateUserData };
