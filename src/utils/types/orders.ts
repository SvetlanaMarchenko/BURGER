
export interface Order {
  number: number;
  name: string;
  type: string;
  price: number;
  status: string;
  ingredients: string[];
  image: string,
  key: any,
  _id: string
}
export type Orders = Order[]; 
