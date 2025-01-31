
import { FeedNumber } from '../../feed/feed-number/feed-number';

interface OrderNumberProps {
  orderNumber: string | undefined ;
}

const OrderNumber = ({ orderNumber }: OrderNumberProps) => {
  return <FeedNumber orderNumber={orderNumber} />;
};

export default OrderNumber;


