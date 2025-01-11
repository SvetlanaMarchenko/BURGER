// Define the IIngredient interface for the ingredients
export interface IIngredient {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

// IUserResponse interface for user details
export interface IUserResponse {
  id: string;
  token: string;
  username: string;
  success?: boolean;
}

// IMessageResponse interface for message response from the server
export interface IMessageResponse {
  message: string;
  success: boolean;
  username: string;
  id?: string;
  isBot?: boolean;
}

// IMessage interface for a message with additional fields like ingredients
export interface IMessage extends Omit<IMessageResponse, 'success'> {
  timestamp: number;   // Unix timestamp or other timestamp format
  _id: string;         // Unique message identifier
  number: number;      // Order or message number
  status: string;      // Status (e.g., "done" or "pending")
  updatedAt: string;   // Date/time of last update
  ingredients: IIngredient[];  // List of ingredients (corrected to use IIngredient)
}
