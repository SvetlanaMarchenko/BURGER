// BurgerConstructor.js
import React, { useState, useMemo } from 'react';
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

   const totalPrice = useMemo(() => {
      return (bun ? bun.price * 2 : 0) + ingredients.reduce((sum, item) => sum + item.price, 0);
   }, [bun, ingredients]);

   return (
      <div ref={dropTarget} className={`${styles.ingredientConstructor} mt-25 ml-10 mr-4`}>
         <div className={`${styles.constructorElementBlock} ml-8`}>
            {bun ? (
               <ConstructorElement
                  key="top-bun"
                  type="top"
                  isLocked={true}
                  text={`${bun.name} (верх)`}
                  price={bun.price}
                  thumbnail={bun.image}
               />
            ) : (
               <div className={`${styles.emptyBunWrapper} ${styles.constructorElementBlock}`}>
                  <ConstructorElement type="top" text="Выберите булку" isLocked={true} />
               </div>
            )}
         </div>
         <div className={styles.innerIngredients}>
            {ingredients.length > 0 ? (
               ingredients.map((ingredient) => (
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
               ))
            ) : (
               <div className={`${styles.emptyIngredientWrapper} ml-8 ${styles.emptyBunWrapper}  text text_type_main-default`}>
                  <ConstructorElement text="Выберите начинку"  />
               </div>
            )}
         </div>

         <div className={`${styles.constructorElementBlock} ml-8`}>
            {bun ? (
               <ConstructorElement
                  key="bottom-bun"
                  type="bottom"
                  isLocked={true}
                  text={`${bun.name} (низ)`}
                  price={bun.price}
                  thumbnail={bun.image}
               />
            ) : (
               <div className={`${styles.emptyBunWrapper}  ${styles.constructorElementBlock}`}>
                  <ConstructorElement type="bottom" text="Выберите булку" isLocked={true}  />
               </div>
            )}
         </div>

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
               <OrderDetails onClose={closeModal} totalPrice={totalPrice} />
            </Modal>
         )}
      </div>
   );
};

export default BurgerConstructor;
