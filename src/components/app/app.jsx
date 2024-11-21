import { Routes, Route, NavLink } from 'react-router-dom';
import { LoginPage } from '../../pages/login-page/login-page';
import { RegisterPage } from '../../pages/register-page/register-page';
import { ForgotPasswordPage } from '../../pages/forgot-password-page/forgot-password-page';
import { ResetPasswordPage } from '../../pages/reset-password-page/reset-password-page';
import { HomePage } from '../../pages/home-page/home-page';

function App() {
  return (
    <div>
      {/* Здесь определяется активность ссылки */}
      <NavLink 
        to="/home" 
        className={({ isActive }) => isActive ? "active1" : ""} 
      >
        {({ isActive }) => isActive ? "Active Home" : "Home"}
      </NavLink>

      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/forgot-password">Forgot Password</NavLink>
      <NavLink to="/reset-password">Reset Password</NavLink>

      <Routes>        
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </div>
  );
}

export default App;