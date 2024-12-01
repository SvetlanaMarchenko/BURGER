import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PasswordInput, EmailInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register-page.module.css';
import AppHeader from '../../components/app-header/app-header';
import { registerUser } from '../../utils/api.js';
import PropTypes from 'prop-types';

export function RegisterPage({ onRegister }) {
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
      await registerUser(email, password, name);
      if (onRegister) {
        onRegister();
      }
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.loginLayout}>
      <AppHeader />
      <div>
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className="text text_type_main-medium mb-6">Регистрация</h1>

            <Input
              type="text"
              placeholder="Имя"
              onChange={handleNameChange}
              value={name}
              name="name"
              error={false}
              errorText="Ошибка"
              size="default"
              extraClass="mb-6"
            />

            <EmailInput
              onChange={handleEmailChange}
              value={email}
              placeholder="Email"
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
            >
              Зарегистрироваться
            </Button>

            <div className={styles.newPerson}>
              <p className="text text_type_main-default text_color_inactive"> Уже зарегистрированы? </p>
              <Link to="/login">Войти</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

RegisterPage.propTypes = {
  onRegister: PropTypes.func, 
};
