import styles from './profile-orders.module.css';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import IngredientItem from '../../components/burger-ingredients/ingredient-item';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'; // Убедитесь, что этот компонент импортирован
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
              <section className={`${styles.orderSection}`}>
              <div className={`${styles.orderNumber}`}>
                <h1 className="text text_type_digits-default mb-10">
                  # {item._id}
                </h1> 
                <FormattedDate 
                  className="text text_type_main-default text_color_inactive" 
                  date={new Date()} 
                />
              </div>


                <h1 className={`${styles.orderName} text text_type_main-medium mb-3`}>
                        {/* alt={selectedData.name} */}
                        {value}
                </h1>
                <h1 className={`${styles.statusOrder} text text_type_main-default mb-15`}>Выполнен</h1>
                <h1 className={`${styles.orderName} text text_type_main-medium mb-6`}>
                          Состав:
                </h1>

              </section>
            </main>
          </div>



          {/* <BurgerConstructor className=" mr-4" /> */}
        </div>
      </DndProvider>
    </div>
  );
}
