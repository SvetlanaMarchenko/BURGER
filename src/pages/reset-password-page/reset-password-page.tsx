import styles from './reset-password-page.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPasswordRequest } from '../../utils/api.js';

export function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password || !token) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    setIsSubmitting(true);
    setError('');
    try {
      const response = await resetPasswordRequest(password, token);
      if (response.success) {
        navigate('/login'); 
      } else {
        setError(response.message || 'Что-то пошло не так!');
      }
    } catch (error) {
      setError( 'Что-то пошло не так. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className={styles.loginLayout}>
      <div>
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>

            <PasswordInput
              onChange={handlePasswordChange}
              value={password}
              placeholder="Введите новый пароль"
              extraClass="mb-6"
            />

            <Input
              type="text"
              placeholder="Введите код из письма"
              onChange={handleTokenChange}
              value={token}
              name="token"
              extraClass="mb-6" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass="mb-20"
              disabled={isSubmitting}
            >
              Сохранить
            </Button>

            {error && <p className="text text_type_main-default text_color_inactive">{error}</p>}

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
