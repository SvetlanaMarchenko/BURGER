import styles from './feed-number.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import useWebSocketOrders from '../../../services/use-ws-order-profile';

const FeedNumber = ({ orderNumber }: { orderNumber: any}) => {
  const { orders } = useWebSocketOrders(location.pathname);

  const order = orders?.find(o => o.number === parseInt(orderNumber));
  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    console.log('Scrolled:', event.currentTarget.scrollTop);
  };


  return (
    <div className={`${styles.moduleOrderLayout}`}> 
      <section className={`${styles.orderDetailsMain} mt-30`}>
        <h1 className={`${styles.orderNumber} text text_type_digits-default mb-10`}>
          # {order.number}
        </h1>
        <h1 className={`${styles.orderName} text text_type_main-medium mb-3`}>
          {order.name}
        </h1>
        <div className={`${styles.statusOrder} text text_type_main-default mb-15`}>
          {order.status === "done" && <div>Выполнен</div>}
          {order.status === "pending" && <div className={`${styles.statusOrderOther}`}>Готовится</div>}
          {order.status === "created" && <div className={`${styles.statusOrderOther}`}>Создан</div>}
        </div>
        <h1 className={`${styles.orderName} text text_type_main-medium mb-6`}>Состав:</h1>
      </section>

      <section className={`${styles.orderIngredientOptions} pr-6 mb-4`} onScroll={handleScroll}>
        {Array.from(
          new Map(
            order.ingredients.map((ingredient) => [ingredient._id, ingredient])
          ).values()
        ).map((ingredient, index) => (
          <div
            key={index}
            className={`${styles.orderIngredient} mb-4 text text_type_main-default`}
          >
            <div>
              <img
                src={ingredient?.image}
                className={`${styles.orderNumberImage} text text_type_main-default mr-4`}
                alt={ingredient?.name || "Ингредиент"}
              />
            </div>
            <div className={`${styles.orderIngredientName} text text_type_main-default`}>
              {ingredient?.name}
            </div>
            <div>
              <p className="text text_type_digits-default">
                {ingredient.price}
              </p>
            </div>
            <CurrencyIcon type="primary" className="ml-2" />
          </div>
        ))}
      </section>

      <section className={`mt-10 ${styles.orderResult}`}>
        <div
          className={`${styles.orderTime} text text_type_main-default text_color_inactive`}
        >
          {order.createdAt}
        </div>
        <p className="text text_type_digits-default">{order.fullOrderPrice}</p>
        <CurrencyIcon type="primary" className="ml-2" />
      </section>

          

      {/* {!wsConnected && <button onClick={startWebSocket}>Start WebSocket</button>}
      {orders?.length > 0 ? (
        <>
          <section className={`${styles.orderDetailsMain} mt-30`}>
            <h1 className={`${styles.orderNumber} text text_type_digits-default mb-10`}>
              # {order.number}
            </h1>
            <h1 className={`${styles.orderName} text text_type_main-medium mb-3`}>
              {order.name}
            </h1>
            <div className={`${styles.statusOrder} text text_type_main-default mb-15`}>
              {order.status === "done" && <div>Выполнен</div>}
              {order.status === "pending" && <div className={`${styles.statusOrderOther}`}>Готовится</div>}
              {order.status === "created" && <div className={`${styles.statusOrderOther}`}>Создан</div>}
            </div>
            <h1 className={`${styles.orderName} text text_type_main-medium mb-6`}>Состав:</h1>
          </section>

          <section className={`${styles.orderIngredientOptions} pr-6 mb-4`} onScroll={handleScroll}>
  {Array.from(
    new Map(
      order.ingredients.map((ingredient) => [ingredient._id, ingredient])
    ).values()
  ).map((ingredient, index) => (
    <div
      key={index}
      className={`${styles.orderIngredient} mb-4 text text_type_main-default`}
    >
      <div>
        <img
          src={ingredient?.image}
          className={`${styles.orderNumberImage} text text_type_main-default mr-4`}
          alt={ingredient?.name || "Ингредиент"}
        />
      </div>
      <div className={`${styles.orderIngredientName} text text_type_main-default`}>
        {ingredient?.name}
      </div>
      <div>
        <p className="text text_type_digits-default">
          {ingredient.price}
        </p>
      </div>
      <CurrencyIcon type="primary" className="ml-2" />
    </div>
  ))}
</section>


          <section className={`mt-10 ${styles.orderResult}`}>
            <div
              className={`${styles.orderTime} text text_type_main-default text_color_inactive`}
            >
              {order.createdAt}
            </div>
            <p className="text text_type_digits-default">{order.fullOrderPrice}</p>
            <CurrencyIcon type="primary" className="ml-2" />
          </section>
        </>
      ) : (
        <p>Загрузка заказов...</p>
      )} */}
    </div>
  );
};

export default FeedNumber;