import { useState, useEffect, useRef } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataIngredients, fetchDataIngredientsAndSetCurrent } from '../../services/actions/ingredients-actions';
import IngredientItem from './ingredient-item.jsx';
import { setCurrentIngredient } from '../../services/actions/current-ingredient-actions';
import PropTypes from 'prop-types';
import { IngredientType } from '../../utils/types';
import {useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('Булки');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); 

  const { allIngredients = [], isLoading, error } = useSelector((state) => state.ingredients || {});
  

  useEffect(() => {
    if( location.pathname.startsWith('/ingredients/') && id ) {
      dispatch(fetchDataIngredientsAndSetCurrent())
      
    } else {
      dispatch(fetchDataIngredients());
    }
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

  const openModal = (item) => {
    dispatch(setCurrentIngredient(item));
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

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

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
          <section
            ref={type === 'bun' ? bunsRef : type === 'sauce' ? saucesRef : mainsRef}
            key={type}
            className={`${styles.ingredientsSection} mt-10`}
          >
            <h2 className={`${styles.mainTitle}`}>{value}</h2>
            <div className={`${styles.ingredientsList}`}>
              {filterIngredientsByType(type).map((item) => (
                <IngredientItem
                  key={item._id}
                  item={item}
                  onClick={() => {
                    navigate(`/ingredients/${item._id}`, {state: {backgroundLocation: '/'}})
                    return openModal(item)
                  }}
                />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientType),
};

export default BurgerIngredients;
