import styles from './reset-password-page.module.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PasswordInput, Button, EmailInput  } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../../components/app-header/app-header';

export function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  
//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };
  
//   const handleCodeChange = (e) => {
//     setCode(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add logic to handle the password reset request here
//     console.log("Password reset request", { password, code });
//   };

  return (
    <div className={styles.loginLayout}>
      <AppHeader /> 
      <div>
        <div className={styles.container}>
          <form className={styles.form}>
          {/* <form className={styles.form} onSubmit={handleSubmit}> */}
            <h1 className={`text text_type_main-medium mb-6`}>Восстановление пароля</h1>
            
            <PasswordInput
            //   onChange={handlePasswordChange}
              value={password}
              placeholder={'Введите новый пароль'}
              extraClass="mb-6"
            />
            <EmailInput
            //   onChange={onChange}
              placeholder={'Введите код из письма'}
              isIcon={false}
              extraClass="mb-6"
            />            
         
            
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass="mb-20"
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
