import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { AdressForm } from '../../components'

const ChangeAddressPage = () => {
    const [isShowAddressForm, setIsShowAddressForm] = useState(false)
    const showAddressForm = () => {
        setIsShowAddressForm(!isShowAddressForm)
    }
    return (
        <div className='flex-1 bg-white rounded-[5px] p-5'>
            {isShowAddressForm && <AdressForm showAddressForm={showAddressForm} />}
            <div className="pb-3 border-b-2 flex justify-between items-center">
                <h1 className="text-[20px] font-bold">Địa chỉ của tôi</h1>
                <button
                    onClick={showAddressForm}
                    className='bg-main text-white px-4 py-1 rounded-[5px] flex gap-x-2 items-center'
                >
                    <FontAwesomeIcon icon={faPlus} />
                    
                </button>
            </div>
            <div className="">
                <div className="mt-[20px] flex justify-between">
                    <div className="flex flex-col gap-y-1">
                        <div className="flex items-center gap-x-1">
                            <h1 className='font-semibold text-[18px]'>Nguyễn Long</h1>
                            <span>(+84) 341234567</span>
                        </div>
                        <span>Thanh Bồng, Thanh Nghị, Thanh Liêm, Hà Nam</span>
                        <span className='border-[2px] border-main text-main w-fit px-2'>Mặc định</span>
                    </div>
                    <div className="flex flex-col items-end gap-y-1">
                        <button className='text-main'>Cập nhật</button>
                        {/* <button className='border-[2px] border-[#051c42] text-footer px-2 p-1 rounded-[5px]'>Thiết lập mặc định</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangeAddressPage
