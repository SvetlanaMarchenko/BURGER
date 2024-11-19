import AppHeader from '../app-header/app-header/';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from '../../pages/login-page/login-page';
import { RegisterPage } from '../../pages/register-page/register-page';

import styles from './app.module.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the main layout */}
        <Route path="/" element={
          <div className={`${styles.appLayout}`}>
            <AppHeader />
            <DndProvider backend={HTML5Backend}>
              <div className={`${styles.ingredientsBox}`}>
                <BurgerIngredients />
                <BurgerConstructor className={`ml-10 mr-4`} />
              </div>
            </DndProvider>
          </div>
        } />
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* <Route path="/register" element={<RegisterPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
