import React, { useState, useEffect } from 'react';
import helpers from '../../utils/helper';
import { updateOrderStatus } from '../../services/OrderServices';

const OrderItem = ({ data, updateData }) => {
  const [statusText, setStatusText] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (data?.status === "pending") {
      setStatusText("Đang chờ");
    } else if (data?.status === "paid") {
      setStatusText("Đã thanh toán");
    } else {
      setStatusText("Đã hủy");
    }
  }, [data?.status]);

  const handleCancelOrder = async () => {
    await updateOrderStatus(data?.orderId, 'cancelled');
    updateData()
    setShowModal(false); 
  };

  return (
    <div className="bg-white border shadow-inner rounded-xl p-6 mb-6 transition">
      <div className="flex justify-between items-center border-b pb-3 mb-3">
        <span className="text-gray-500 text-sm">Ngày đặt: {helpers.dateFormat(data?.orderDate)}</span>
        <span className={`text-sm font-semibold ${statusText === "Đã thanh toán" ? "text-green-500" : statusText === "Đang chờ" ? "text-yellow-500" : "text-red-500"}`}>
          {statusText}
        </span>
      </div>
      <div className="space-y-4">
        {data?.orderDetails?.map((item, index) => (
          <div className="flex justify-between items-start border-b pb-3" key={index}>
            <div className="flex gap-5 items-center">
              <img className="w-24 h-24 object-cover rounded-lg shadow-sm" src={item?.image} alt={item?.productName} />
              <div className="flex flex-col">
                <a href={`/shop/${item?.product}`} className="text-lg font-medium text-gray-900">{item?.productName}</a>
                <span className="text-gray-600 text-sm">Kích thước: {item?.size}</span>
                <span className="text-gray-600 text-sm">Số lượng: {item?.quantity}</span>
              </div>
            </div>
            <div className="text-right text-lg font-semibold text-gray-900">
              {helpers.numberFormat(item?.price)} VND
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex justify-between">
        <span className="text-lg font-semibold text-gray-900">Thành tiền: {helpers.numberFormat(data?.totalAmount).toLocaleString()} VND</span>
        <div className="flex gap-4">
          {data?.status === "pending" && (
              <button
                onClick={() => setShowModal(true)}
                className="text-white bg-red-900 px-5 py-3 rounded-lg hover:bg-red-800 transition"
              >
                Hủy đơn hàng
              </button>
          )}
          <a href={`/profile/order/${data?.orderId}`} className="text-gray-600 border border-gray-400 px-5 py-3 rounded-lg hover:border-gray-600 hover:text-gray-800 transition">
            Chi tiết đơn hàng
          </a>
        </div>
      </div>

      {/* Modal xác nhận hủy */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Xác nhận hủy đơn hàng</h2>
            <p>Bạn có chắc chắn muốn hủy đơn hàng này?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 border border-gray-400 px-4 py-2 rounded-lg hover:border-gray-600 hover:text-gray-800 transition mr-2"
              >
                Hủy
              </button>
              <button
                onClick={handleCancelOrder}
                className="text-white bg-red-900 px-4 py-2 rounded-lg hover:bg-red-800 transition"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderItem;
