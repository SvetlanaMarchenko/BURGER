import AppHeader from '../../components/app-header/app-header/';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


import styles from './home-page.module.css';

export function HomePage() {
  return (

        <div className={`${styles.appLayout}`}>
            <DndProvider backend={HTML5Backend}>
              <div className={`${styles.ingredientsBox}`}>
                <BurgerIngredients />
                <BurgerConstructor className={`ml-10 mr-4`} />
              </div>
            </DndProvider>
          </div>
      )}
