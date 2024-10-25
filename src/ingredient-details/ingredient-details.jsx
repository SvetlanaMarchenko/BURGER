import React from 'react';
import styles from './ingredient-details.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredients from '../utils/ingredients-info.json';


const BurgerIngredients = () => {
   const [current, setCurrent] = React.useState('Булки');

   const filterIngredientsByType = (type) => {
      return ingredients.filter((item) => item.type === type);
   };

   return (
      <div className={styles.ingredientsSection}>
         <h1 style={{  display: 'flex' }} className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
         <div style={{  display: 'flex' }}>
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
               <h2 className={'${styles.mainName} mt-10'} style={{  display: 'flex' }} > {current}</h2>
               <section className={`${styles.ingredientsList} mt-6 ml-4 mb-10`}>

               {current === "Булки" && filterIngredientsByType('bun').map((item, index) => (
               <div key={item._id} className={`${styles.ingredientsItem} text text_type_main-small`} style={{ marginBottom: '0 !important' }}>
               
                  {index === 0 && (
                     <Counter count={1} size="default" extraClass={`${styles.counterTopRight}`} color="white" />
                  )}
                  
                  <img src={item.image} alt={item.name} className="ml-4 mb-1 mr-4" />
                  <p className={`${styles.priceItem} mb-1`}>
                     {item.price}
                     <CurrencyIcon type="primary" />
                  </p>
                  <p>{item.name}</p>
               </div>
               ))}



               {current === "Соусы" && filterIngredientsByType('sauce').map((item) => (
                  <div key={item._id} className={`${styles.ingredientsItem} text text_type_main-small`} style={{ marginBottom: '0 !important' }}>
                     <img src={item.image} alt={item.name}  className={"ml-4 mb-1 mr-4"}  />
                     <p className='${styles.priceItem} mb-1'>{item.price} 
                       <CurrencyIcon type="primary" />
                     </p>
                     <p>{item.name}</p>
                  </div>
               ))}
               {current === "Начинки" && filterIngredientsByType('main').map((item) => (
                  <div key={item._id} className={`${styles.ingredientsItem} text text_type_main-small`} style={{ marginBottom: '0 !important' }}>
                     <img src={item.image} alt={item.name} className={"ml-4 mb-1 mr-4"}  />
                     <p className='${styles.priceItem} mb-1'>{item.price} 
                       <CurrencyIcon type="primary" />
                     </p>
                     <p>{item.name}</p>
                  </div>
               ))}
            </section>
         </main>
      </div>
   );
};

export default BurgerIngredients;

