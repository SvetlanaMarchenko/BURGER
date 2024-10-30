import React, { useState } from 'react';
import { createPortal } from 'react-dom'; // Ensure this import is correct
import styles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details'; 
import Modal from '../modal/modal';

const BurgerIngredients = ({ ingredients }) => {
   const [current, setCurrent] = useState('Булки');
   const [selectedIngredient, setSelectedIngredient] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const filterIngredientsByType = (type) => {
      return ingredients.filter((item) => item.type === type);
   };

   const ingredientTypes = [
      { type: 'bun', value: 'Булки' },
      { type: 'sauce', value: 'Соусы' },
      { type: 'main', value: 'Начинки' }
   ];

   const openModal = (ingredient) => {
      setSelectedIngredient(ingredient);
      setIsModalOpen(true);
   };

   const closeModal = () => {
      setIsModalOpen(false);
      setSelectedIngredient(null);
   };

   return (
      <div className={styles.ingredientsSection}>
         <h1 className={`${styles.mainTitle} text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
         <div className={styles.tabBar}>
            {ingredientTypes.map(({ value }) => (
               <Tab key={value} value={value} active={current === value} onClick={() => setCurrent(value)}>
                  {value}
               </Tab>
            ))}
         </div>

         <main>
            <h2 className={`${styles.mainTitle} mt-10`}>{current}</h2>
            <section className={`${styles.ingredientsList} mt-6 ml-4 mb-10`}>
               {filterIngredientsByType(ingredientTypes.find(type => type.value === current).type).map((item, index) => (
                  <div key={item._id} className={`${styles.ingredientsItem} text text_type_main-small`} onClick={() => openModal(item)}>
                     {index === 0 && (
                        <Counter count={1} size="default" extraClass={`${styles.counterTopRight}`} color="white" />
                     )}
                     <img src={item.image} alt={item.name} className="ml-4 mb-1 mr-4" />
                     <p className={`${styles.priceItem} mb-1 text text_type_digits-default`}>
                        {item.price}
                        <CurrencyIcon type="primary" />
                     </p>
                     <p>{item.name}</p>
                  </div>
               ))}
            </section>
         </main>

         {isModalOpen && selectedIngredient && createPortal(
            <Modal onClose={closeModal}>
               <IngredientDetails item={selectedIngredient} onClose={closeModal} />
            </Modal>,
            document.getElementById('modal-root')
         )}
      </div>
   );
};

export default BurgerIngredients;
