import React from 'react';
import styles from './ingredient-details.module.css'
import { Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredients from '../utils/ingredients-info.json'



const BurgerIngredients =()=> {
   const [current, setCurrent] = React.useState('Булки')

   // const filterIngredientsByThemType = () => {
   //    return ingredients.filter((i) => i.type === type)
   // }

   return (
      <li className={styles.ingredientsSection}>
         <h1 className="m-15">
            Соберите бургер
         </h1>
         <div style={{ display: 'flex' }}>
            <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
               Булки
            </Tab>
            <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
               Соусы
            </Tab>
            <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
               Начинки
            </Tab>
         </div>

         <main>
            <h2 className={styles.mainName}>Булки</h2>
            {/* <section>
               {filterIngredientsByThemType.map((item) => (
               <div key={item._id} className={styles.ingredientItem}>
               <img src={item.image} alt={item.name} className={styles.ingredientImage} />
               <p>{item.name}</p>
               </div>
            ))}
            </section> */}

         </main>



      </li>

      
    
   )

}

export default BurgerIngredients

