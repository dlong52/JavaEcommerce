import React, { useEffect, useState } from 'react'
import helpers from '../../utils/helper';

const ProductItem = ({ data }) => {
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState(data?.images)
    const handleImageLoaded = () => {
        setLoading(false);
    }
    const handleImageError = () => {
        setLoading(false);
    }
    useEffect(() => {
        if (data) {
            setImages(JSON.parse(data?.images))
        }
    }, [data])
    return (
        <div className="w-full overflow-hidden">
            <div className="flex flex-col gap-y-3">
                <a className='overflow-hidden h-[310px] rounded-[7px] w-full' href={`/shop/${data?.productId}`}>
                    {loading && <div className="w-full h-[310px] flex items-center justify-center bg-gray-200 rounded-[7px] animate-blink"></div>
                    }
                    <img
                        className={` max-h-[340px] w-full ${loading ? 'hidden' : ''}`}
                        src={images[0]}
                        alt=""
                        onLoad={handleImageLoaded}
                        onError={handleImageError}
                    />
                </a>
                {!loading ?
                    <h1 className='font-medium text-[15px] text-footer text-nowrap'>{data?.name}</h1> :
                    <div className="h-[40px] w-full flex items-center justify-center bg-gray-200 rounded-[7px] animate-blink"></div>
                }
                {!loading ?
                    <div className="flex gap-x-2">
                        <h2 className='text-[16px] font-bold'>{helpers.numberFormat(helpers.roundNumber(Number(data?.price) * (1 - data?.discount / 100)))}đ</h2>
                        {
                            data?.discount > 0 &&
                            <div className="text-white bg-blue-800 rounded-[10px] px-1 text-[12px] font-bold flex items-center justify-center">-{data?.discount}%</div>
                        }
                        <h2 className='text-[16px] h-fit relative text-gray-400 font-semibold before:w-full  before:h-[1px] before:bg-gray-400 before:absolute before:top-1/2 before:-translate-y-1/2'>{helpers.numberFormat(Number(data?.price))}đ</h2>
                    </div> :
                    <div className="h-[40px] w-full flex items-center justify-center bg-gray-200 rounded-[7px] animate-blink"></div>
                }
            </div>
        </div>
    )
}

export default ProductItem;
