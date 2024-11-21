


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PasswordInput, EmailInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register-page.module.css';
import AppHeader from '../../components/app-header/app-header';

export function RegisterPage() {
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

  return (
    <div className={styles.loginLayout}>
      <AppHeader />
      <div>
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className="text text_type_main-medium mb-2">Регистрация</h1>
            
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={handleNameChange}
              value={name}
              name={'name'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
            />

            <EmailInput
              onChange={handleEmailChange}
              value={email}
              placeholder="Email"
              isIcon={false}
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
              <p className="text text_type_main-default text_color_inactive mb-4"> Уже зарегистрированы? </p> 
              <Link to="/login">
                Войти
              </Link>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}