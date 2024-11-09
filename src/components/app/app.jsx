import { useState } from 'react';
import AppHeader from '../app-header/app-header/';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PropTypes from 'prop-types';

import styles from './app.module.css';

function App() {
  const [ingredients] = useState([]);

  return (
    <div className={`${styles.appLayout}`}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
      <div className={`${styles.ingredientsBox}`}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={ingredients}  className={` ml-10 mr-4`}/>
      </div>
      </DndProvider>
    </div>
  );
}

App.propTypes = {
  ingredients: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })
};

export default App;
