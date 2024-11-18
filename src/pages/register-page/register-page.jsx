import React from 'react';
import styles from './register-page.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const RegisterPage = () => {
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


export default RegisterPage;
