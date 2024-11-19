import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {PasswordInput,EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login-page.module.css';
import AppHeader from '../../components/app-header/app-header';


export function LoginPage() {
  const [password, setPassword] = useState('');
  const [value, setValue] = React.useState('bob@example.com')
  const onChange = e => {
    setValue(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.loginLayout}>
      <AppHeader/> 
      <div>
        <div className={styles.container}>
          <form className={styles.form}>
            <h1 className={`text text_type_main-medium mb-6`}>Вход</h1>
            <EmailInput
                onChange={onChange}
                value={value}
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
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              // onClick={handleCreateOrder}
              extraClass="mb-20"
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
            <Link to="/register">
              Восстановить пароль
            </Link>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}
