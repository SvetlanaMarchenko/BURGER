import styles from './reset-password-page.module.css';
import { useLocation, useNavigate } from 'react-router-dom'; 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PasswordInput, Button, EmailInput  } from '@ya.praktikum/react-developer-burger-ui-components';
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
  
  const handleCodeChange = (e) => {
    setToken(e.target.value);
  };

const handleSubmit = async (e) => {
   e.preventDefault();

   if (!password || !token) return;

   setIsSubmitting(true);

   try {
      const response = await fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, token }),
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
            <h1 className={`text text_type_main-medium mb-6`}>Восстановление пароля</h1>
            
            <PasswordInput
              onChange={handlePasswordChange}
              value={password}
              placeholder={'Введите новый пароль'}
              extraClass="mb-6"
            />
            <EmailInput
              onChange={handleCodeChange}
              value={token}
              placeholder={'Введите код из письма'}
              isIcon={false}
              extraClass="mb-6"
            />            
         
            
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
