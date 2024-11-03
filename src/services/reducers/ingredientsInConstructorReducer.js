import { createSlice } from '@reduxjs/toolkit'

const constructorSlice = createSlice({
  name: 'constructor',
  initialState: {
    ingredientsInConstructor:[]
  },
  reducers: [
    
  ]

})


  return (
    <div className={`${styles.appLayout}`}>
      <AppHeader />
      <div className={`${styles.ingredientsBox}`}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={ingredients}  className={` ml-10 mr-4`}/>
      </div>
    </div>
  );
}

export default App;
