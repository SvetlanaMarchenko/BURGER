export const BASE_URL = 'https://norma.nomoreparties.space/api';

interface UpdatedUserData {
  name?: string;
  email?: string;
  password?: string;
}

function checkResponse(res: Response) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export function requestFromApi(endpoint: string, options: RequestInit = {}) {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
}

export const loginUser = async (email: string, password: string) => {
  try {
    const data = await requestFromApi('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (data.success) {
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


const registerUser = async (email:string, password: string, name: string) => {
  try {
    const data = await requestFromApi('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });

    if (data.success) {
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

const fetchWithAuth = async (endpoint: string, options: RequestInit = {}): Promise<Response>  => {
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
    await refreshAccessToken();
    return fetchWithAuth(endpoint, options);
  }

  return response;
};


export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (!refreshToken) {
    throw new Error('Refresh token is missing');
  }

  try {
    const data = await requestFromApi('/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: refreshToken }),
    });

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

const updateUserData = async (updatedUserData: UpdatedUserData) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    throw new Error('Access token is missing');
  }

  try {
    const result = await fetchWithAuth('/auth/user', {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUserData), 
    })
    .then(checkResponse);

    if (result.success) {

      return result;
    } else {
      throw new Error(result.message || 'Не удалось обновить данные');
    }
  } catch (error) {
    console.error('Ошибка при обновлении данных пользователя:', error);
    throw new Error('Что-то пошло не так. Попробуйте позже.');
  }
};

export const resetPassword = async (email: string) => {
  try {
    const data = await requestFromApi('/password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    return data; 
  } catch (error) {
    console.error("Ошибка при сбросе пароля:", error);
    throw new Error('Что-то пошло не так! Попробуйте позже.');
  }
};

const logoutUser = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (!refreshToken) {
    return;
  }

  try {
    const data = await fetchWithAuth('/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: refreshToken }),
    })
    .then(checkResponse)

    if (data.success) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userData');
      window.location.href = '/login'; 
    } else {
      console.error('Ошибка при выходе из системы');
    }
  } catch (error) {
    console.error('Ошибка при запросе выхода:', error);
    throw new Error('Что-то пошло не так. Попробуйте позже.');
  }
};

export const resetPasswordRequest = async (password: string , token: string) => {
  try {
    const response = await requestFromApi('/password-reset/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, token }),
    });

    return response; 
  } catch (error) {
    console.error('Ошибка при сбросе пароля:', error);
    throw new Error('Что-то пошло не так! Попробуйте позже.');
  }
};

export { fetchWithAuth, fetchUserData, registerUser, logoutUser, updateUserData };
