import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password-page.module.css';
import AppHeader from '../../components/app-header/app-header';
import { resetPassword } from '../../utils/Api';  // Импортируем функцию сброса пароля

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return;

    setIsSubmitting(true);
    try {
      // Вызываем функцию сброса пароля из API
      const data = await resetPassword(email);

      if (data.success) {
        navigate('/reset-password');
      } else {
        alert(data.message || 'Что-то пошло не так!');
      }
    } catch (error) {
      console.error("Error during password reset:", error);
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
            <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
            <EmailInput
              onChange={handleEmailChange}
              value={email}  
              placeholder={'Укажите email'}
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
              Восстановить
            </Button>

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
