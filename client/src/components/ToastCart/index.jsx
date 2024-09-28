import React from 'react'
import helpers from '../../utils/helper'

const ToastCart = ({ data, status }) => {
    return (
        <div
            className={`transition-transform duration-300 ease-in-out fixed top-[30px] right-0 z-50 p-4 bg-white rounded-lg shadow-toast flex flex-col gap-4 
                ${status ? "translate-x-0" : "translate-x-full"}`}
        >
            <span className='pb-2 border-b border-gray-300 font-semibold'>Đã thêm vào giỏ hàng!</span>
            <div className="flex justify-between gap-4">
                <img className='h-[110px] object-cover rounded-[10px]' src={data?.image} alt="" />
                <div className="flex flex-col w-[200px]">
                    <span className='font-semibold'>{data?.name}</span>
                    <span>{data?.size}</span>
                    <span className='font-medium'>{helpers.numberFormat(data?.price)}đ</span>
                </div>
            </div>
            <a href="/cart" className="w-full py-2 px-2 border-2 bg-black text-white rounded-[10px] block text-center">
                Xem giỏ hàng
            </a>
        </div>
    )
}

export default ToastCart;
