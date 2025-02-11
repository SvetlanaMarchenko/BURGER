import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import styles from './profile-page.module.css';
import { logoutUser } from '../../../utils/api';

interface PropInitialUserDataProps {
  email: string;
  name: string;
}

const NavigationProfilePage: React.FC<{ initialUserData?: PropInitialUserDataProps }> = ({ initialUserData }) => {
  const navigate = useNavigate();

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
        <nav className={styles.profileChoice}>
            <NavLink to="/profile" className={({ isActive }) => isActive ? `${styles.chioceOption} text text_type_main-medium` : `${styles.chioceOptionInactive} text text_type_main-medium text_color_inactive`}>
              Профиль
            </NavLink>
            <NavLink to="/profile/orders" className={({ isActive }) => isActive ? `${styles.chioceOption} text text_type_main-medium` : `${styles.chioceOptionInactive} text text_type_main-medium text_color_inactive`}>
              История заказов
            </NavLink>
            <h1 className={`${styles.chioceOptionInactive} text text_type_main-medium text_color_inactive mb-20`} onClick={handleLogout}>
              Выход
            </h1>
            <p className={`${styles.chioceOptionInactiveInfo} text text_type_main-small text_color_inactive`}>
              В этом разделе вы можете изменить свои персональные данные
            </p>
        </nav>
      </div>
    </div>
  );
};

export default NavigationProfilePage;
