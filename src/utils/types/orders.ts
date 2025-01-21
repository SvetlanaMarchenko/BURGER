
export interface Order {
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
  ingredientsToShow: string,
  extraIngredients: number
}
export type Orders = Order[]; 
