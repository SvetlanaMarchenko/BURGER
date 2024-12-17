import { NavLink } from 'react-router-dom';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.navigationBarLeft} mr-2 mb-4 mt-4`}>
        <BurgerIcon type="secondary" className={`${styles.icon} pl-5 pr-2`} />
        <NavLink 
          to="/"
          className={({ isActive }) => 
            isActive ? `${styles.active1} text text_type_main-default` : "text text_type_main-default text_color_inactive pr-5"
          }> 
           Конструктор
        </NavLink>
      </nav>

      <nav className={`${styles.navigationBarLeft} mb-4 mt-4`}>
        <ListIcon type="secondary" className={`${styles.icon} pl-5 pr-2`} />
        <button className="text text_type_main-default text_color_inactive pr-5">
          Лента Заказов
        </button>
      </nav>

      <div className={styles.logoContainer}>
        <Logo />
      </div>

      <nav className={`${styles.navigationBarRight} mb-4 mt-4`}>
        <ProfileIcon type="secondary" className={`${styles.icon} pl-5 pr-2`} />
        <NavLink 
          to="/profile"
          className={({ isActive }) => 
            isActive ? `${styles.active1} text text_type_main-default` : "text text_type_main-default text_color_inactive pr-5"
          }>
          Личный Кабинет
        </NavLink>
      </nav>
    </header>
  );
};

export default AppHeader;
