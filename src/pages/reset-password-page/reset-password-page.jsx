import styles from './reset-password-page.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../../components/app-header/app-header';
import { requestFromApi } from '../../utils/api.js'; // Использование вашей API утилиты

export function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(''); // Для отображения ошибок

  const location = useLocation();
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка на пустые поля
    if (!password || !token) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    setIsSubmitting(true);
    setError(''); // Сброс ошибки перед отправкой запроса

    try {
      // Запрос на сброс пароля через API
      const response = await requestFromApi('/password-reset/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, token }),
      });

      if (response.success) {
        // Если пароль сброшен успешно, редиректим на страницу логина
        navigate('/login');
      } else {
        // Если не удалось сбросить пароль, выводим ошибку
        setError(response.message || 'Что-то пошло не так!');
      }
    } catch (error) {
      console.error('Ошибка при сбросе пароля:', error);
      setError('Что-то пошло не так. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.loginLayout}>
      <AppHeader />
      <div>
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className="text text_type_main-medium mb-2">Восстановление пароля</h1>

            {/* Поле для ввода нового пароля */}
            <PasswordInput
              onChange={handlePasswordChange}
              value={password}
              placeholder="Введите новый пароль"
              extraClass="mb-2"
            />

            {/* Поле для ввода кода из письма (токена) */}
            <Input
              type="text"
              placeholder="Введите код из письма"
              onChange={handleTokenChange}
              value={token}
              name="token"
              extraClass="mb-2"
            />

            {/* Кнопка для отправки формы */}
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass="mb-20"
              disabled={isSubmitting}
            >
              Сохранить
            </Button>

            {/* Сообщение об ошибке */}
            {error && <p className="text text_type_main-default text_color_inactive">{error}</p>}

            <div className={styles.newPerson}>
              <p className="text text_type_main-default text_color_inactive mb-4"> Вспомнили пароль? </p>
              <Link to="/login">Войти</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
