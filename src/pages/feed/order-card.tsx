
import styles from './feed.module.css';
import { CurrencyIcon,FormattedDate  } from '@ya.praktikum/react-developer-burger-ui-components';


export const OrderCard = ({ order, openModal }: { order: any, openModal: (order: any) => void }) => (
  <div className={`${styles.subsection} mb-2`} onClick={() => openModal(order)}>  {/* Вызываем openModal при клике */}
      <div className={`${styles.orderName} mb-6`}>
        <div className={`${styles.orderNumber} mt-6 mb-6`}>
          <div className="text text_type_digits-default"># {order.number}</div>
          <FormattedDate
                      className="text text_type_main-default text_color_inactive"
                      date={new Date(order.createdAt)}
                    />
        </div>
        <div className={`text text_type_main-medium mb-6`}>{order.name}</div>
        <div className={`${styles.orderListAndCostInGeneral} mb-6`}>
          <div className={`${styles.orderListAndCost}`}>
            {order.ingredientsToShow.map((ingredient, index) => (
              <div key={index}>
                <img
                    src={ingredient?.image}
                    className={order.extraIngredients > 0 && index === 5 ? styles.blurImage: styles.orderImage}  // Применяем styles.blur если условие верно
                    alt="Ингредиент"
                    />
              </div>
            ))}
            {order.extraIngredients > 0 && (
              <div className={styles.extraIngredients}>+{order.extraIngredients}</div>
            )}
          </div>
          <div className="text text_type_digits-default">
            {order.fullOrderPrice} <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );