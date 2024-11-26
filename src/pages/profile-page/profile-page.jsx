import React, { useState } from 'react';
import styles from './profile-page.module.css';
import AppHeader from '../../components/app-header/app-header';
import { Link, useNavigate } from 'react-router-dom';
import { PasswordInput, Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

export function ProfilePage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    if (!email || !password || !name) {
      setError('Заполните все поля!');
      return;
    }

    try {
      const response = await fetch('https://norma.nomoreparties.space/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const result = await response.json();

      if (result.success) {
        navigate('/home');
      } else {
        setError(result.message || 'Упс. Что-то не так...');
      }
    } catch (error) {
      setError('Упс..... Ошибка сети. Попробуйте снова позже.');
    }
  };

  // Функция для выхода из системы
  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      console.log('Нет токена для выхода');
      return;
    }

    try {
      const response = await fetch('https://norma.nomoreparties.space/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: refreshToken }),
      });

      const data = await response.json();

      if (data.success) {
        // Если выход успешен, удаляем токены из localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        
        // Редиректим пользователя на страницу входа
        navigate('/login');
      } else {
        alert('Ошибка при выходе из системы');
      }
    } catch (error) {
      console.error('Ошибка при запросе выхода:', error);
      alert('Что-то пошло не так. Попробуйте позже.');
    }
  };

  return (
    <div className={styles.loginLayoutProfile}>
      <AppHeader />
      <div>
        <div className={styles.container}>
          <div className={styles.profileForm}>
            <nav className={`${styles.profileChoice}`}>
              <h1 className={`${styles.chioceOption} text text_type_main-medium`}>Профиль</h1>
              <h1 className={`${styles.chioceOption} text text_type_main-medium`}>История заказов</h1> 
              <h1 
                className={`${styles.chioceOption} text text_type_main-medium mb-20`} 
                onClick={handleLogout} // Добавляем обработчик на клик для выхода
              >
                Выход
              </h1>
              <p className={`${styles.chioceOption} text text_type_main-small text_color_inactive`}>
                В этом разделе вы можете изменить свои персональные данные
              </p>
            </nav>
        
            <form className={styles.form} onSubmit={handleSubmit}>
              <PasswordInput
                onChange={handleEmailChange}
                value={name}
                name="name"
                placeholder="Name"
                extraClass="mb-2"
                icon="EditIcon"
              />

              <EmailInput
                onChange={handleNameChange}
                value={email}
                name={'email'}
                placeholder="Email"
                isIcon={true}
                extraClass="mb-2"
              />
              
              <PasswordInput
                onChange={handlePasswordChange}
                value={password}
                name="password"
                extraClass="mb-6"
                icon="EditIcon"
              />

              {error && <p className="text text_type_main-default text_color_inactive">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
