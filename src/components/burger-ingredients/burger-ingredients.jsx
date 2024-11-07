import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom'; 
import styles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details'; 
import { addIngredient } from '../../services/actions/constructor-actions'; 
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataIngredients } from '../../services/actions/ingredients-actions';
import { useDrag } from "react-dnd";

const BurgerIngredients = () => {
   const [current, setCurrent] = useState('Булки');
   const [selectedIngredient, setSelectedIngredient] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const dispatch = useDispatch();

   const { allIngredients = [], isLoading, error } = useSelector((state) => state.ingredients || {});

   useEffect(() => {
      dispatch(fetchDataIngredients());
   }, [dispatch]);

   const filterIngredientsByType = (type) => {
      return allIngredients.filter((item) => item.type === type);
   };

   const [, dragRef] = useDrag({
      type: "ingredient",
      item: allIngredients.id ,
   })


   const bunsRef = useRef(null);
   const saucesRef = useRef(null);
   const mainsRef = useRef(null);

   const ingredientTypes = [
      { type: 'bun', value: 'Булки' },
      { type: 'sauce', value: 'Соусы' },
      { type: 'main', value: 'Начинки' }
   ];

   const openModal = (ingredient) => {
      setSelectedIngredient(ingredient);
      setIsModalOpen(true);
   };

   const closeModal = () => {
      setIsModalOpen(false);
      setSelectedIngredient(null);
   };

   const handleAddIngredient = (ingredient) => {
      dispatch(addIngredient(ingredient));
   };

   const handleScroll = () => {
      const bunsTop = bunsRef.current.getBoundingClientRect().top;
      const saucesTop = saucesRef.current.getBoundingClientRect().top;
      const mainsTop = mainsRef.current.getBoundingClientRect().top;

      const bunsOffset = 400; // Уберите "px"
   
      if (bunsTop <= bunsOffset && saucesTop > bunsOffset) {
         setCurrent('Булки');
      } else if (saucesTop <= bunsOffset && mainsTop > bunsOffset) {
         setCurrent('Соусы');
      } else if (mainsTop <= bunsOffset) {
         setCurrent('Начинки');
      }
   };

   if (isLoading) return <p>Загрузка Элементов...</p>;
   if (error) return <p>Хм... Ошибка: {error}</p>;
   return (
      <div className={`${styles.ingredientsSection} mt-10`}>
         <h1 className={`${styles.mainTitle} text text_type_main-large mt-10`}>Соберите бургер</h1>
         <div className={`${styles.tabBar} mt-5`}>
            {ingredientTypes.map(({ value }) => (
               <Tab key={value} value={value} active={current === value} onClick={() => setCurrent(value)}>
                  {value}
               </Tab>
            ))}
         </div>

         <main className={styles.scrollContainer} onScroll={handleScroll}>
            {ingredientTypes.map(({ type, value }) => (
               <section ref={type === 'bun' ? bunsRef : type === 'sauce' ? saucesRef : mainsRef} key={type} className={`${styles.ingredientsSection} mt-10`}>
                  <h2 className={`${styles.mainTitle}`}>{value}</h2>
                  <div className={`${styles.ingredientsList}`}>
                     {filterIngredientsByType(type).map((item, index) => (
                        <div ref={dragRef} key={item._id} className={`${styles.ingredientsItem} text text_type_main-small ml-4`} onClick={() => {
                           handleAddIngredient(item);
                           openModal(item);
                        }}>
                           {index === 0 && (
                              <Counter count={1} size="default" extraClass={`${styles.counterTopRight}`} color="white" />
                           )}
                           <img src={item.image} alt={item.name} className="ml-4 mb-1 mr-4 mt-6" />
                           <p className={`${styles.priceItem} mb-1 text text_type_digits-default`}>
                              {item.price}
                              <CurrencyIcon type="primary" />
                           </p>
                           <p>{item.name}</p>
                        </div>
                     ))}
                  </div>
               </section>
            ))}
         </main>

         {isModalOpen && selectedIngredient && createPortal(
            <Modal onClose={closeModal}>
               <IngredientDetails item={selectedIngredient} onClose={closeModal} />
            </Modal>,
            document.getElementById('modal-root')
         )}
      </div>
   );
};

export default BurgerIngredients;
