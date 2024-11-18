import AppHeader from '../app-header/app-header/';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import styles from './app.module.css';

function App() {
  return (
    <Router>
      <Routes>
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
        
        {/* <Route path="/about" element={<AboutPage />} /> */}
        {/* <Route path="/contact" element={<ContactPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;




