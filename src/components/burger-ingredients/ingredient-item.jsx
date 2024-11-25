import React from 'react';
import { useDrag, DragPreviewImage } from 'react-dnd';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import {useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { IngredientType } from '../../utils/types';

const IngredientItem = ({ item, onClick }) => {
  const ingredientsInConstructor = useSelector((state) => state.burgerConstructor.ingredients);
  const bunInConstructor = useSelector((state) => state.burgerConstructor.bun);
  
  const ingredientInConstructorCount = item.type === 'bun' 
    ? (bunInConstructor && bunInConstructor._id === item._id ? 1 : 0)
    : ingredientsInConstructor.filter(ingredient => ingredient._id === item._id).length;

  const [{ isDrag }, dragRef, preview] = useDrag({
    type: 'item',
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleClick = () => {
    onClick(item);  
  };

  return (
    <>
      {!isDrag && (
        <div
          key={item._id}
          className={`${styles.ingredientsItem} text text_type_main-small ml-4`}
          onClick={handleClick}
        >
          {ingredientInConstructorCount > 0 && (
            <Counter 
              count={ingredientInConstructorCount} 
              size="default" 
              extraClass={`${styles.counterTopRight}`} 
              color="white" 
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

IngredientItem.propTypes = {
  item: IngredientType,
  onClick: PropTypes.func
};

export default IngredientItem;
