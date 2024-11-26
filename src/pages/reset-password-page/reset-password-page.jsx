import styles from './reset-password-page.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../../components/app-header/app-header';

export function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Проверяем, что оба поля заполнены
    if (!password || !token) return;

    setIsSubmitting(true);

    try {
      // Отправляем POST запрос на сервер для сброса пароля
      const response = await fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, token }), // Отправляем пароль и токен
      });

      const data = await response.json();

      if (data.success) {
        // Если пароль успешно сброшен, перенаправляем на страницу входа
        navigate('/login');
      } else {
        // Обработка ошибки, если запрос не успешен
        alert(data.message || 'Что-то пошло не так!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Что-то пошло не так!');
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
            <h1 className={`text text_type_main-medium mb-2`}>Восстановление пароля</h1>

            {/* Поле для ввода нового пароля */}
            <PasswordInput
              onChange={handlePasswordChange}
              value={password}
              placeholder={'Введите новый пароль'}
              extraClass="mb-2"
            />

            {/* Поле для ввода кода из письма (токена) */}
            <Input
              type={'text'}
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

            <div className={`${styles.newPerson}`}>
              <p className="text text_type_main-default text_color_inactive mb-4"> Вспомнили пароль? </p>
              <Link to="/login">Войти</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
