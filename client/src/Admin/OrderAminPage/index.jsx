
import React, { Fragment, useState } from 'react'; 
import { useQuery } from '@tanstack/react-query';
import { getAllOrder, updateOrderStatus } from '../../services/OrderServices';
import helpers from '../../utils/helper';
import { Status } from '../../components/Status';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';
import { excel } from '../../assets';

const OrderAdminPage = () => {
  const [filters, setFilters] = useState({
    status: '',
    startDate: '',
    endDate: '',
    paymentMethod: '',
    username: '',
  });
  const [page, setPage] = useState(0);  // Khởi tạo page từ 1
  const [pageSize, setPageSize] = useState(10);

  const { data, refetch } = useQuery({
    queryKey: ['orders', filters, page, pageSize], 
    queryFn: () => getAllOrder(filters, page, pageSize),
    keepPreviousData: true, // Giữ dữ liệu cũ khi thay đổi page, filters để tránh hiển thị flash
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(0);  // Reset về trang 1 khi có thay đổi bộ lọc
  };

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  const handleExportToExcel = () => {
    const ordersData = data?.map(order => ({
      'Order ID': order.orderId,
      'User ID': order.user,
      'Total Amount': helpers.numberFormat(Number(order.totalAmount)) + 'đ',
      'Order Date': helpers.dateFormat(order.orderDate),
      'Status': order.status,
      'Payment Method': order.paymentInfo.paymentMethod,
      'Payment Status': order.paymentInfo.paymentStatus,
      'Payment Date': helpers.dateFormat(order.paymentInfo.paymentDate),
      'Cart ID': order.cart,
      'Address': order.address,
      'Phone Number': order.phoneNumber,
      'Username': order.username,
      'Order Details': order.orderDetails.map(detail => `${detail.productName} (${detail.size}): ${detail.quantity} x ${helpers.numberFormat(Number(detail.price))}đ`).join(', ')
    }));

    const ws = XLSX.utils.json_to_sheet(ordersData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orders');
    XLSX.writeFile(wb, 'Orders.xlsx');
  };

  return (
    <div className="px-6 py-3">
      <Fragment>
        <div className="p-5 bg-white rounded-md shadow-lg">
          <h1 className='text-[24px] font-semibold text-gray-800'>Tất cả đơn hàng</h1>
          <div className="flex mt-4 gap-4">
            <form onSubmit={handleSearch} className="flex w-[400px] rounded-lg bg-slate-200 shadow-md">
              <input
                className="w-full border-none bg-transparent px-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-none"
                type="search"
                name="username"
                placeholder="Tìm kiếm theo tên khách hàng..."
                value={filters.username}
                onChange={handleFilterChange}
              />
            </form>

            <select name="status" onChange={handleFilterChange} className="outline-none px-4 py-2 rounded-lg bg-slate-200 text-gray-700 font-medium shadow-md hover:bg-slate-300 transition-all duration-200">
              <option value="">Trạng thái đơn hàng</option>
              <option value="pending">Đang chờ</option>
              <option value="paid">Đã thanh toán</option>
              <option value="cancelled">Đã hủy</option>
            </select>

            <select name="paymentMethod" onChange={handleFilterChange} className="outline-none px-4 py-2 rounded-lg bg-slate-200 text-gray-700 font-medium shadow-md hover:bg-slate-300 transition-all duration-200">
              <option value="">Phương thức thanh toán</option>
              <option value="cod">COD</option>
              <option value="vnpay">VNPAY</option>
            </select>

            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="outline-none px-4 py-2 rounded-lg bg-slate-200 text-gray-700 font-medium shadow-md hover:bg-slate-300 transition-all duration-200"
            />

            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="outline-none px-4 py-2 rounded-lg bg-slate-200 text-gray-700 font-medium shadow-md hover:bg-slate-300 transition-all duration-200"
            />

            <button
              onClick={handleExportToExcel}
              className="flex items-center justify-center rounded-md bg-[#217345] px-4 py-2 text-white hover:bg-green-600 transition-all duration-200"
            >
              <img className='w-[30px]' src={excel} alt="Export to Excel" />
            </button>
          </div>
        </div>

        {/* Table hiển thị */}
        <div className="mt-5">
        <table className='w-full text-center bg-white rounded-md min-w-full table-fixed shadow-lg'>
            <thead>
              <tr className='font-medium text-main h-[50px] uppercase text-[14px]'>
                <th className='bg-main text-white rounded-tl-md py-2'>ID</th>
                <th className='bg-main text-white py-2'>Khách hàng</th>
                <th className='bg-main text-white py-2'>Tổng hóa đơn</th>
                <th className='bg-main text-white py-2'>Ngày đặt</th>
                <th className='bg-main text-white py-2'>Trạng thái</th>
                <th className='bg-main text-white rounded-tr-md py-2'>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {data?.reverse().map((order) => (
                <tr key={order.orderId} className='hover:bg-gray-100 transition-colors'>
                  <td className='p-4 text-base font-medium text-blue-800 whitespace-nowrap'>
                    <a href={`/admin/order/${order?.orderId}`} className='hover:underline'>
                      #{order?.orderId}
                    </a>
                  </td>
                  <td className='p-4 text-base font-medium text-gray-900 whitespace-nowrap'>
                    {order?.username}
                  </td>
                  <td className='p-4 text-base font-medium text-gray-500 whitespace-nowrap'>
                    {helpers.numberFormat(Number(order?.totalAmount))}đ
                  </td>
                  <td className='p-4 text-base font-medium text-gray-900 whitespace-nowrap'>
                    {helpers.dateFormat(order?.orderDate)}
                  </td>
                  <td className='p-4 text-base font-medium text-gray-900 whitespace-nowrap flex justify-center items-center'>
                    <Status status={order?.status} />
                  </td>
                  <td className='p-4 whitespace-nowrap'>
                    <select
                      value={order?.status}
                      onChange={async (e) => {
                        const newStatus = e.target.value;
                        await updateOrderStatus(order?.orderId, newStatus);
                        refetch();  // Refetch orders to get the updated list
                      }}
                      className="border border-gray-300 rounded-full bg-gray-800 text-white px-2 py-1 transition-all duration-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending" className="bg-gray-800">Đang chờ</option>
                      <option value="paid" className="bg-gray-800">Đã thanh toán</option>
                      <option value="cancelled" className="bg-gray-800">Đã hủy</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-4 items-center gap-6">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 0}
              className={`p-2 ${page === 0 ? 'text-gray-300' : 'text-main'}`}
            >
              <FontAwesomeIcon icon={faAnglesLeft} size='lg' />
            </button>
            <span>Trang {page+1}/{Math.ceil(data?.length / pageSize)}</span>
            <button
              onClick={() => setPage((prev) => (data?.next ? prev + 1 : prev))}
              disabled={!data?.next}
              className={`p-2 ${!data?.next ? 'text-gray-300' : 'text-main'}`}
            >
              <FontAwesomeIcon icon={faAnglesRight} size='lg' />
            </button>
          </div>
        </div>
      </Fragment>
    </div>
  );
}
export default OrderAdminPage;

