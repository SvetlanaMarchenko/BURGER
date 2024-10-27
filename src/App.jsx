import { useState, useEffect } from 'react';
import './App.css';
import AppHeader from './app-header/app-header/';
import BurgerIngredients from './ingredient-details/ingredient-details/';
import BurgerConstructor from './ingredient-constructor/ingredient-constructor/';

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

  if (isLoading) return <p>Загружаемся...</p>;
  if (error) return <p>Упс... Произошла ошибка: {error}</p>;

  return (
    <div id="app">
      <div> 
        <AppHeader /> 
      </div>

      <div className="ingredientsBox">
        <div>
          <BurgerIngredients ingredients={ingredients} />
        </div>
        <div className="ingredient-constructor ml-10">
          <BurgerConstructor ingredients={ingredients} />
        </div>
      </div>
    </div>
  );
}

export default App;
