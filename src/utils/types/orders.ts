import { Ingredient } from "./ingredients";

export interface Order {
  number: number;
  name: string;
  type: string;
  price: number;
  ingredients: Ingredient[];
  createdAt: string;
  fullOrderPrice: number;
  ingredientCounter: Record<string, number>;
  image: string,
  key: any,
  _id: string,
  status: 'done' | 'pending' | 'created';
  ingredientsToShow: Ingredient[],
  extraIngredients: number,
  orderIngredients: []

}

export interface currentOrder {
  number: number
}

export type Orders = Order[]; 
