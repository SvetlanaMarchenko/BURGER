import { useDrag, DragPreviewImage } from 'react-dnd';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { Ingredient } from '../../utils/types/ingredients';
import { RootState } from '../../services/store';
import { useAppSelector } from '../../utils/types/hook';

export interface IngredientItemProps {
  item: Ingredient;
  onClick: (item: Ingredient) => void;
}

const IngredientItem: React.FC<IngredientItemProps> = ({ item, onClick }) => {
  const ingredientsInConstructor = useAppSelector((state: RootState) => state.burgerConstructor.ingredients);
  const bunInConstructor = useAppSelector((state: RootState) => state.burgerConstructor.bun);

  const ingredientInConstructorCount = item.type === 'bun'
    ? (bunInConstructor && bunInConstructor._id === item._id ? 1 : 0)
    : ingredientsInConstructor.filter(ingredient => ingredient._id === item._id).length;

  const [{ isDragging }, dragRef, preview] = useDrag(() => ({
    type: 'item',
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleClick = () => {
    onClick(item);
  };

  return (
    <>
      {!isDragging && (
        <div
          key={item._id}
          className={`${styles.ingredientsItem} text text_type_main-small ml-4`}
          onClick={handleClick}
        >
          {ingredientInConstructorCount > 0 && (
            <Counter
              count={ingredientInConstructorCount}
              size="default"
              extraClass={styles.counterTopRight}
            />
          )}

          <DragPreviewImage connect={preview} src={item.image} />
          <div ref={dragRef} className="ml-4 mb-1 mr-4 mt-6">
            <img src={item.image} alt={item.name} />
          </div>

          <p className={`${styles.priceItem} mb-1 text text_type_digits-default`}>
            {item.price}
            <CurrencyIcon type="primary" />
          </p>

          <p>{item.name}</p>
        </div>
      )}
    </>
  );
};

export default IngredientItem;
