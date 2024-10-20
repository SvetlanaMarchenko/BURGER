import React from 'react';
import styles from './ingredient-constructor.module.css';
import { ConstructorElement, Counter, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredients from '../utils/ingredients-info.json';





const BurgerConstructor = () => {
   
      const filterIngredientsByType = (type) => {
         return ingredients.filter((item) => item.type === type);
      };

      const bun = filterIngredientsByType('bun')[0];






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




          
          {/* <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            // thumbnail={img}
          /> */}
          

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
                

               <Counter count={1} size="default" extraClass="m-1" color="white" />
       

            <Button htmlType="button" type="primary" size="medium">
               Нажми на меня
            </Button>

        </div>


      )
    }

   

export default BurgerConstructor;

