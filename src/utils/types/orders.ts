
export interface Order {
  number: number;
  name: string;
  type: string;
  price: number;
  ingredients: [];
  createdAt: string;
  fullOrderPrice: number;
  ingredientCounter: Record<string, number>;
  image: string,
  key: any,
  _id: string,
  status: 'done' | 'pending' | 'created';
  ingredientsToShow: [],
  extraIngredients: number,
  orderIngredients: []

}

export interface currentOrder {
  number: number
}

export type Orders = Order[]; 
