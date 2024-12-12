import React, { useEffect, useState, FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { fetchUserData } from '../utils/api'; 

// here onlyUnAuth strictly determinated  
interface ProtectedRouteElementProps{
  element: React.ComponentType<any>,
  onlyUnAuth: boolean;
}
interface OnlyAuthProps{
  [key: string]: any;
  element: React.ComponentType<any>;
}

const ProtectedRouteElement: FC<ProtectedRouteElementProps> = ({ element: Component, onlyUnAuth = false}) => {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

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
    return <div>Загрузка...</div>;
  }

  if (onlyUnAuth && isAuthenticated) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <Component />;
};

export const OnlyAuth: FC<OnlyAuthProps> = (props) => <ProtectedRouteElement {...props} onlyUnAuth={false} />;
export const OnlyUnAuth: FC<OnlyAuthProps> = (props) => <ProtectedRouteElement {...props} onlyUnAuth={true} />;