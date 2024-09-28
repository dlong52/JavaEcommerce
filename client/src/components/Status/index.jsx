import React from 'react'

export const Status = ({ status }) => {
    if (status == "pending") {
        return (<div className='px-2 py-1 rounded-full flex justify-between items-center gap-x-1 bg-orange-400 text-orange-800 w-fit h-fit'>
            <i class="fa-regular fa-circle-check"></i>
            <span className='text-sm capitalize'>{status}</span>
        </div>)
    } else if (status == "paid") {
        return (<div className='px-2 py-1 rounded-full flex justify-between items-center gap-x-1 bg-green-400 text-green-800 w-fit h-fit'>
            <i class="fa-regular fa-circle-check"></i>
            <span className='text-sm capitalize'>{status}</span>
        </div>)
    } else if (status == "cancelled") {
        return (<div className='px-2 py-1 rounded-full flex justify-between items-center gap-x-1 bg-red-400 text-red-800 w-fit h-fit'>
            <i class="fa-regular fa-circle-check"></i>
            <span className='text-sm capitalize'>{status}</span>
        </div>)
    }
}
