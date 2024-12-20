import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PasswordInput, EmailInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register-page.module.css';
import { registerUser } from '../../utils/api.js';

interface RegisterPageProps {
  onRegister: () => void;  
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      setError("Ошибка при регистрации");
    }
  };

  return (
    <div className={styles.loginLayout}>
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
              extraClass="mb-6" />

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
