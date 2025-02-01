import { Ingredient } from "./ingredients";

export interface RawOrder {
  number: number;
  name: string;
  type: string;
  price: number;
  ingredients: string[];
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

export type RawOrders = RawOrder[]; 
