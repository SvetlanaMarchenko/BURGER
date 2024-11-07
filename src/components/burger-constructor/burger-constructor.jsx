// BurgerConstructor.js
import React, { useState } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details'; 
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient, setBun, removeBun, removeIngredient, clearConstructor } from '../../services/actions/constructor-actions';
import { useDrop } from 'react-dnd';


const BurgerConstructor = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const dispatch = useDispatch();
   const { bun, ingredients } = useSelector((state) => state.burgerConstructor);

   const [{ isOver }, dropTarget] = useDrop({
      accept: 'item',
      drop: (item) => {
        if (item.type === 'bun') {
          if (bun) dispatch(removeBun()); 
          dispatch(setBun(item)); 
        } else {
          dispatch(addIngredient(item)); 
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });
   
   const handleRemoveIngredient = (ingredientId) => {
      dispatch(removeIngredient(ingredientId));
   };

   const handleClearConstructor = () => {
      dispatch(clearConstructor());
   };

   const openModal = () => setIsModalOpen(true);
   const closeModal = () => setIsModalOpen(false);

   // Итоговая стоимость
   const totalPrice = (bun ? bun.price * 2 : 0) + ingredients.reduce((sum, item) => sum + item.price, 0);

   return (
      <div ref={dropTarget} className={`${styles.ingredientConstructor} mt-25 ml-10 mr-4`}>
         {bun && (
            <div className={`${styles.constructorElementBlock} ml-8`}>
               <ConstructorElement
                  key={`${bun._id}-top`}
                  type="top"
                  isLocked={true}
                  text={`${bun.name} (верх)`}
                  price={bun.price}
                  thumbnail={bun.image}
               />
            </div>
         )}

         <div className={styles.innerIngredients}>
            {ingredients.map((ingredient) => (
               <div key={ingredient._id} className={styles.constructorElementBlock}>
                  <div className={styles.dragIconWrapper}>
                     <DragIcon />
                  </div>
                  <ConstructorElement
                     text={ingredient.name}
                     price={ingredient.price}
                     thumbnail={ingredient.image}
                     onClick={() => handleRemoveIngredient(ingredient._id)}
                  />
               </div>
            ))}
         </div>

         {bun && (
            <div className={`${styles.constructorElementBlock} ml-8`}>
               <ConstructorElement
                  key={`${bun._id}-bottom`}
                  type="bottom"
                  isLocked={true}
                  text={`${bun.name} (низ)`}
                  price={bun.price}
                  thumbnail={bun.image}
               />
            </div>
         )}

         <section className={`${styles.priceOrder} mt-10`}>
            <p className="text text_type_digits-medium">{totalPrice}</p>
            <CurrencyIcon type="primary" className="mr-10" />
            <Button
               htmlType="button"
               type="primary"
               size="medium"
               onClick={openModal}
            >
               Оформить заказ
            </Button>
         </section>

         <button onClick={handleClearConstructor} className="mt-4">
            Очистить конструктор
         </button>

         {isModalOpen && (
            <Modal onClose={closeModal}>
               <OrderDetails onClose={closeModal} />
            </Modal>
         )}
      </div>
   );
};

export default BurgerConstructor;
