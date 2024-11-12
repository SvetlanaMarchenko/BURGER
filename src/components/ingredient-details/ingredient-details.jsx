import React, { useEffect } from 'react';
import styles from './ingredient-details.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentIngredient, fetchIngredient } from '../../services/actions/current-ingredient-actions';

const IngredientDetails = ({ onClose, ingredientId }) => {
   const dispatch = useDispatch();
   const { currentIngredient, loading, error } = useSelector((state) => state.currentIngredient);
    
   useEffect(() => {
      if (ingredientId) {
         dispatch(fetchIngredient(ingredientId)); 
      }
   }, [ingredientId, dispatch]);

   const handleClear = () => {
      dispatch(clearCurrentIngredient());
   };

   if (loading) {
     return <div>Загрузка... Ждем...</div>;
   }

   if (error) {
     return <div>Упс... Ошибка... {error.message}</div>;
   }

   if (!currentIngredient) {
      return null;
    }

   return (
      <section className={styles.ingredientsDetailsMain}>
         <div>
            <div className={`${styles.titleIngredientDetails} mt-10 mr-10 ml-10`}>
               <p className={`${styles.titleMain} text text_type_main-large`}>Детали ингредиента</p>
               <button
                  className={`${styles.buttonSet}`}
                  onClick={() => { 
                    dispatch(fetchIngredient(ingredientId)),
                    console.log("ingredientId")
                    onClose(); 
                    handleClear(); 
                  }}
               >
                  <CloseIcon type="primary" />
               </button>
            </div>
            <div className={`${styles.mainIngredientDetails}`}>
               <img
                  className={`${styles.imgDetails} text text_type_main-large`}
                  src={currentIngredient.image}
                  alt={currentIngredient.name}
               />
               <p className={`${styles.orderDetailsID} mt-4 mb-8 text text_type_main-medium`}>
                  {currentIngredient.name}
               </p>
            </div>
         </div>

         <div className={`${styles.orderNutrition} mb-15 text text_type_main-default text_color_inactive`}>
            <div className={styles.nutritionFact}>
               <p>Калории, ккал</p>
               <p className="text text_type_digits-default">{currentIngredient.calories}</p>
            </div>
            <div className={styles.nutritionFact}>
               <p>Белки, г</p>
               <p className="text text_type_digits-default">{currentIngredient.proteins}</p>
            </div>
            <div className={styles.nutritionFact}>
               <p>Жиры, г</p>
               <p className="text text_type_digits-default">{currentIngredient.fat}</p>
            </div>
            <div className={styles.nutritionFact}>
               <p>Углеводы, г</p>
               <p className="text text_type_digits-default">{currentIngredient.carbohydrates}</p>
            </div>
         </div>
      </section>
   );
};


IngredientDetails.propTypes = {
   onClose: PropTypes.func.isRequired,
   ingredientId: PropTypes.string.isRequired
 };
 

export default IngredientDetails;
