



import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

const IngredientsIdPage = () => {
  const { id } = useParams();  

//   import { fetchDataIngredients } from '../../services/actions/ingredients-actions';
// import IngredientItem from './ingredient-item.jsx';
// import { setCurrentIngredient, clearCurrentIngredient } from '../../services/actions/current-ingredient-actions';
// import PropTypes from 'prop-types';
// import { IngredientType } from '../../utils/types';

// const BurgerIngredients = () => {
//   const [current, setCurrent] = useState('Булки');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const dispatch = useDispatch();

//   const { allIngredients = [], isLoading, error } = useSelector((state) => state.ingredients || {});
//   const selectedData = useSelector((state) => state.currentIngredient); // Получаем текущий ингредиент из Redux

//   useEffect(() => {
//     dispatch(fetchDataIngredients()); // Загрузка ингредиентов
//   }, [dispatch]);

  return (
    <div>
      <IngredientDetails/>
      <h2>Детали ингредиента</h2>
      <p>Ингредиент с ID: {id}</p>


    </div>
  );
};

export default IngredientsIdPage;  
