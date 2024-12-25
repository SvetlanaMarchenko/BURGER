import styles from './feed.module.css';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import IngredientItem from '../components/burger-ingredients/ingredient-item';

export function Feed() {
  // Заглушка для демонстрации
  const value = 'Пример заголовка';
  const item = { _id: '123', name: 'Пример ингредиента примерный' };

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
    <div className={`${styles.appLayout}`}>
      <DndProvider backend={HTML5Backend}>
        <div className={`${styles.ingredientsBox}`}>
          <div className={`${styles.ingredientsSection} mt-10`}>
            <h1 className={`${styles.mainTitle} text text_type_main-large`}>Лента заказов</h1>

            <div className={`${styles.burgerBar} mt-6`} />

            <main className={styles.scrollContainer} onScroll={handleScroll}>
              <section className={`${styles.orderSection}`}>
                <div className="text text_type_digits-default">Номер заказа</div>
            
                  < IngredientItem className={`${styles.nazvanieBurgera} mb-6`}
                    key={item._id}
                    item={item}
                    // onClick={() => {
                    //   navigate(`/ingredients/${item._id}`, {
                    //     state: { backgroundLocation: '/' },
                    //   });
                    //   return openModal(item);
                    // }}
                    
                  /> 
              </section>
            </main>

          </div>
          <BurgerConstructor className="ml-10 mr-4" />
        </div>
      </DndProvider>
    </div>
  );
}
