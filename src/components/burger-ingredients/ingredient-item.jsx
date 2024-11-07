import React from 'react';
import { useDrag } from 'react-dnd';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';

const IngredientItem = ({ item, index, onClick }) => {
   const [, dragRef] = useDrag({
      type: "ingredient",
      item: { id: item._id },
   });

   return (
      <div
         key={item._id}
         className={`${styles.ingredientsItem} text text_type_main-small ml-4`}
         onClick={onClick}
      >
         {index === 0 && (
            <Counter count={1} size="default" extraClass={`${styles.counterTopRight}`} color="white" />
         )}
           <img ref={dragRef} src={item.image} alt={item.name} className={`${styles.backgroundImgColor} ml-4 mb-1 mr-4 mt-6`}/>

         <p className={`${styles.priceItem} mb-1 text text_type_digits-default`}>
            {item.price}
            <CurrencyIcon type="primary" />
         </p>
         <p>{item.name}</p>
      </div>
   );
};

export default IngredientItem;



// import React from 'react';
// import { useDrag, DragPreviewImage } from 'react-dnd';
// import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
// import styles from './burger-ingredients.module.css';

// const IngredientItem = ({ item, index, onClick }) => {
//    const [{ isDragging }, dragRef, preview] = useDrag({
//       type: "ingredient",
//       item: { id: item._id },
//       collect: (monitor) => ({
//          isDragging: monitor.isDragging(),
//       }),
//    });

//    return (
//       <div
//          key={item._id}
//          className={`${styles.ingredientsItem} text text_type_main-small ml-4`}
//          onClick={onClick}
//          ref={dragRef}
//       >
//          {index === 0 && (
//             <Counter count={1} size="default" extraClass={`${styles.counterTopRight}`} color="white" />
//          )}
//          <DragPreviewImage connect={preview} src={item.image} />

//          <div className={`${styles.backgroundImgColor} ml-4 mb-1 mr-4 mt-6`}>
//             <img src={item.image} alt={item.name} />
//          </div>
         
//          <p className={`${styles.priceItem} mb-1 text text_type_digits-default`}>
//             {item.price}
//             <CurrencyIcon type="primary" />
//          </p>
//          <p>{item.name}</p>
//       </div>
//    );
// };

// export default IngredientItem;


