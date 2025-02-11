import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { fetchDataIngredientsAndSetCurrent } from '../../services/actions/ingredients-actions';
import style from './ingredients-id-page.module.css';
import { useAppDispatch } from '../../utils/types/hook';


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
