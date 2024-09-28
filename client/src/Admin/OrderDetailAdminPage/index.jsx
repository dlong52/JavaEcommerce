import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom';
import { getOrderDetail } from '../../services/OrderServices';
import { Status } from '../../components/Status';
import helpers from '../../utils/helper';

const OrderDetailAdminPage = () => {
    const { orderId } = useParams()
    const { data, refetch } = useQuery({
        queryKey: ['orderDetails', orderId],
        queryFn: () => getOrderDetail(orderId),
        enabled: !!orderId
    });
    const products = data?.orderDetails
    

    return (
        <div className='p-5 min-h-screen bg-gray-100'>
            <div className="grid grid-cols-3 gap-x-6">
                <div className="col-span-2 bg-white rounded-lg shadow-md p-5">
                    <div className="flex justify-between items-center">
                        <span className='text-[24px] font-semibold text-main'>
                            Đơn hàng #{data?.orderId}
                            <span className=' uppercase'>({data?.paymentInfo?.paymentMethod})</span>
                        </span>
                        <span className='flex items-center gap-x-3'>
                            <Status status={data?.status} />
                        </span>
                    </div>
                    <span className='text-gray-500 text-sm font-medium' >Ngày đặt: {helpers.dateFormat(data?.orderDate)}</span>
                    <div className="py-5 border-b-2">
                        <table className="w-full text-center mt-5">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="py-2">ID</th>
                                    <th className="py-2">Tên sản phẩm</th>
                                    <th className="py-2">Giá</th>
                                    <th className="py-2">Số lượng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products?.map((product) => (
                                        <tr key={product?.product} className="hover:bg-gray-100 transition-colors">
                                            <td className="py-2">#{product?.product}</td>
                                            <td className="py-2">{product?.productName}</td>
                                            <td className="py-2">{helpers.numberFormat(product?.price)}đ</td>
                                            <td className="py-2">X{product?.quantity}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="my-5 text-end text-[20px] font-bold text-gray-800">
                        <h1>Tổng hóa đơn: {helpers.numberFormat(data?.totalAmount)}đ</h1>
                    </div>
                </div>
                <div className="col-span-1 bg-white rounded-lg shadow-md p-5">
                    <span className='text-[20px] font-semibold text-main'>Thông tin khách hàng</span>
                    <div className="mt-4">
                        <div className="flex items-center">
                            <div className="w-[60px] aspect-square rounded-full bg-black flex justify-center items-center">
                                <i className="fa-regular fa-user fa-2xl text-white"></i>
                            </div>
                            <div className="ml-4">
                                <h1 className='text-[20px] font-semibold'>{data?.username}</h1>
                                <span className=" italic text-gray-600 font-medium text-sm">ID:#{data?.user}</span>
                            </div>
                        </div>
                        <div className="flex mt-[40px] items-start">
                            <div className="mt-[1px]">
                                <i className="fa-solid fa-location-dot fa-lg text-main"></i>
                            </div>
                            <div className="flex flex-col ml-3">
                                <span className='font-semibold'>Địa chỉ giao hàng</span>
                                <span>{data?.address}</span>
                            </div>
                        </div>
                        <div className="flex mt-[40px] items-start">
                            <div className="mt-[1px]">
                                <i className="fa-solid fa-phone fa-lg text-main"></i>
                            </div>
                            <div className="flex flex-col ml-3">
                                <span className='font-semibold'>Số điện thoại</span>
                                <span>(+84) {data?.phoneNumber.slice(1)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default OrderDetailAdminPage
