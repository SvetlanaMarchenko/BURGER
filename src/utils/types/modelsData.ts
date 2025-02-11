export interface IIngredient {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

export interface IUserResponse {
  id: string;
  token: string;
  username: string;
  success?: boolean;
}

export interface IMessageResponse {
  message: string;
  success: boolean;
  username: string;
  id?: string;
  isBot?: boolean;
}

