import { useState, useMemo } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient, setBun, removeBun, removeIngredient, replaceIngredient } from '../../services/actions/constructor-actions';
import { useDrop, useDrag } from 'react-dnd';
import { createOrder } from '../../services/actions/order-actions'; // Импортируем createOrder для работы с заказами
import PropTypes from 'prop-types';
import { IngredientType } from '../../utils/types';
import { useNavigate } from 'react-router-dom'; // Для редиректа на страницу логина

const DraggableIngredient = ({ ingredient, index, moveIngredient, removeIngredient }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'ingredient',
    item: { type: 'ingredient', index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
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
        <DragIcon />
      </div>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => removeIngredient()}
      />
    </div>
  );
};

const BurgerConstructor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Для перенаправления на страницу логина
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);

  const moveIngredient = (fromIndex, toIndex) => {
    if (fromIndex !== toIndex) {
      dispatch(replaceIngredient(fromIndex, toIndex));
    }
  };

  const [{ isOver }, dropTarget] = useDrop({
    accept: 'item',
    drop: (item) => {
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

  const handleRemoveIngredient = (index) => {
    dispatch(removeIngredient(index));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const totalPrice = useMemo(() => {
    return (bun ? bun.price * 2 : 0) + ingredients.reduce((sum, item) => sum + item.price, 0);
  }, [bun, ingredients]);

  const handleCreateOrder = () => {
    const token = localStorage.getItem('accessToken'); // Получаем токен из localStorage

    if (!token) {
      navigate('/login'); // Если токен отсутствует, перенаправляем на страницу логина
      return;
    }

    const ingredientId = [bun?._id, ...ingredients.map(item => item._id)].filter(id => id);
    dispatch(createOrder(ingredientId)); // Создаём заказ
    openModal(); // Открываем модалку с деталями заказа
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
            <ConstructorElement type="top" text="Выберите булку" isLocked={true} />
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
            <ConstructorElement text="Выберите начинку" />
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
            <ConstructorElement type="bottom" text="Выберите булку" isLocked={true} />
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
          onClick={handleCreateOrder} // Вызов обработчика создания заказа
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

BurgerConstructor.propTypes = {
  bun: PropTypes.arrayOf(IngredientType),
  ingredients: PropTypes.arrayOf(IngredientType),
  isModalOpen: PropTypes.bool,
  handleRemoveIngredient: PropTypes.func,
  handleClearConstructor: PropTypes.func,
};

export default BurgerConstructor;
