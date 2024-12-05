import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 
import styles from './profile-page.module.css';
import { useNavigate } from 'react-router-dom';
import { PasswordInput, Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { fetchUserData, logoutUser, updateUserData } from '../../utils/Api'; 

function ProfilePage({ initialUserData: propInitialUserData }) { 
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [initialUserData, setInitialUserData] = useState({ email: '', name: '' });
  const [isChanged, setIsChanged] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    if (propInitialUserData) {
      setInitialUserData(propInitialUserData);
      setEmail(propInitialUserData.email);
      setName(propInitialUserData.name);
    } else {
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
    }
  }, [propInitialUserData]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsChanged(true);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setIsChanged(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsChanged(true);
  };

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
      setIsChanged(false);
    } catch (error) {
      setError('Ошибка при сохранении данных');
      setSuccessMessage('');
    }
  };

  const handleCancel = () => {
    setEmail(initialUserData.email);
    setName(initialUserData.name);
    setPassword('');
    setIsChanged(false);
  };

  const handleLogout = async () => {
    try {
      await logoutUser(); 
      navigate('/login');
    } catch (error) {
      alert('Ошибка при выходе. Попробуйте позже.');
    }
  };

  return (
    <div className={styles.loginLayoutProfile}>
      <div>
        <div className={styles.container}>
          <div className={styles.profileForm}>
            <nav className={styles.profileChoice}>
              <NavLink to="/profile" className={({ isActive }) => isActive ? `${styles.chioceOption} text text_type_main-medium` : `${styles.chioceOptionInactive} text text_type_main-medium text_color_inactive`}>
                Профиль
              </NavLink>

              <NavLink to="/" className={({ isActive }) => isActive ? `${styles.chioceOption} text text_type_main-medium` : `${styles.chioceOptionInactive} text text_type_main-medium text_color_inactive`}>
                История заказов
              </NavLink>

              <h1 className={`${styles.chioceOptionInactive} text text_type_main-medium text_color_inactive mb-20`} onClick={handleLogout}>
                Выход
              </h1>
              <p className={`${styles.chioceOptionInactiveInfo} text text_type_main-small text_color_inactive`}>
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

              {isChanged && (
                <div className={styles.buttonsContainer}>
                  <Button
                    type="secondary"
                    size="large"
                    onClick={handleCancel}
                  >
                    Отмена
                  </Button>
                  <Button type="primary" size="large">Сохранить</Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

ProfilePage.propTypes = {
  initialUserData: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string
  })
};

ProfilePage.defaultProps = {
  initialUserData: null
};

export default ProfilePage;
