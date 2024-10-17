import { useState } from 'react'
import './App.css'
import AppHeader from './app-header/app-header/'
import BurgerIngredients from './ingredient-details/ingredient-details/'
import BurgerConstructor from './ingredient-constructor/ingredient-constructor/'

function App() {


  return (
    <body>
      <div>
        <AppHeader /> 
      </div>
      

      <div className='ingredientsBox'>
        <div>
          <BurgerIngredients/>
        </div>

        <div className='ml-10'>
          <BurgerConstructor/>
        </div>
      </div>

    </body>
  )
}

export default App
