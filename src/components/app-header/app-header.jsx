import React from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.navigationBarLeft} mr-2 mb-4 mt-4`}>
        <BurgerIcon type="secondary" className={`${styles.icon} pl-5 pr-2`} />
        <button className="text text_type_main-default pr-5">Конструктор</button>
      </nav>

      <nav className={`${styles.navigationBarLeft} mb-4 mt-4`}>
        <ListIcon type="secondary" className={`${styles.icon} pl-5 pr-2`} />
        <button className="text text_type_main-default pr-5">
          Лента Заказов
        </button>
      </nav>

      <div className={styles.logoContainer}>
        <Logo />
      </div>

      <nav className={`${styles.navigationBarRight} mb-4 mt-4`}>
        <ProfileIcon type="secondary" className={`${styles.icon} pl-5 pr-2`} />
        <button className="text text_type_main-default pr-5">
          Личный Кабинет
        </button>
      </nav>
    </header>
  );
};

// AppHeader.propTypes = {
//   isUserLoggedIn: PropTypes.bool,
// };
// AppHeader.defaultProps = {
//   isUserLoggedIn: false,
// };

export default AppHeader;
