import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { getAllOrderByUser } from '../../services/OrderServices';
import { useSelector } from 'react-redux';
import OrderItem from '../../components/OrderItem';

const OrderPage = () => {
  const location = useLocation();
  const currentPath = location.pathname + location.hash;

  const orderNav = [
    { name: 'Tất cả', path: '/profile/order#type' },
    { name: 'Chờ giao hàng', path: '/profile/order#type=pending' },
    { name: 'Hoàn thành', path: '/profile/order#type=paid' },
    { name: 'Đã hủy', path: '/profile/order#type=cancelled' }
  ];

  const user = useSelector((state) => state.user);

  // Lấy giá trị type từ hash
  const orderType = location.hash ? location.hash.split('=')[1] : null;

  const orderByUserQuery = useQuery({
    queryKey: ['orderByUserQuery', user?.userId, orderType],
    queryFn: () => getAllOrderByUser(user?.userId, {}),
    enabled: !!user?.userId
  });

  if (orderByUserQuery.isError) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <div className="text-lg font-medium text-red-500">Error: {orderByUserQuery.error.message}</div>
      </div>
    );
  }

  const updateData = () => {
    orderByUserQuery.refetch();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Order Navigation */}
      <div className="flex gap-6 border-b pb-4">
        {orderNav.map((item, index) => (
          <a
            href={item.path}
            key={index}
            className={`py-2 px-6 font-semibold transition-colors duration-300 ${
              item.path === currentPath
                ? "border-b-2 border-main text-main"
                : "text-gray-500 hover:text-main"
            }`}
          >
            {item.name}
          </a>
        ))}
      </div>

      {/* Order List */}
      <div className="mt-6 space-y-6">
        {orderByUserQuery.isLoading ? (
          <div className="flex justify-center items-center h-[300px]">
            <div className="text-lg font-medium text-gray-600">Loading orders...</div>
          </div>
        ) : (
          <>
            {orderByUserQuery?.data?.length > 0 ? (
              orderByUserQuery?.data?.reverse().map((order) => (
                <OrderItem key={order.orderId} data={order} updateData={updateData} />
              ))
            ) : (
              <div className="text-gray-500 min-h-[200px] flex items-center justify-center">Bạn chưa có đơn hàng nào.</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
