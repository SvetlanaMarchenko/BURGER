import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate для перенаправления
import { PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login-page.module.css';
import AppHeader from '../../components/app-header/app-header';

export function LoginPage() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('bob@example.com'); // Добавил state для email
  const [isSubmitting, setIsSubmitting] = useState(false); // Состояние для предотвращения нескольких отправок
  const navigate = useNavigate(); // Для перенаправления на другую страницу

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы

    // Проверяем, что оба поля не пустые
    if (!email || !password) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    setIsSubmitting(true); // Блокируем кнопку на время отправки

    try {
      const response = await fetch('https://norma.nomoreparties.space/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json(); // Парсим ответ сервера

      if (data.success) {
        // Если вход успешен, перенаправляем на главную страницу или на страницу профиля
        navigate('/home');
      } else {
        // Обработка ошибки, если вход не удался
        alert(data.message || 'Ошибка при входе');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Что-то пошло не так! Попробуйте позже.');
    } finally {
      setIsSubmitting(false); // Разблокируем кнопку после завершения запроса
    }
  };

  return (
    <div className={styles.loginLayout}>
      <AppHeader />
      <div>
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}> {/* Используем onSubmit для формы */}
            <h1 className={`text text_type_main-medium mb-6`}>Вход</h1>
            <EmailInput
              onChange={handleEmailChange} // Используем новый обработчик
              value={email} // Привязываем состояние email
              name={'email'}
              isIcon={false}
              extraClass="mb-6"
            />
            <PasswordInput
              onChange={handlePasswordChange}
              value={password} // Привязываем состояние password
              name="password"
              extraClass="mb-6"
            />
            <Button
              htmlType="submit" // Сделаем кнопку отправки формы
              type="primary"
              size="medium"
              extraClass="mb-20"
              disabled={isSubmitting} // Блокируем кнопку при отправке
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
