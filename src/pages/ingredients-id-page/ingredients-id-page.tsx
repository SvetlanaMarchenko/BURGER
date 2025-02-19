import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import style from './ingredients-id-page.module.css';
import { useAppDispatch } from '../../utils/types/hook';
import { fetchDataIngredientsAndSetCurrent } from '../../services/actions/data-ingredients';


const IngredientsIdPage = () => {
  const { id } = useParams<{ id: string }>();  
  const dispatch =  useAppDispatch ();

  useEffect(() => {
    if (id) {
      dispatch(fetchDataIngredientsAndSetCurrent(id));
    }
  }, [dispatch, id]);

  return (
    <div className={style.appLayout}>
      <div className={style.postModalIngredientDetails}>
        <IngredientDetails />
      </div>
    </div>
  );
};

export default IngredientsIdPage;
