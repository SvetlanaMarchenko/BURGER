import React from 'react';
import styles from './ingredient-constructor.module.css';
import { ConstructorElement, Counter, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredients from '../utils/ingredients-info.json';
import selectedBun from '../selectors'


const BurgerConstructor = (selectedBun) => {

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {selectedBun && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${selectedBun.name} (верх)`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
          />
          )}

          
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            // thumbnail={img}
          />
          

          {selectedBun && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${selectedBun.name} (низ)`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
          /> 
          )}
                

               <Counter count={1} size="default" extraClass="m-1" color="white" />
       

            <Button htmlType="button" type="primary" size="medium">
               Нажми на меня
            </Button>

        </div>


      )
    }

   

export default BurgerConstructor;

