import { useState, useEffect } from 'react';
import './App.css';
import AppHeader from '../app-header/app-header/';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`У нас ошибка: ${response.status}`);
        }
        const data = await response.json();
        setIngredients(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIngredients();
  }, []);


  return (
    <div id="app">
      <AppHeader />
      <main className="ingredientsBox">
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={ingredients}  className="ingredient-constructor ml-10 mr-4"/>
      </main>
    </div>
  );
}

export default App;
