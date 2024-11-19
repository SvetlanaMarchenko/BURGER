  import React, { useState } from 'react';
  import { Link } from 'react-router-dom';
  import {EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
  import styles from './forgot-password-page.module.css';
  import AppHeader from '../../components/app-header/app-header';
  
  
  export function ForgotPasswordPage() {
    const [password, setPassword] = useState('');
    const [value, setValue] = React.useState('')
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
              <h1 className={`text text_type_main-medium mb-6`}>Восстановление пароля</h1>
              <EmailInput
                  onChange={onChange}
                  value={value}
                  placeholder={'Укажите email'}
                  isIcon={false}
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
              <p className="text text_type_main-default text_color_inactive mb-4"> Вспомнили пароль? </p> 
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
  