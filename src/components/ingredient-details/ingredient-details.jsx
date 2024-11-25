import { Link } from 'react-router-dom';
import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const IngredientDetails = () => {
  const selectedData = useSelector(
    (a) => a.currentIngredient // Получаем текущий ингредиент из Redux
  );
  const location = useLocation(); // Получаем текущую локацию
  console.log(`selectedData`, selectedData)

  if (!selectedData) {
    return <p>Загрузка...</p>; // Если данных нет, можно отобразить сообщение
  }

  return (
    <Link
      to={`/ingredients/${selectedData._id}`} // Путь к детальной странице ингредиента
    >
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
          <div className={styles.nutritionFact}>
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
    </Link>
  );
};

export default IngredientDetails;
