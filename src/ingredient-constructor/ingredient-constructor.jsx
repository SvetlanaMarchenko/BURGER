// import React from 'react';
// import styles from './ingredient-constructor.module.css';
import { ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredients from '../utils/ingredients-info.json';

const BurgerConstructor = () => {
   const filterIngredientsByType = (type) => {
      return ingredients.filter((item) => item.type === type);
   };

   const bun = filterIngredientsByType('bun')[0];
   const mainIngredients = filterIngredientsByType('main');

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

         <div className={{ maxHeight: '300px', overflowY: 'scroll', gap: '16px', display: 'flex', flexDirection: 'column' }}>
            {mainIngredients.map((ingredient) => (
               <ConstructorElement
                  key={ingredient._id}
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                  icon={<DragIcon type="primary" />}
               />
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

         <Button htmlType="button" type="primary" size="medium">
            Нажми на меня
         </Button>
      </div>
   );
};

export default BurgerConstructor;
