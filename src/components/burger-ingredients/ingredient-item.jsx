import React from 'react';
import { useDrag, DragPreviewImage } from 'react-dnd';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';

const IngredientItem = ({ item, index, onClick }) => {
   const [{ isDrag}, dragRef, preview] = useDrag({
      type: "ingredient",
      item: { id: item._id },
      collect: (monitor) => ({
         isDragging: monitor.isDragging(),
      }),
   });

   return (
      !isDrag && (
         <div
            key={item._id}
            className={`${styles.ingredientsItem} text text_type_main-small ml-4`}
            onClick={onClick}
         >
            {index === 0 && (
               <Counter count={1} size="default" extraClass={`${styles.counterTopRight}`} color="white" />
            )}
            <DragPreviewImage connect={preview} src={item.image} />
            <img ref={dragRef} src={item.image} alt={item.name} className="ml-4 mb-1 mr-4 mt-6" />

            <p className={`${styles.priceItem} mb-1 text text_type_digits-default`}>
               {item.price}
               <CurrencyIcon type="primary" />
            </p>
            <p>{item.name}</p>
         </div>
      )
   );
};

export default IngredientItem;
