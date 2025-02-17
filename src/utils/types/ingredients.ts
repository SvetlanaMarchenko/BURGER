
export interface Ingredient {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  key: any;
  _id: string;
  fat: number,
  carbohydrates: number,
  calories: number,
  image_mobile: string,
  image_large: string
  
}

export type Ingredients = Ingredient[];  
export type wantedIngredient = Ingredient



