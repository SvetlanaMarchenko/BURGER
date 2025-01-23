import { useSelector } from 'react-redux';
import { RootState } from '../../../services/store';
import FeedNumber from '../../feed/feed-number/feed-number';
import { Order } from '../../../utils/types/orders';
import { Ingredient } from '../../../utils/types/ingredients';

interface OrderNumberProps {
  orderNumber: undefined | string;
}

const OrderNumber: React.FC<OrderNumberProps> = ({ orderNumber }) => {
  const orders = useSelector((state: RootState) => state.wsPersonalReducer.orders || []);
  const ingredients = useSelector((state: RootState) => state.ingredients.allIngredients);

  const currentOrder: string | undefined  = orders.find((order: Order) => order.number === Number(orderNumber));
  

  if (!currentOrder) {
    return <p>Заказ не найден.</p>;
  }
  const orderIngredients = currentOrder.ingredients
    .map(id => ingredients.find(ingredient => ingredient._id === id))
    .filter(Boolean) as Ingredient[];

  const orderPrice = orderIngredients.reduce(
    (total, ingredient) => total + (ingredient?.price || 0),
    0
  );

  const ingredientCounter = orderIngredients.reduce((acc, ingredient) => {
    const id = ingredient._id;
    if (id) {
      acc[id] = (acc[id] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <FeedNumber
      orderNumber={orderNumber}
      order={{
        ...currentOrder ,
        ingredients: orderIngredients,
        ingredientCounter,
        fullOrderPrice: orderPrice,
      }}
    />
  );
};

export default OrderNumber;
