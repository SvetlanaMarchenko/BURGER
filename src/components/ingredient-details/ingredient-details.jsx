import React from 'react';
import styles from './ingredient-details.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details'; 

const BurgerIngredients = ({ingredients}) => {
   const [current, setCurrent] = React.useState('Булки');

   const filterIngredientsByType = (type) => {
      return ingredients.filter((item) => item.type === type);
   };

   const ingredientTypes = [
      { type: 'bun', value: 'Булки' },
      { type: 'sauce', value: 'Соусы' },
      { type: 'main', value: 'Начинки' }
   ];

   return (
      <div className={styles.ingredientsSection}>
         <h1 className={`${styles.mainTitle} text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
         <div className={styles.tabBar}>
            <Tab value="Булки" active={current === 'Булки'} onClick={() => setCurrent('Булки')}>
               Булки
            </Tab>
            <Tab value="Соусы" active={current === 'Соусы'} onClick={() => setCurrent('Соусы')}>
               Соусы
            </Tab>
            <Tab value="Начинки" active={current === 'Начинки'} onClick={() => setCurrent('Начинки')}>
               Начинки
            </Tab>
         </div>

         <main>
               <h2 className={`${styles.mainTitle} mt-10`}>{current}</h2>
               <section className={`${styles.ingredientsList} mt-6 ml-4 mb-10`}>

               {ingredientTypes.map(({ type, value }) => (
               <React.Fragment key={type}>
                  {current === value && filterIngredientsByType(type).map((item, index) => (
                     <div key={item._id} className={`${styles.ingredientsItem} text text_type_main-small`} >
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
               </React.Fragment>
            ))}
            </section>
         </main>
      </div>
   );
};

export default BurgerIngredients;

