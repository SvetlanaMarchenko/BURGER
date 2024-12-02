import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { loginUser } from '../../utils/api'; 
import PropTypes from 'prop-types';
import styles from './login-page.module.css';

export function LoginPage({ initialEmail }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(initialEmail || ''); 
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
      await loginUser(email, password);
      navigate('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.loginLayout}>
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
              <p className="text text_type_main-default text_color_inactive mb-4"> Вы - новый пользователь? </p>
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

LoginPage.propTypes = {
  initialEmail: PropTypes.string,
};

export default LoginPage;
