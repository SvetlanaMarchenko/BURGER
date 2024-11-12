import React from 'react';
import styles from './ingredient-details.module.css';

const IngredientDetails = ({ item }) => {
   return (
      <section className={styles.ingredientsDetailsMain}>
         <div> 
            <div className={`${styles.titleIngredientDetails} mt-10 mr-10 ml-10`}>
               <p className={`${styles.titleMain} text text_type_main-large`}>Детали ингредиента </p>
            </div>
            <div className={`${styles.mainIngredientDetails}`}>
            <img className={`${styles.imgDetails} text text_type_main-large`} src={item.image} alt={item.name}/>
            <p className={`${styles.orderDetailsID} mt-4 mb-8 text text_type_main-medium`}>{item.name}</p>
            </div>
         </div>

         <div className={`${styles.orderNutrition} mb-15 text text_type_main-default text_color_inactive `}>
            <div className={styles.nutritionFact}>
               <p>Калории,ккал</p>
               <p className="text text_type_digits-default">{item.calories}</p>
            </div>
            <div className={styles.nutritionFact}>
               <p>Белки, г</p>
               <p className="text text_type_digits-default">{item.proteins}</p>
            </div>
            <div className={styles.nutritionFact}>
               <p>Жиры, г</p>
               <p className="text text_type_digits-default">{item.fat}</p>
            </div>
            <div className={styles.nutritionFact}>
               <p>Углеводы, г</p>
               <p className="text text_type_digits-default">{item.carbohydrates}</p>
            </div>
         </div>
      </section>
   );
};

export default IngredientDetails;
