import { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header/';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

import styles from './app.module.css';

function App() {
  const [ingredients, setIngredients] = useState([]);
  // const [error, setError] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);


  // useEffect(() => {
  //   const fetchIngredients = async () => {
  //     try {
  //       const response = await fetch(API_URL);
  //       if (!response.ok) {
  //         throw new Error(`У нас ошибка: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       setIngredients(data.data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchIngredients();
  // }, []);


  return (
    <div className={`${styles.appLayout}`}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
      <div className={`${styles.ingredientsBox}`}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={ingredients}  className={` ml-10 mr-4`}/>
      </div>
      </DndProvider>
    </div>
  );
}

export default App;
