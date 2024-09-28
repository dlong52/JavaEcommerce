import React from 'react'

const Banner = ({ background, path, title, des }) => {
    return (
        <div className='bg-slate-500 w-full h-[470px]' style={{
            background: `url(${background}) no-repeat center center`, 
            backgroundSize: '100%'
        }}>
            <div className="container mx-auto flex flex-col justify-end h-full py-[70px]">
                <h1 className='font-bold text-[70px] uppercase'>{title}</h1>
                <span className='font-medium my-3'>{des}</span>
                <a className='px-8 py-4 rounded-full bg-blue-700 text-white w-fit mt-4' href="">Khám phá ngay</a>
            </div>
        </div>
    )
}

export default Banner
