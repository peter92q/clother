import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '../Configs/Redux/store';
import { Root } from '../Configs/Types/Order';
import LoadingComponent from '../Components/LoadingComponent';

const thStyle =
  'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase';

export default function Orders() {
  const [orders, setOrders] = useState<Root[]>();
  const { user } = useAppSelector((state) => state.account);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getOrders() {
      try {
        const response = await axios.get<Root[]>(
          `https://app.peter92.com:30001/api/order/user/${user!.id}`
        );
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    if (user) {
      getOrders();
    }
  }, [user]);

  if (loading) {
    return <LoadingComponent message="Loading orders" />;
  }

  if (!orders || orders?.length === 0) {
    return (
      <div className="w-full text-[30px] text-center font-light flex items-center justify-center my-[50px]">
        No orders
      </div>
    );
  }

  return (
    <div className="w-full h-full p-2">
      <div className="container mx-auto mt-2 border-[1px] border-gray-400/40 rounded-md shadow-md">
        <div className="grid grid-cols-1 gap-4">
          <div className="shadow-md rounded-md overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className={`${thStyle} hidden md:table-cell`}>
                    Created At
                  </th>
                  <th className={`${thStyle}`}>Id</th>
                  <th className={`${thStyle} hidden md:table-cell`}>Address</th>
                  <th className={`${thStyle}`}>Items</th>
                  <th className={`${thStyle} hidden md:table-cell`}>
                    Total Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders && orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 hidden md:table-cell">
                      {order.createdAt}
                    </td>
                    <td className="px-6 py-4">{order.id}</td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      {order.address.fullName}, {order.address.address1},{' '}
                      {order.address.address2}, {order.address.city},{' '}
                      {order.address.country}, {order.address.zip}
                    </td>
                    <td className="px-6 py-4">
                      {order.items && order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-row mb-1 items-center justify-start"
                        >
                          <img
                            src={item.mainpic}
                            alt={item.name}
                            className="w-10 h-10 mr-2"
                          />
                          {item.name} - {item.quantity} x {item.size} - $
                          {item.price.toFixed(2)}
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
