import { useEffect } from 'react';
import styles from './profile-orders.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { Order } from '../../../utils/types/orders';
import { WS_PERS_CONNECTION_START } from '../../../services/actions/ws-personal-action-types';
import { Ingredient } from '../../../utils/types/ingredients';
import { RootState } from '../../../services/store';
import NavigationProfilePage from '../profile-page/navigation-profile-page';
import { RawOrder } from '../../../utils/types/raw-orders';
import { createSelector } from 'reselect';
import { useAppDispatch, useAppSelector } from '../../../utils/types/hook';

export function ProfileOrders() {
  const maxIngredientsInRow = 6;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const orders = useAppSelector(createSelector(
    [
      (state: RootState) => state.wsPersonalReducer.orders || [], 
      (state: RootState) => state.ingredients.allIngredients 
    ],
    (rawOrders, ingredientLib) => {
      return rawOrders.map((order: RawOrder) => {
        const ingredients = order.ingredients
          ?.map((id) => ingredientLib.find((ingredient) => ingredient?._id === id))
          .filter(Boolean) as Ingredient[];
  
        const orderPrice = ingredients.reduce((total, ingredient) => total + (ingredient?.price || 0), 0);
  
        const ingredientCountMap = ingredients.reduce((acc, ingredient) => {
          const id = ingredient?._id;
          if (id) {
            acc[id] = (acc[id] || 0) + 1;
          }
          return acc;
        }, {} as Record<string, number>);
  
        return {
          ...order,
          ingredients,
          fullOrderPrice: orderPrice,
          ingredientCounter: ingredientCountMap,
          ingredientsToShow: ingredients.slice(0, maxIngredientsInRow),
          extraIngredients: Math.max(ingredients.length - maxIngredientsInRow, 0),
        };
      });
    }
  ));

  useEffect(() => {
    dispatch({ type: WS_PERS_CONNECTION_START });
    return function cleanup() {
      dispatch({ type: 'WS_PERS_CONNECTION_CLOSE' });
    };
  }, [location.pathname, dispatch]);

  const handleOrderClick = (order: Order) => {
    navigate(`/profile/orders/${order.number}`, { state: { backgroundLocation: location } });
  };

  const renderIngredients = (order: Order) => {
    return order.ingredientsToShow.map((ingredient: Ingredient, index: number) => (
      <div
        key={index}
        className={`${styles.orderImageWrapper} ${
          index === maxIngredientsInRow - 1 && order.extraIngredients > 0
            ? styles.blurImageWrapper
            : ''
        }`}
      >
        <img
          src={ingredient?.image}
          className={order.extraIngredients > 0 && index === 5 ? styles.blurImage : styles.orderImage}
          alt="Ингредиент"
        />
        {index === maxIngredientsInRow - 1 && order.extraIngredients > 0 && (
          <div className={styles.extraIngredients}>+{order.extraIngredients}</div>
        )}
      </div>
    ));
  };

  return (
    <div className={styles.profileOrder}>
      <NavigationProfilePage />
      <div className={styles.ingredientsBox}>
        <div className={`${styles.ingredientsSection} mt-10`}>
          <main className={styles.scrollContainer}>
            {orders?.length > 0 ? (
              orders.map((order) => (
                <section
                  key={order.number}
                  className={`${styles.orderSection} mb-6`}
                  onClick={() => handleOrderClick(order)}
                  
                >
                  <div className={styles.orderNumber}>
                    <p className="text text_type_digits-default mb-6"># {order.number}</p>
                    <FormattedDate
                      className="text text_type_main-default text_color_inactive"
                      date={new Date(order.createdAt)}
                    />
                  </div>

                  <h2 className={`${styles.orderName} text text_type_main-medium mb-2`}>
                    {order.name}
                  </h2>
                  <p className={`${styles.statusOrder} text text_type_main-default mb-6`}>
                    {order.status === 'done' ? 'Выполнен' : 'В процессе'}
                  </p>

                  <div className={styles.orderResult}>
                    <div className={styles.orderListAndCost}>{renderIngredients(order)}</div>
                    <div className={`${styles.priceOrder} text text_type_digits-default`}>
                      {order.fullOrderPrice}&nbsp;<CurrencyIcon type="primary" />
                    </div>
                  </div>
                </section>
              ))
            ) : (
              <p className="text text_type_main-medium">Загрузка заказов...</p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

