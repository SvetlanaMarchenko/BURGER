import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from './app-header/app-header/'
import BurgerIngredients from './ingredient-details/ingredient-details/'

function App() {


  return (
    <>
      <div>
        <AppHeader /> 
      </div>
      

      <div>
        <BurgerIngredients/>
      </div>
    </>
  )
}

export default App
