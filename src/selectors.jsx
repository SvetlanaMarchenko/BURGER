import React from 'react';
import BurgerIngredients from './ingredient-details/ingredient-details/'
import BurgerConstructor from './ingredient-constructor/ingredient-constructor/'


const selectedBun = () => {
   const [selectedBun, setSelectedBun] = useState("Выбери тип булки");

   const handleBunSelect = (bun) => {
      setSelectedBun(bun);
   };

   return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
         <BurgerIngredients onBunSelect={handleBunSelect} />

         <BurgerConstructor selectedBun={selectedBun} />
      </div>
   );
};


   

export default selectedBun;

