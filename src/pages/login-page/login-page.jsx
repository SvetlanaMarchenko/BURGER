import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { loginUser } from '../../utils/api';  // Импортируем функцию для авторизации
import PropTypes from 'prop-types'; // Импортируем PropTypes
import styles from './login-page.module.css';
import AppHeader from '../../components/app-header/app-header';

export function LoginPage({ initialEmail }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(initialEmail || ''); // Инициализируем email с переданным значением, если оно есть
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    setIsSubmitting(true);

    try {
      // Используем функцию loginUser из API для аутентификации и получения токенов
      await loginUser(email, password);
      
      // Если авторизация прошла успешно, перенаправляем на главную страницу
      navigate('/');
    } catch (error) {
      setError(error.message);  // Отображаем ошибку
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
            <h1 className={`text text_type_main-medium mb-6`}>Вход</h1>
            <EmailInput
              onChange={handleEmailChange}
              value={email}
              name={'email'}
              isIcon={false}
              extraClass="mb-6"
            />
            <PasswordInput
              onChange={handlePasswordChange}
              value={password}
              name="password"
              extraClass="mb-6"
            />
            {error && <p className="text text_type_main-default text_color_inactive">{error}</p>}
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass="mb-20"
              disabled={isSubmitting}
            >
              Войти
            </Button>

            <div className={`${styles.newPerson}`}>
              <p className="text text_type_main-default text_color_inactive mb-4"> Вы новый пользователь? </p>
              <Link to="/register">
                Зарегистрироваться
              </Link>
            </div>

            <div className={`${styles.newPerson}`}>
              <p className="text text_type_main-default text_color_inactive "> Забыли пароль? </p>
              <Link to="/forgot-password">
                Восстановить пароль
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Проверка пропсов для LoginPage
LoginPage.propTypes = {
  initialEmail: PropTypes.string,  // Пропс initialEmail должен быть строкой
};

export default LoginPage;
