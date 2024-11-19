import AppHeader from '../app-header/app-header/';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from '../../pages/login-page/login-page';

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
        
        {/* Route for login page */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Other routes can be added here */}
        {/* <Route path="/contact" element={<ContactPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
