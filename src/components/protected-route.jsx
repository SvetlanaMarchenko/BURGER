import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { fetchUserData } from '../utils/api'; // Импортируем функцию для получения данных пользователя

const ProtectedRouteElement = ({ element: Component, onlyUnAuth = false}) => {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  // Проверка авторизации и данных пользователя
  useEffect(() => {
    const checkAuthStatus = async () => {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        setIsAuthenticated(false);
      } else {
        try {
          await fetchUserData();
          setIsAuthenticated(true);
        } catch (error) {
          setIsAuthenticated(false);
        }
      }

      setIsAuthChecked(true);
    };

    checkAuthStatus();
  }, []);

  if (!isAuthChecked) {
    return <div>Загрузка...</div>; // Прелоадер
  }

  // Защита маршрута для неавторизованных пользователей
  if (onlyUnAuth && isAuthenticated) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  // Защита маршрута для авторизованных пользователей
  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  // Рендерим переданный компонент
  return <Component />;
};

export const OnlyAuth = (props) => <ProtectedRouteElement {...props} onlyUnAuth={false} />;
export const OnlyUnAuth = (props) => <ProtectedRouteElement {...props} onlyUnAuth={true} />;
