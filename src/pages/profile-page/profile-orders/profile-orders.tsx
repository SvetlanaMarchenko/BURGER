import styles from './profile-orders.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'; // Убедитесь, что этот компонент импортирован
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../services/store';
import { fetchDataIngredients } from '../../../services/actions/ingredients-actions';
import NavigationProfilePage from '../navigation-profile-page';

export function ProfileOrders() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataIngredients());
  }, [dispatch]);

  const maxIngredientsInRow = 6;

  const orders = useSelector((state: RootState) => {
    const ingredientLib = state.ingredients.allIngredients;
    const rawOrders = state.wsReducer.orders;

    const fullOrders = rawOrders?.map(order => ({
      ...order,
      ingredients: order.ingredients
        ?.map(id => ingredientLib.find(ingredient => ingredient?._id === id))
        .filter(Boolean),
    }));

    return fullOrders?.map(order => {
      const orderPrice = order.ingredients.reduce((total, ingredient) => total + (ingredient?.price || 0), 0);
      return {
        ...order,
        fullOrderPrice: orderPrice,
        ingredientsToShow: order.ingredients.slice(0, maxIngredientsInRow),
        extraIngredients: Math.max(order.ingredients.length - maxIngredientsInRow, 0),
      };
    });
  });

  const wsConnected = useSelector((state: RootState) => state.wsReducer.wsConnected);
  const total = useSelector((state: RootState) => state.wsReducer.total);
  const totalToday = useSelector((state: RootState) => state.wsReducer.totalToday);

  const startWebSocket = () => {
    if (!wsConnected) {
      dispatch({ type: 'WS_CONNECTION_START' });
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    // Получение прокрутки
    console.log('Scrolled:', event.currentTarget.scrollTop);
  };

  return (
    <div className={`${styles.profileOrder}`}>
            <NavigationProfilePage />
      {!wsConnected && <button onClick={startWebSocket}>Start WebSocket</button>}
        <div className={`${styles.ingredientsBox}`}>
          <div className={`${styles.ingredientsSection} mt-10`}>

            <div className={`${styles.burgerBar} mt-6`} />

            <main className={styles.scrollContainer} onScroll={handleScroll}>
            {orders?.length > 0 ? (
              <section className={`${styles.orderSection} mb-6`}>
              <div className={`${styles.orderNumber}`}>
                <h1 className="text text_type_digits-default mb-6">
                  # {orders[0].number}
                </h1> 

                <div
                  className="text text_type_main-default text_color_inactive">
                  {orders[0].createdAt}
                </div>
              </div>

                <h1 className={`${styles.orderName} text text_type_main-medium mb-2`}>
                        {/* alt={selectedData.name} */}
                        {orders[0].name}
                </h1>
                <h1 className={`${styles.statusOrder} text text_type_main-default mb-6`}>Выполнен</h1>


                <section className={`${styles.orderResult}`}>


                <div className={`${styles.orderListAndCost}`}>
                {orders[0].ingredientsToShow.map((ingredient, index) => (
                  <div key={index}>
                    <img
                        src={ingredient?.image}
                        className={orders[0].extraIngredients > 0 && index === 5 ? styles.blurImage: styles.orderImage}  // Применяем styles.blur если условие верно
                        alt="Ингредиент"
                        />
                  </div>
                ))}
                {orders[0].extraIngredients > 0 && (
                  <div className={styles.extraIngredients}>+{orders[0].extraIngredients}</div>
                )}
              </div>

                <p className="text text_type_digits-default">
                    {orders[0].fullOrderPrice}
                </p>
                <CurrencyIcon type="primary" className="ml-2" />
                </section>
              </section>
            ) : (
              <p>Загрузка заказов...</p>
            )}
            </main>
          </div>
        </div>
    </div>
  );
}
