import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const NotifyOrderSuccess = ({ close, orderId }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center min-w-[300px] flex items-center flex-col gap-y-6 relative">
                <h2 className="text-xl font-bold text-gray-800">Đặt hàng thành công!</h2>
                <FontAwesomeIcon icon={faCircleCheck} className='text-[50px] text-green-800' />
                <p className="text-gray-700 w-4/5">Trên thị trường có quá nhiều sự lựa chọn, cảm ơn bạn đã lựa chọn mua sắm tại Coolmate.me</p>
                <a href={`/profile/order/${orderId}`} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600">
                    Thông tin đơn hàng
                </a>
                <button onClick={()=>{close()}} className='text-[15px] font-medium text-gray-600'>Đóng</button>
            </div>
        </div>
    );
};

export default NotifyOrderSuccess;
