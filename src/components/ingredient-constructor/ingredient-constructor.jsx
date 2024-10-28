import React, { useState } from 'react';
import styles from './ingredient-constructor.module.css';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details'; 

const BurgerConstructor = ({ ingredients }) => {
   const [isModalOpen, setIsModalOpen] = useState(false);

   const filterIngredientsByType = (type) => {
      return ingredients.filter((item) => item.type === type);
   };

   const bun = filterIngredientsByType('bun')[0];
   const mainIngredients = filterIngredientsByType('main');

   const openModal = () => setIsModalOpen(true);
   const closeModal = () => setIsModalOpen(false);

   return (
      <div className={`${styles.ingredientConstructor} mt-25 ml-10 mr-4`}>
         {bun && (
            <div className={`${styles.constructorElementBlock } ml-8`}>
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
            {mainIngredients.map((ingredient) => (
               <div key={ingredient._id}>
                  <div className={styles.constructorElementBlock}>
                     <div className={styles.dragIconWrapper}>
                        <DragIcon />
                     </div>
                     <ConstructorElement
                        icon={<DragIcon type="primary" />}
                        text={ingredient.name}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                     />
                  </div>
               </div>
            ))}
         </div>

         {bun && (
            <div className={`${styles.constructorElementBlock } ml-8`}>
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
            <p className="text text_type_digits-medium">610</p>
            <CurrencyIcon type="primary" className="mr-10"/>
            <Button
               htmlType="button"
               type="primary"
               size="medium"
               onClick={openModal}
            >
               Оформить заказ
            </Button>
         </section>

         {isModalOpen && (
            <Modal onClose={closeModal}>
               <OrderDetails onClose={closeModal} />
            </Modal>
         )}
      </div>
   );
};

export default BurgerConstructor;
