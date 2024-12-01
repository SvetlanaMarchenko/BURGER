import React, { useState, useEffect } from 'react';
import styles from './profile-page.module.css';
import AppHeader from '../../components/app-header/app-header';
import { useNavigate } from 'react-router-dom';
import { PasswordInput, Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { fetchUserData, logoutUser, updateUserData } from '../../utils/Api'; 

function ProfilePage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [initialUserData, setInitialUserData] = useState({ email: '', name: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchUserData(); 
        setInitialUserData(result.user);
        setEmail(result.user.email);
        setName(result.user.name);
      } catch (error) {
        setError('Ошибка при загрузке данных');
      }
    };

    fetchData();
  }, []);

  // Обработчики изменения данных
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Обработчик сохранения данных
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      setError('Заполните все поля!');
      return;
    }

    try {
      const updatedUserData = { email, name, password };
  
      const result = await updateUserData(updatedUserData);
  
      setSuccessMessage('Данные успешно обновлены');
      setInitialUserData(result.user);
      setError('');
    } catch (error) {
      setError('Ошибка при сохранении данных');
      setSuccessMessage('');
    }
  };

  const handleCancel = () => {
    setEmail(initialUserData.email);
    setName(initialUserData.name);
    setPassword('');
  };

  // Обработчик выхода из системы
  const handleLogout = async () => {
    try {
      await logoutUser();  // Вызываем функцию выхода из API
      navigate('/login');   // Перенаправляем на страницу входа
    } catch (error) {
      console.error(error);
      alert('Ошибка при выходе. Попробуйте позже.');
    }
  };

  return (
    <div className={styles.loginLayoutProfile}>
      <AppHeader />
      <div>
        <div className={styles.container}>
          <div className={styles.profileForm}>
            <nav className={styles.profileChoice}>
              <NavLink to="/profile" className={({ isActive }) => isActive ? `${styles.chioceOption} text text_type_main-medium` : `${styles.chioceOption} text text_type_main-medium text_color_inactive`}>
                Профиль
              </NavLink>
              <NavLink to="/orders" className={({ isActive }) => isActive ? `${styles.chioceOption} text text_type_main-medium` : `${styles.chioceOption} text text_type_main-medium text_color_inactive`}>
                История заказов
              </NavLink>
              <h1 className={`${styles.chioceOption} text text_type_main-medium mb-20`} onClick={handleLogout}>
                Выход
              </h1>
              <p className={`${styles.chioceOption} text text_type_main-small text_color_inactive`}>
                В этом разделе вы можете изменить свои персональные данные
              </p>
            </nav>

            <form className={styles.form} onSubmit={handleSubmit}>
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
                isIcon={true}
                extraClass="mb-6"
              />
              <PasswordInput
                onChange={handlePasswordChange}
                value={password}
                name="password"
                extraClass="mb-6"
                icon="EditIcon"
              />

              {error && <p className="text text_type_main-default text_color_inactive">{error}</p>}
              {successMessage && <p className="text text_type_main-default text_color_inactive">{successMessage}</p>}

              <div className={styles.buttonsContainer}>
                <Button type="primary" size="large" extraClass="mt-6">Сохранить</Button>
                <Button
                  type="secondary"
                  size="large"
                  extraClass="mt-6"
                  onClick={handleCancel} // Обработчик отмены
                >
                  Отмена
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage
