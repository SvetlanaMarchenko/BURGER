
import { FeedNumber } from '../../feed/feed-number/feed-number';

interface OrderNumberProps {
  orderNumber: number | string;
}

const OrderNumber = ({ orderNumber }: OrderNumberProps) => {
  return <FeedNumber orderNumber={orderNumber} />;
};

export default OrderNumber;


