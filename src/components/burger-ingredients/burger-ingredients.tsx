import { useState, useEffect, useRef } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { fetchDataIngredients, fetchDataIngredientsAndSetCurrent } from '../../services/actions/ingredients-actions';
import IngredientItem from './ingredient-item.jsx';
import { setCurrentIngredient } from '../../services/actions/current-ingredient-actions';
import {useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import { Ingredient } from '../../utils/types/ingredients';
import { RootState } from '../../services/store';
import { useAppDispatch, useAppSelector } from '../../utils/types/hook';

  const BurgerIngredients: React.FC = () => {
  const [current, setCurrent] = useState('Булки');
  const dispatch =  useAppDispatch ();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); 

  const { allIngredients = [], isLoading, error } = useAppSelector((state: RootState) => state.ingredients || {});

  const bunsRef = useRef<HTMLDivElement | null>(null);
  const saucesRef = useRef<HTMLDivElement | null>(null);
  const mainsRef = useRef<HTMLDivElement | null>(null);
  

  useEffect(() => {
    if( location.pathname.startsWith('/ingredients/') && id ) {
      dispatch(fetchDataIngredientsAndSetCurrent(id))
      
    } else {
      dispatch(fetchDataIngredients());
    }
  }, [dispatch]);

  const filterIngredientsByType = (type: string) => {
    return allIngredients.filter((item: Ingredient) => item.type === type);
  };

  const ingredientTypes = [
    { type: 'bun', value: 'Булки' },
    { type: 'sauce', value: 'Соусы' },
    { type: 'main', value: 'Начинки' }
  ];

  const openModal = (item: Ingredient) => {
    dispatch(setCurrentIngredient(item));
  };
  const handleScroll = () => {
    const bunsTop = bunsRef.current?.getBoundingClientRect().top ?? 0; 
    const saucesTop = saucesRef.current?.getBoundingClientRect().top ?? 0;
    const mainsTop = mainsRef.current?.getBoundingClientRect().top ?? 0;

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
              {filterIngredientsByType(type).map((item: Ingredient) => (
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

export default BurgerIngredients;
