
import { useAppSelector } from '../../utils/types/hook';
import styles from './ingredient-details.module.css';

const IngredientDetails = () => {
  // eslint-disable-next-line no-undef
  const selectedData = useAppSelector(
    (a) => a.currentIngredient
  );
  if (!selectedData) {
    return <p>Загрузка...</p>;
  }

  return (
      <section className={styles.ingredientsDetailsMain}>
        <div>
          <div className={`${styles.titleIngredientDetails} mt-10 mr-10 ml-10`}>
            <p className={`${styles.titleMain} text text_type_main-large`}>
              Детали ингредиента
            </p>
          </div>

          <div className={`${styles.mainIngredientDetails}`}>
            <img
              className={`${styles.imgDetails} text text_type_main-large`}
              src={selectedData.image}
              alt={selectedData.name}
            />
            <p className={`${styles.orderDetailsID} mt-4 mb-8 text text_type_main-medium`}>
              {selectedData.name}
            </p>
          </div>
        </div>

        <div className={`${styles.orderNutrition} mb-15 text text_type_main-default text_color_inactive`}>
          <div className={styles.nutritionFact} data-cy="nutrition-fact">
            <p>Калории, ккал</p>
            <p className="text text_type_digits-default">{selectedData.calories}</p>
          </div>
          <div className={styles.nutritionFact}>
            <p>Белки, г</p>
            <p className="text text_type_digits-default">{selectedData.proteins}</p>
          </div>
          <div className={styles.nutritionFact}>
            <p>Жиры, г</p>
            <p className="text text_type_digits-default">{selectedData.fat}</p>
          </div>
          <div className={styles.nutritionFact}>
            <p>Углеводы, г</p>
            <p className="text text_type_digits-default">{selectedData.carbohydrates}</p>
          </div>
        </div>
      </section>
  );
};

export default IngredientDetails;
