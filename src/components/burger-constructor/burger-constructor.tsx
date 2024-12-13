import { useState, useMemo } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient, setBun, removeBun, removeIngredient, replaceIngredient } from '../../services/actions/constructor-actions';
import { useDrop, useDrag } from 'react-dnd';
import { createOrder } from '../../services/actions/order-actions'; 
import { useNavigate } from 'react-router-dom'; 
import { Ingredient} from '../../utils/types/ingredients';
import { RootState, AppDispatch } from '../../services/store';


interface DraggableIngredientProps {
  ingredient: Ingredient; 
  index: number; 
  moveIngredient: (fromIndex: number, toIndex: number) => void; 
  removeIngredient: (index: number) => void; 
}


const DraggableIngredient: React.FC<DraggableIngredientProps> = ({ ingredient, index, moveIngredient, removeIngredient }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'ingredient',
    item: { type: 'ingredient', index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'ingredient',
    drop: (item: { type: string; index: number }) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex !== hoverIndex) {
        moveIngredient(dragIndex, hoverIndex);
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`${styles.constructorElementBlock} ${isDragging ? styles.dragging : ''}`}
    >
      <div className={styles.dragIconWrapper}>
        <DragIcon type="primary"  />
      </div>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => removeIngredient(index)}
      />
    </div>
  );
};

const BurgerConstructor: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { bun, ingredients } = useSelector((state: RootState) => state.burgerConstructor);
  const dispatch: AppDispatch = useDispatch();

  const moveIngredient = (fromIndex: number, toIndex: number) => {
    if (fromIndex !== toIndex) {
      dispatch(replaceIngredient(fromIndex, toIndex));
    }
  };

  const [{ isOver: boolean },dropTarget] = useDrop({
    accept: 'item',
    drop: (item: Ingredient) => {
      if (item.type === 'bun') {
        if (bun) dispatch(removeBun());
        dispatch(setBun(item));
      } else {
        dispatch(addIngredient(item));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleRemoveIngredient = (index: number) => {
    dispatch(removeIngredient(index));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const totalPrice = useMemo(() => {
    return (bun ? bun.price * 2 : 0) + ingredients.reduce((sum, item) => sum + item.price, 0);
  }, [bun, ingredients]);

  const handleCreateOrder = () => {
    const token = localStorage.getItem('accessToken');
  
    if (!token) {
      navigate('/login');
      return;
    }

    const ingredientId: Ingredient[] = [bun, ...ingredients].filter((item): item is Ingredient => item != null);

    dispatch(createOrder(ingredientId)); 
    openModal(); 
  };

  return (
    <div ref={dropTarget} className={`${styles.ingredientConstructor} mt-25 ml-10 mr-4`}>
      <div className={`${styles.constructorElementBlock} ml-8`}>
        {bun ? (
          <ConstructorElement
            key="top-bun"
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        ) : (
          <div className={`${styles.emptyBunWrapper} ${styles.constructorElementBlock}`}>

            <ConstructorElement 
              type="top" 
              text="Выберите булку" 
              isLocked={true} 
              price={0}
              thumbnail=""
            />
          </div>
        )}
      </div>

      <div className={styles.innerIngredients}>
        {ingredients.length > 0 ? (
          ingredients.map((ingredient, index) => (
            <DraggableIngredient
              key={ingredient.key}
              index={index}
              ingredient={ingredient}
              moveIngredient={moveIngredient}
              removeIngredient={() => handleRemoveIngredient(index)}
            />
          ))
        ) : (
        <div className={`${styles.emptyIngredientWrapper} ml-8 ${styles.emptyBunWrapper} text text_type_main-default`}>
          <ConstructorElement
            text="Выберите начинку"
            price={0}
            thumbnail=""
          />
        </div>
        )}
      </div>

      <div className={`${styles.constructorElementBlock} ml-8`}>
        {bun ? (
          <ConstructorElement
            key="bottom-bun"
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        ) : (
          <div className={`${styles.emptyBunWrapper} ${styles.constructorElementBlock}`}>
            <ConstructorElement type="bottom" text="Выберите булку" isLocked={true} price={0} thumbnail=""/>
          </div>
        )}
      </div>

      <section className={`${styles.priceOrder} mt-10`}>
        <p className="text text_type_digits-medium">{totalPrice}</p>
        <CurrencyIcon type="primary" className="mr-10" />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={handleCreateOrder} 
        >
          Оформить заказ
        </Button>
      </section>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
