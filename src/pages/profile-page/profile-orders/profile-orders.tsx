import styles from './profile-orders.module.css';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import IngredientItem from '../../components/burger-ingredients/ingredient-item';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'; // Убедитесь, что этот компонент импортирован
import NavigationProfilePage from '../navigation-profile-page';

export function ProfileOrders() {
  // Заглушка для демонстрации
  const value = 'Пример заголовка самы йпримерный пример';
  const item = { _id: '123564875', name: 'Пример ингредиента примерный', img: 'img', quantity: 2, price: 300};

  const navigate = (path: string, state: object) => {
    console.log(`Navigating to ${path}`, state);
  };

  const openModal = (item: any) => {
    console.log('Opening modal for:', item);
  };

  // Обработчик скролла
  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    console.log('Scrolled:', event.currentTarget.scrollTop);
  };

  return (
    <div className={`${styles.profileOrder}`}>
      <DndProvider backend={HTML5Backend}>
      <NavigationProfilePage />
        <div className={`${styles.ingredientsBox}`}>
          <div className={`${styles.ingredientsSection} mt-10`}>

            <div className={`${styles.burgerBar} mt-6`} />

            <main className={styles.scrollContainer} onScroll={handleScroll}>
              <section className={`${styles.orderSection} mb-6`}>
              <div className={`${styles.orderNumber}`}>
                <h1 className="text text_type_digits-default mb-6">
                  # {item._id}
                </h1> 
                <FormattedDate 
                  className="text text_type_main-default text_color_inactive" 
                  date={new Date()} 
                />
              </div>

                <h1 className={`${styles.orderName} text text_type_main-medium mb-2`}>
                        {/* alt={selectedData.name} */}
                        {value}
                </h1>
                <h1 className={`${styles.statusOrder} text text_type_main-default mb-6`}>Выполнен</h1>


                <section className={`${styles.orderResult}`}>
                <h1 className={`${styles.orderImage} text text_type_main-medium`}>
                    {item.img}
                </h1>

                <p className="text text_type_digits-default">
                    {item.price}
                </p>
                <CurrencyIcon type="primary" className="ml-2" />
                </section>
              </section>
            </main>
          </div>



          {/* <BurgerConstructor className=" mr-4" /> */}
        </div>
      </DndProvider>
    </div>
  );
}
