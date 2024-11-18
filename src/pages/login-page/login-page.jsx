
import AppHeader from '../app-header/app-header/';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import styles from './login-page.module.css';

function loginPage() {


  return (
    <div className={`${styles.appLayout}`}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
      <div className={`${styles.ingredientsBox}`}>
          <BurgerIngredients/>
          <BurgerConstructor className={` ml-10 mr-4`}/>
      </div>
      </DndProvider>
    </div>
  );
}

export default loginPage;
