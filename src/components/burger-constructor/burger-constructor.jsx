import React, { useState, useMemo } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient, setBun, removeBun, removeIngredient, clearConstructor, replaceIngredient } from '../../services/actions/constructor-actions';
import { useDrop, useDrag } from 'react-dnd';
import { createOrder } from '../../services/actions/order-actions';
import PropTypes from 'prop-types';

// Компонент для перетаскивания ингредиентов
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
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      // Если индексы не одинаковые, выполняем перетаскивание
      if (dragIndex !== hoverIndex) {
        moveIngredient(dragIndex, hoverIndex);
        item.index = hoverIndex;  // Обновляем индекс перетаскиваемого элемента
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
        handleClose={() => removeIngredient(ingredient._id)} // Удалить при нажатии
      />
    </div>
  );
};

const BurgerConstructor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);

  // Функция для перемещения ингредиентов
  const moveIngredient = (dragIndex, hoverIndex) => {
    if (hoverIndex !== null) {
      dispatch(replaceIngredient(dragIndex, hoverIndex));
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

  const handleRemoveIngredient = (ingredientId) => {
    dispatch(removeIngredient(ingredientId));
  };

  const handleClearConstructor = () => {
    dispatch(clearConstructor());
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const totalPrice = useMemo(() => {
    return (bun ? bun.price * 2 : 0) + ingredients.reduce((sum, item) => sum + item.price, 0);
  }, [bun, ingredients]);

  const handleCreateOrder = () => {
    const ingredientId = [bun?._id, ...ingredients.map(item => item._id)].filter(id => id);
    dispatch(createOrder(ingredientId));
    openModal();
  };

  return (
    <div ref={dropTarget} className={`${styles.ingredientConstructor} mt-25 ml-10 mr-4`}>
      {/* Булка сверху */}
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

      {/* Список ингредиентов */}
      <div className={styles.innerIngredients}>
        {ingredients.length > 0 ? (
          ingredients.map((ingredient, index) => (
            <DraggableIngredient
              key={ingredient.key}
              index={index}
              ingredient={ingredient}
              moveIngredient={moveIngredient}
              removeIngredient={() => handleRemoveIngredient(ingredient._id)}
            />
          ))
        ) : (
          <div className={`${styles.emptyIngredientWrapper} ml-8 ${styles.emptyBunWrapper}  text text_type_main-default`}>
            <ConstructorElement text="Выберите начинку" />
          </div>
        )}
      </div>

      {/* Булка снизу */}
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
          <div className={`${styles.emptyBunWrapper}  ${styles.constructorElementBlock}`}>
            <ConstructorElement type="bottom" text="Выберите булку" isLocked={true} />
          </div>
        )}
      </div>

      {/* Прайс и кнопка оформления заказа */}
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

      {/* Кнопка очистки конструктора */}
      <button onClick={handleClearConstructor} className="mt-4">
        Очистить конструктор
      </button>

      {/* Модалка с деталями заказа */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};

BurgerConstructor.propTypes = {
  bun: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),  // `bun` может быть null или объектом, так что он не обязателен

  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired, // Массив ингредиентов обязательный

  isModalOpen: PropTypes.bool, // Модальное окно может быть открытым или закрытым
  handleRemoveIngredient: PropTypes.func,
  handleClearConstructor: PropTypes.func
};


export default BurgerConstructor;
