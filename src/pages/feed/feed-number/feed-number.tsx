// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import IngredientDetails from '../../components/ingredient-details/ingredient-details';
// import { useDispatch } from 'react-redux';
// import { createOrderSuccess } from '../../services/actions/order-actions'; // Убедитесь, что экшен импортирован
// import style from './feed-number.module.css';
// import { AppDispatch } from '../../services/store';

// const FeedNumber = () => {
//   const { orderId } = useParams<{ orderId: string }>(); // `orderId` как строка
//   const dispatch = useDispatch<AppDispatch>();

//   useEffect(() => {
//     if (orderId) {
//       // Используем createOrderSuccess для обработки orderId
//       dispatch(createOrderSuccess(Number(orderId))); // Преобразование строки в число
//     }
//   }, [dispatch, orderId]);

//   return (
//     <div className={style.appLayout}>
//       <div className={style.postModalIngredientDetails}>
//         <IngredientDetails />
//       </div>
//     </div>
//   );
// };

// export default FeedNumber;


import styles from './feed-number.module.css';
import { useSelector } from 'react-redux';

import {CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';



const FeedNumber = () => {
//   const selectedData = useSelector(
//     (a) => a.currentIngredient
//   );
//   if (!selectedData) {
//     return <p>Загрузка...</p>;
//   }

const value = 'Пример заголовка самы йпримерный пример';
const item = { _id: '123564875', name: 'Пример ингредиента примерный', img: 'img', quantity: 2, price: 300};

const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    console.log('Scrolled:', event.currentTarget.scrollTop);
  };

return (
  <div className={`${styles.moduleOrderLayout}`}>
    <section className={`${styles.orderDetailsMain} mt-30`}>
      <h1 className={`${styles.orderNumber} text text_type_digits-default mb-10`}>
        # {item._id}
      </h1>
      <h1 className={`${styles.orderName} text text_type_main-medium mb-3`}>
              {/* alt={selectedData.name} */}
              {value}
      </h1>
      <h1 className={`${styles.statusOrder} text text_type_main-default mb-15`}>Выполнен</h1>
      <h1 className={`${styles.orderName} text text_type_main-medium mb-6`}>
                Состав:
      </h1>
      </section>
      <section className={`${styles.orderIngredientOptions} pr-6 mb-4`} onScroll={handleScroll} >
      <div className={`${styles.orderIngredient} mb-4 text text_type_main-default text_color_inactive`}>
          <div>
            <h1 className="text text_type_main-default mr-4">{item.img}</h1>
          </div>
          <div className={styles.orderIngredientName}>
            <p className="text text_type_main-medium">{item.name}</p>
          </div>
          <div>
            <p className="text text_type_digits-default">
                {item.quantity} x {item.price}
            </p>
            </div>
          <CurrencyIcon type="primary" className="ml-2" />
        </div>

        <div className={`${styles.orderIngredient} mb-4 text text_type_main-default text_color_inactive`}>
          <div>
            <h1 className="text text_type_main-default mr-4">{item.img}</h1>
          </div>
          <div className={styles.orderIngredientName}>
            <p className="text text_type_main-medium">{item.name}</p>
          </div>
          <div>
            <p className="text text_type_digits-default">
                {item.quantity} x {item.price}
            </p>
            </div>
          <CurrencyIcon type="primary" className="ml-2" />
        </div>

        <div className={`${styles.orderIngredient} mb-4 text text_type_main-default text_color_inactive`}>
          <div>
            <h1 className="text text_type_main-default mr-4">{item.img}</h1>
          </div>
          <div className={styles.orderIngredientName}>
            <p className="text text_type_main-medium">{item.name}</p>
          </div>
          <div>
            <p className="text text_type_digits-default">
                {item.quantity} x {item.price}
            </p>
            </div>
          <CurrencyIcon type="primary" className="ml-2" />
        </div>

        <div className={`${styles.orderIngredient} mb-4 text text_type_main-default text_color_inactive`}>
          <div>
            <h1 className="text text_type_main-default mr-4">{item.img}</h1>
          </div>
          <div className={styles.orderIngredientName}>
            <p className="text text_type_main-medium">{item.name}</p>
          </div>
          <div>
            <p className="text text_type_digits-default">
                {item.quantity} x {item.price}
            </p>
            </div>
          <CurrencyIcon type="primary" className="ml-2" />
        </div>


        <div className={`${styles.orderIngredient} mb-4 text text_type_main-default text_color_inactive`}>
          <div>
            <h1 className="text text_type_main-default mr-4">{item.img}</h1>
          </div>
          <div className={styles.orderIngredientName}>
            <p className="text text_type_main-medium">{item.name}</p>
          </div>
          <div>
            <p className="text text_type_digits-default">
                {item.quantity} x {item.price}
            </p>
            </div>
          <CurrencyIcon type="primary" className="ml-2" />
        </div>

        
      </section>
      <section className={`mt-10 ${styles.orderResult}`}>
        <FormattedDate 
            className={`${styles.orderTime} text text_type_main-default text_color_inactive`} 
            date={new Date()} 
        />
        <p className="text text_type_digits-default">
            {item.price}
        </p>
        <CurrencyIcon type="primary" className="ml-2" />
        </section>

    </div>
  );
};

export default FeedNumber;

