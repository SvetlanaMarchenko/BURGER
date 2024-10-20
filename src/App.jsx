import { useState } from 'react'
import './App.css'
import AppHeader from './app-header/app-header/'
import BurgerIngredients from './ingredient-details/ingredient-details/'
import BurgerConstructor from './ingredient-constructor/ingredient-constructor/'

function App() {


  return (
    <div id="app">
      <div> 
        <AppHeader /> 
      </div>
      

      <div className='ingredientsBox'>
        <div>
          <BurgerIngredients/>
        </div>

        <div className='ingredient-constructor ml-10'>
          <BurgerConstructor/>
        </div>
      </div>

    </div>
  )
}

export default App
