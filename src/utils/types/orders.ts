
export interface Order {
  number: string;
  name: string;
  type: string;
  price: number;
  image: string,
  key: any,
  _id: string
}

export type Orders = Order[]; 
