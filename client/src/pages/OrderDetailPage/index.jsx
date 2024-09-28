import { useQuery, useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderDetail, updateOrderStatus } from '../../services/OrderServices';
import helpers from '../../utils/helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const OrderDetailPage = () => {
    const { order_id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const { data, refetch } = useQuery({
        queryKey: ['orderDetails', order_id],
        queryFn: () => getOrderDetail(order_id),
        enabled: !!order_id
    });

    const handleCancelOrder = async () => {
        await updateOrderStatus(order_id, 'cancelled');
        refetch()
        setShowModal(false)
    };

    if (!data) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="bg-white shadow-xl rounded-lg p-10">
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
            {/* Thông tin đơn hàng */}
            <div className="flex justify-between items-center pb-6 border-b mb-6">
                <a className="text-blue-600 hover:underline text-sm font-medium flex items-center uppercase transition-colors duration-200 ease-in-out" href="/profile/order">
                    <FontAwesomeIcon icon={faAngleLeft} className="mr-2" />
                    Trở lại
                </a>
                <span className="text-gray-500 text-sm">Yêu cầu vào: {helpers.dateFormat(data?.orderDate)}</span>
            </div>

            {/* Thông tin người nhận */}
            <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Thông tin người nhận</h2>
                <div className="text-gray-700">
                    <p className="mb-2"><strong>Tên:</strong> {data?.username}</p>
                    <p className="mb-2"><strong>Địa chỉ:</strong> {data?.address}</p>
                    <p><strong>Số điện thoại:</strong> {data?.phoneNumber}</p>
                </div>
            </div>
            {/* Trạng thái đơn hàng */}
            <div className="mb-10">
                {data?.status === 'pending' && (
                    <div className="p-4 bg-yellow-100 text-yellow-800 rounded-md text-center font-semibold shadow-lg">
                        Đơn hàng đang chờ xử lý
                    </div>
                )}
                {data?.status === 'paid' && (
                    <div className="p-4 bg-green-100 text-green-800 rounded-md text-center font-semibold shadow-lg">
                        Đơn hàng đã thanh toán
                    </div>
                )}
                {data?.status === 'cancelled' && (
                    <div className="p-4 bg-red-100 text-red-800 rounded-md text-center font-semibold shadow-lg">
                        Đơn hàng đã hủy
                    </div>
                )}
            </div>

            {/* Sản phẩm trong đơn hàng */}
            <div className="space-y-6">
                {data?.orderDetails?.map((item, index) => (
                    <div className="flex justify-between items-start border-b pb-4" key={index}>
                        <div className="flex gap-5 items-center">
                            <img className="w-28 h-28 object-cover rounded-lg shadow-md transition-transform duration-200 hover:scale-105" src={item?.image} alt={item?.productName} />
                            <div className="flex flex-col">
                                <a href={`/shop/${item?.product}`} className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                                    {item?.productName}
                                </a>
                                <span className="text-gray-500 text-sm">Kích thước: {item?.size}</span>
                                <span className="text-gray-500 text-sm">Số lượng: {item?.quantity}</span>
                            </div>
                        </div>
                        <div className="text-right text-lg font-semibold text-gray-800">
                            {helpers.numberFormat(item?.price)} VND
                        </div>
                    </div>
                ))}
            </div>

            {/* Tổng tiền */}
            <div className="flex justify-between items-center mt-10 border-t pt-4">
                <span className="text-lg font-semibold text-gray-800">Tổng cộng:</span>
                <span className="text-2xl font-bold text-gray-800">
                    {helpers.numberFormat(data?.totalAmount)} VND
                </span>
            </div>

            {/* Nút hủy đơn */}
            {data?.status === 'pending' && (
                <div className="flex justify-end mt-10">
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 shadow-lg transition-colors duration-200"
                    >
                        Hủy đơn hàng
                    </button>
                </div>
            )}
        </div>
    );
};

export default OrderDetailPage;
