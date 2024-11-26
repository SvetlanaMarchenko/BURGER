import React from 'react';
import { NavLink } from 'react-router-dom';  // Добавляем импорт NavLink
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      {/* Навигация слева: иконка бургерного меню и кнопка "Конструктор" */}
      <nav className={`${styles.navigationBarLeft} mr-2 mb-4 mt-4`}>
        <BurgerIcon type="secondary" className={`${styles.icon} pl-5 pr-2`} />
        <button className="text text_type_main-default pr-5">Конструктор</button>
      </nav>

      {/* Навигация для "Лента заказов" */}
      <nav className={`${styles.navigationBarLeft} mb-4 mt-4`}>
        <ListIcon type="secondary" className={`${styles.icon} pl-5 pr-2`} />
        <button className="text text_type_main-default pr-5">
          Лента Заказов
        </button>
      </nav>

      {/* Логотип по центру */}
      <div className={styles.logoContainer}>
        <Logo />
      </div>

      {/* Навигация справа: иконка профиля и ссылка на "Личный кабинет" */}
      <nav className={`${styles.navigationBarRight} mb-4 mt-4`}>
        <ProfileIcon type="secondary" className={`${styles.icon} pl-5 pr-2`} />

        <NavLink 
          to="/profile"  // Меняем путь на "/profile", так как это путь для личного кабинета
          className={({ isActive }) => 
            isActive ? `${styles.active1} text text_type_main-default pr-5` : "text text_type_main-default pr-5"
          }
        >
           Личный Кабинет
        </NavLink>
      </nav>
    </header>
  );
};

export default AppHeader;
