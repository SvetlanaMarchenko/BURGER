import React from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { LoginPage } from '../../pages/login-page/login-page';
import { RegisterPage } from '../../pages/register-page/register-page';
import { ForgotPasswordPage } from '../../pages/forgot-password-page/forgot-password-page';
import { ResetPasswordPage } from '../../pages/reset-password-page/reset-password-page';
import { HomePage } from '../../pages/home-page/home-page';
import ProfilePage from '../../pages/profile-page/profile-page';
import IngredientsIdPage from '../../pages/ingredients-id-page/ingredients-id-page';
import { OnlyAuth, OnlyUnAuth, ProtectedResetPassword } from '../protected-route.jsx';

function App() {
  const location = useLocation(); // Получаем текущую локацию из React Router
  const state = location.state; // Извлекаем state из текущего location

  return (
    <div>
      <nav>
        <NavLink 
          to="/home" 
          className={({ isActive }) => isActive ? "active1" : ""}
        >
          Home
        </NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/forgot-password">Forgot Password</NavLink>
        <NavLink to="/reset-password">Reset Password</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>

      {/* Если есть backgroundLocation в state, то рендерим страницу ингредиента как модалку */}
      {state?.backgroundLocation && (
        <Routes location={state.backgroundLocation}>
          <Route path="/ingredients/:id" element={<IngredientsIdPage />} />
        </Routes>
      )}

      {/* Основные маршруты приложения */}
      <Routes location={state?.backgroundLocation || location}>    
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />    
        
        {/* Маршруты для неавторизованных пользователей */}
        <Route path="/login" element={<OnlyUnAuth element={LoginPage} />} />
        <Route path="/register" element={<OnlyUnAuth element={RegisterPage} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth element={ForgotPasswordPage} />} />
        
        {/* Доступ только для авторизованных пользователей */}
        <Route path="/profile" element={<OnlyAuth element={ProfilePage} />} />
        <Route path="/profile/*" element={<OnlyAuth element={ProfilePage} />} /> {/* Все вложенные маршруты */}
        
        {/* Защита для маршрута /reset-password, доступ только для пользователей, которые перешли через /forgot-password */}
        <Route path="/reset-password" element={<ProtectedResetPassword element={ResetPasswordPage} />} />
        
        {/* Главная страница, доступна всем */}
        <Route path="/ingredients/:id" element={<IngredientsIdPage />} />
      </Routes>
    </div>
  );
}

export default App;
