import React from 'react';
import styles from './ingredient-constructor.module.css';
import { ConstructorElement, Counter, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredients from '../utils/ingredients-info.json';





const BurgerConstructor = () => {
   
      const filterIngredientsByType = (type) => {
         return ingredients.filter((item) => item.type === type);
      };

      const bun = filterIngredientsByType('bun')[0];
      const mainIngredient = filterIngredientsByType('main');



      return (
         <div className="mt-25 ml-8" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
         {/* Top bun */}
         {bun && (
           <ConstructorElement
             key={bun._id}
             type="top"
             isLocked={true}
             text={`${bun.name} (верх)`}
             price={bun.price}
             thumbnail={bun.image}
           />
         )}

         {mainIngredient && (
          <ConstructorElement
            key={mainIngredient[1]._id}
            text={mainIngredient[1].name}
            price={mainIngredient[1].price}
            thumbnail={mainIngredient[1].image}
          />
         )}

         {mainIngredient && (
          <ConstructorElement
            key={mainIngredient[2]._id}
            text={mainIngredient[2].name}
            price={mainIngredient[2].price}
            thumbnail={mainIngredient[2].image}
          />
         )}
         {mainIngredient && (
          <ConstructorElement
            key={mainIngredient[3]._id}
            text={mainIngredient[3].name}
            price={mainIngredient[3].price}
            thumbnail={mainIngredient[3].image}
          />
         )}

         {mainIngredient && (
          <ConstructorElement
            key={mainIngredient[4]._id}
            text={mainIngredient[4].name}
            price={mainIngredient[4].price}
            thumbnail={mainIngredient[4].image}
          />
         )}

         {mainIngredient && (
          <ConstructorElement
            key={mainIngredient[5]._id}
            text={mainIngredient[5].name}
            price={mainIngredient[5].price}
            thumbnail={mainIngredient[5].image}
          />
         )}

          {bun && (
          <ConstructorElement
            key={bun._id}
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


      )
    }

   

export default BurgerConstructor;

