import React from 'react';
import styles from './ingredient-details.module.css';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredients from '../utils/ingredients-info.json';


const BurgerIngredients = () => {
   const [current, setCurrent] = React.useState('Булки');

   const filterIngredientsByType = (type) => {
      return ingredients.filter((item) => item.type === type);
   };

   return (
      <li className={styles.ingredientsSection}>
         <h1 className="text text_type_main-large m-15">Соберите бургер</h1>
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
               <h2 className={styles.mainName}>{current}</h2>
               <section className={`${styles.ingredientsList} mt-6 ml-4 mb-10`}>

               {current === "Булки" && filterIngredientsByType('bun').map((item) => (
                  <div key={item._id} className="ingredientsItem">
                     <img src={item.image} alt={item.name} className={"ml-4 mb-1 mr-4"} />
                     <p className={'${styles.priceItem} mb-1 '} >{item.price} 
                           <CurrencyIcon type="primary" />
                     </p>
                     <p>{item.name}</p>
                  </div>
               ))}
               {current === "Соусы" && filterIngredientsByType('sauce').map((item) => (
                  <div key={item._id} className="ingredientsItem">
                     <img src={item.image} alt={item.name}  className={"ml-4 mb-1 mr-4"}  />
                     <p className='${styles.priceItem} mb-1'>{item.price} 
                       <CurrencyIcon type="primary" />
                     </p>
                     <p>{item.name}</p>
                  </div>
               ))}
               {current === "Начинки" && filterIngredientsByType('main').map((item) => (
                  <div key={item._id} className="ingredientsItem">
                     <img src={item.image} alt={item.name} className={"ml-4 mb-1 mr-4"}  />
                     <p className='${styles.priceItem} mb-1'>{item.price} 
                       <CurrencyIcon type="primary" />
                     </p>
                     <p>{item.name}</p>
                  </div>
               ))}
            </section>
         </main>
      </li>
   );
};

export default BurgerIngredients;

