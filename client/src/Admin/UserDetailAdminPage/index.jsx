import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailUser, updateUser } from '../../services/UserService';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getAllOrderByUser } from '../../services/OrderServices';
import helpers from '../../utils/helper';
import { Status } from '../../components/Status';

const UserDetailAdminPage = () => {
    const { userId } = useParams();
    const user = useSelector((state) => state.user);
    const [showUpdateRole, setShowUpdateRole] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedRole, setSelectedRole] = useState('');

    const { data, refetch } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => getDetailUser(userId),
        enabled: !!userId,
    });

    const orderByUserQuery = useQuery({
        queryKey: ['orderByUserQuery', userId],
        queryFn: () => getAllOrderByUser(userId),
        enabled: !!userId,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if ((Number(userId) !== user?.userId && user?.role === "admin")) {
                const res = await updateUser(userId, { role: selectedRole });
                setSelectedRole('');
                setShowUpdateRole(false);
                refetch();
                setLoading(false)
                return res;
            }
            alert("Bạn không có quyền truy cập chức năng này")
        } catch (error) {
            setError('Error updating role');
        }
        setLoading(false);
    };

    const orderByUser = orderByUserQuery?.data;

    return (
        <div className='p-5 min-h-screen'>
            {showUpdateRole && (
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <form onSubmit={handleSubmit} className="text-[#100e3d] relative text-center transform rounded-lg bg-white shadow-xl transition-all p-5 flex flex-col">
                                <span className='uppercase font-semibold mb-5'>Cập nhật quyền</span>
                                <select onChange={(e) => setSelectedRole(e.target.value)} className='w-[200px] h-[40px] rounded-[5px] outline-none border-[2px] border-[#100e3d]'>
                                    <option value="">Chọn quyền</option>
                                    <option value="subadmin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                                {error && <span className='text-red-500'>{error}</span>}
                                <button type='submit' className='w-[200px] h-[40px] rounded-[5px] bg-[#100e3d] text-white mt-5' disabled={loading}>
                                    {loading ? 'Updating...' : 'Confirm'}
                                </button>
                                <span onClick={() => { setShowUpdateRole(false); setSelectedRole(''); }} className='cursor-pointer text-center rounded-[5px] text-[#100e3d] mt-2'>Cancel</span>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-6 gap-x-4">
                <div className="col-span-2 bg-white rounded-xl overflow-hidden p-4 shadow-xl">
                    <div className="relative w-full h-[120px] bg-gradient-to-r from-gray-400 to-gray-500 rounded-xl">
                        <div className="flex justify-center items-center border-[6px] border-white absolute w-[80px] aspect-square rounded-full bg-white -bottom-[40px] left-[40px] shadow-md">
                            <i className="text-gray-500 fa-solid fa-user fa-2xl"></i>
                        </div>
                    </div>
                    <div className="mt-16 flex flex-col items-start">
                        <span className='text-[22px] font-semibold capitalize text-gray-800'>{data?.username} ({data?.role})</span>
                        <span className="text-gray-500">#ID: {data?.userId}</span>
                        <div className="flex flex-col mt-5 gap-y-2 text-gray-600">
                            <span>Email: {data?.email}</span>
                            <span>Số điện thoại: (+84) {data?.phone_number}</span>
                        </div>
                        <div className="mt-5 flex flex-col gap-y-3">
                            <span className='font-semibold text-gray-800'>Địa chỉ: {data?.address}</span>
                            {(Number(userId) !== user?.userId && user?.role === "admin") && (
                                <button onClick={() => setShowUpdateRole(true)} className='w-[120px] h-[45px] bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-all duration-200'>Set role</button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-span-4 bg-white rounded-xl shadow-lg p-6">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                            <div className="text-[24px] font-semibold text-gray-700">{orderByUser?.length}</div>
                            <div className="text-gray-500">Tổng đơn hàng</div>
                        </div>
                        <div className="bg-green-100 p-4 rounded-lg shadow-sm">
                            <div className="text-[24px] font-semibold text-green-700">{orderByUser?.filter((item) => item.status === 'paid').length}</div>
                            <div className="text-green-600">Hóa đơn đã thanh toán</div>
                        </div>
                        <div className="bg-orange-100 p-4 rounded-lg shadow-sm">
                            <div className="text-[24px] font-semibold text-orange-600">{orderByUser?.filter((item) => item.status === 'pending').length}</div>
                            <div className="text-orange-500">Hóa đơn chờ</div>
                        </div>
                    </div>

                    <table className='w-full bg-white rounded-xl shadow-sm text-left'>
                        <thead>
                            <tr className='font-medium text-main bg-gray-500'>
                                <th className='p-4 rounded-tl-lg text-white'>Order</th>
                                <th className='p-4 text-white'>Status</th>
                                <th className='p-4 text-white'>Total Payment</th>
                                <th className='p-4 rounded-tr-lg text-white'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderByUser?.map((item, index) => (
                                <tr key={index} className='hover:bg-gray-50 transition-all'>
                                    <td className='p-4 text-sm text-gray-500'>
                                        <div className="flex items-center">
                                            <i className="fa-regular fa-file-lines text-gray-400"></i>
                                            <div className="ml-3">
                                                <div>ID: {item?.orderId}</div>
                                                <div className="text-gray-400">ODate: {helpers.dateFormat(item?.orderDate)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='p-4 text-sm text-gray-500'>
                                        <Status status={item?.status} />
                                    </td>
                                    <td className='p-4 text-md text-gray-700 font-medium'>{helpers.numberFormat(item?.totalAmount)} VND</td>
                                    <td className='p-4 text-sm text-gray-500'>
                                        <button className="hover:text-blue-500 transition-all"><i className="fa-regular fa-pen-to-square fa-lg"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserDetailAdminPage;
