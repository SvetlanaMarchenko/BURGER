import { useState, useEffect } from 'react';
import './App.css';
import AppHeader from '../app-header/app-header/';
import BurgerIngredients from '../ingredient-details/ingredient-details';
import BurgerConstructor from '../ingredient-constructor/ingredient-constructor';
import Modal from '../modal/modal';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  if (isLoading) return <p>Загружаемся...</p>;
  if (error) return <p>Упс... Произошла ошибка: {error}</p>;

  return (
    <div id="app">
      <AppHeader />
      <main className="ingredientsBox">
        <div>
          <BurgerIngredients ingredients={ingredients} />
        </div>
        <div className="ingredient-constructor ml-10">
          <BurgerConstructor ingredients={ingredients} />
        </div>
      </main>

      {/* Кнопка для открытия модального окна */}
      <Button htmlType="button" styles="display:none;" onClick={openModal}>Открыть модальное окно</Button>

      {isModalOpen && (
        <>
          <ModalOverlay onClose={closeModal} />
          <Modal title="Модальное окно" onClose={closeModal}>
            <p>Содержимое модального окна</p>
          </Modal>
        </>
      )}
    </div>
  );
}

export default App;
