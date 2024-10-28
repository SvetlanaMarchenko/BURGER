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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);



  return (
    <div id="app">
      <AppHeader />
      <main className="ingredientsBox">
        <div>
          <BurgerIngredients ingredients={ingredients} />
          <>
          <Button onClick={openModal} htmlType="button">Открыть модальное окно</Button>
      {isModalOpen && (
        <>
          <ModalOverlay onClose={closeModal} />
          <Modal header="Внимание!" onClose={closeModal}>
            <p>Спасибо за внимание!</p>
            <p>Открывай меня, если станет скучно :)</p>
          </Modal>
        </>
      )}
      </>
        </div>
        <div className="ingredient-constructor ml-10 mr-4">
          <BurgerConstructor ingredients={ingredients} />
        </div>
      </main>
    </div>
  );
}

export default App;
