import React, { memo } from 'react'
import './style.css'
const LazyWait = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex flex-col gap-y-3">
        <div className="rounded-[7px] max-h-[340px] w-full bg-slate-500"></div>
        <h1 className='font-medium text-[15px] text-footer bg-slate-500 w-full h-[50px]'></h1>
        <div className="flex gap-x-2 bg-slate-500 w-full h-[50px]"></div>
      </div>
    </div>
  )
}

export default LazyWait
