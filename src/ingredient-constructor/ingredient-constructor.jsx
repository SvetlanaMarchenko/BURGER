import React from 'react';
import styles from './ingredient-constructor.module.css';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = ({ingredients}) => {
   const filterIngredientsByType = (type) => {
      return ingredients.filter((item) => item.type === type);
   };

   const bun = filterIngredientsByType('bun')[0];
   const mainIngredients = filterIngredientsByType('main');

   const handleButtonClick = () => {
      console.log("Button clicked!");
   };

   return (
      <div className="mt-25 ml-8" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

         {bun && (
            <ConstructorElement
               key={`${bun._id}-top`}
               type="top"
               isLocked={true}
               text={`${bun.name} (верх)`}
               price={bun.price}
               thumbnail={bun.image}
            />
         )}

         <div style={{ maxHeight: '300px', overflowY: 'scroll', gap: '16px', display: 'flex', flexDirection: 'column' }}>
         {mainIngredients.map((ingredient) => (
            <div key={ingredient._id}>
               
               <ConstructorElement
                     icon={<DragIcon type="primary" />}
                     text={ingredient.name}
                     price={ingredient.price}
                     thumbnail={ingredient.image}
               />
            </div>
         ))}
         </div>

         {bun && (
            <ConstructorElement
               key={`${bun._id}-bottom`}
               type="bottom"
               isLocked={true}
               text={`${bun.name} (низ)`}
               price={bun.price}
               thumbnail={bun.image}
            />
         )}
         <section className={`${styles.priceOrder} mt-10`}>
            <p className="text text_type_digits-medium">610 </p>
            <CurrencyIcon type="primary" />
            <Button
               style={{ marginLeft: "40px" }}
               htmlType="button"
               type="primary"
               size="medium"
               onClick={handleButtonClick}
            >
               Нажми на меня
            </Button>
         </section>


      </div>
      
   );
};

export default BurgerConstructor;
