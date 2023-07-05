import { useNavigate } from 'react-router-dom';
import { button } from '../../Utils/Button';

interface Address {
  id: number;
  fullName: string;
  address1: string;
  address2: string;
  city: string;
}

interface Item {
  productName: string;
  price: number;
  quantity: number;
  size: string;
}

interface OrderDto {
  orderId: number;
  username: string;
  address: Address;
  items: Item[];
}

type Props = {
  order: OrderDto;
};

const textWrapper = 'flex flex-row justify-between w-full my-1 mx-2';

export default function Success({ order }: Props) {
  const navigate = useNavigate();
  return (
    <div
      className="text-[30px] flex flex-col items-center justify-center
         text-green-400 gap-2 border border-gray-600/40 p-4 rounded-md shadow-md mx-auto"
    >
      <p className="mx-auto text-[25px] font-semibold text-green text-center">
        Your order has been successful!
      </p>
      {/*id*/}
      <div className={`${textWrapper}`}>
        <p className="text-[20px] font-medium text-gray-800">Order id:</p>
        <p className="text-[20px] font-normal text-gray-600">{order.orderId}</p>
      </div>
      <div className="h-[0.02rem] w-full bg-black/20" />
      {/* Username */}
      <div className={`${textWrapper}`}>
        <p className="text-[20px] font-medium text-gray-800">Username:</p>
        <p className="text-[20px] font-normal text-gray-600">
          {order.username}
        </p>
      </div>
      <div className="h-[1px] w-full bg-black/20" />
      {/* Address */}
      <div className={`${textWrapper}`}>
        <p className="text-[20px] font-medium text-gray-800">Address:</p>
        <p className="text-[20px] font-normal text-gray-600">
          {order.address.fullName}, {order.address.address1},{' '}
          {order.address.address2}, {order.address.city}
        </p>
      </div>
      <div className="h-[1px] w-full bg-black/20" />
      {/* Items */}
      <p className="text-[20px] font-medium text-gray-800">Items:</p>
      {order.items && order.items.map((item, index) => (
        <div className="mb-1" key={index}>
          <p className="text-[20px] font-normal text-gray-600">
            {item.productName} - {item.size} - {item.quantity} x ${item.price}
          </p>
        </div>
      ))}
      <button
        className={`${button} w-[200px] py-1 text-[17px] font-medium`}
        onClick={() => navigate('/')}
      >
        Back to homepage
      </button>
    </div>
  );
}
