import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom'; 
import styles from './burger-ingredients.module.css';
import { Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details'; 
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataIngredients } from '../../services/actions/ingredients-actions';
import IngredientItem from './ingredient-item.jsx';
import PropTypes from 'prop-types';

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

   const handleScroll = () => {
      const bunsTop = bunsRef.current.getBoundingClientRect().top;
      const saucesTop = saucesRef.current.getBoundingClientRect().top;
      const mainsTop = mainsRef.current.getBoundingClientRect().top;

      const bunsOffset = 400;
   
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
                        <IngredientItem
                        key={item._id}
                        item={item}
                        index={index}
                        onClick={() => openModal(item)}
                     />
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

BurgerIngredients.propTypes = {
   ingredients: PropTypes.arrayOf(
     PropTypes.shape({
       _id: PropTypes.string.isRequired,  
       name: PropTypes.string.isRequired,
       price: PropTypes.number.isRequired,
       type: PropTypes.string.isRequired,
     })
   )
 };

export default BurgerIngredients;



