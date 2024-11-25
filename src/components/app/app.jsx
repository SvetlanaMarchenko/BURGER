import React from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { LoginPage } from '../../pages/login-page/login-page';
import { RegisterPage } from '../../pages/register-page/register-page';
import { ForgotPasswordPage } from '../../pages/forgot-password-page/forgot-password-page';
import { ResetPasswordPage } from '../../pages/reset-password-page/reset-password-page';
import { HomePage } from '../../pages/home-page/home-page';
import { ProfilePage } from '../../pages/profile-page/profile-page';
import IngredientsIdPage from '../../pages/ingredients-id-page/ingredients-id-page'; 
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';



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
        <Routes> 
          <Route path="/ingredients/:id" element={< IngredientDetails />} />
        </Routes>
      )}

      {/* Основные маршруты приложения */}
      <Routes location={state?.backgroundLocation || location}>        
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/ingredients/:id" element={< IngredientsIdPage/>} />
      </Routes>
    </div>
  );
}

export default App
