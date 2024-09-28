import React, { useEffect, useState } from 'react'
import { FeedbackStar } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { contact, location, return_0, return_60 } from '../../assets'
import { useParams } from 'react-router-dom'
import { getDetailProduct } from '../../services/ProductServices'
import helpers from '../../utils/helper'
import { addToCart } from '../../services/CartServices'
import { useSelector } from 'react-redux';
import ToastCart from '../../components/ToastCart'
import LayzyLoad from '../../components/LazyLoad'

const ProductDetail = () => {
    const user = useSelector((state) => state.user);

    const { p_id } = useParams()

    const [productDetail, setProductDetail] = useState(null)
    const [imgActive, setImgActive] = useState(0)
    const [sizeActive, setSizeActive] = useState(0)
    const [selectedSize, setSelectedSize] = useState(productDetail?.sizes[0])
    const [quantity, setQuantity] = useState(1)

    const [statusToastCart, setStatusToastCart] = useState(false)
    const [loading, setLoading] = useState(false)

    const [images, setImages] = useState([]);
    const [sizes, setSizes] = useState([]);

    useEffect(() => {
        if (p_id) {
            const fetchProductDetail = async () => {
                const res = await getDetailProduct(p_id);
                setProductDetail(res);
                if (res?.images) {
                    setImages(JSON.parse(res.images));  // Sử dụng JSON.parse để chuyển đổi chuỗi JSON sang mảng
                }
                if (res?.sizes) {
                    setSizes(JSON.parse(res.sizes));   // Tương tự với sizes
                }
                if (res?.sizes?.length > 0) {
                    setSelectedSize(res.sizes[0]);
                }
            };
            fetchProductDetail();
        }
    }, [p_id]);

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }
    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    }
    const handleAddToCart = async () => {
        if (!user?.userId) {
            alert('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng');
            return;
        }
        try {
            setLoading(true);
            if (productDetail?.stockQuantity > 0) {
                const res = await addToCart(p_id, quantity, selectedSize, user?.userId);
                if (res) {
                    setLoading(false)
                    setStatusToastCart(true);
                    const toastCartTimeout = setTimeout(() => {
                        setStatusToastCart(false);
                    }, 3000);
                } else {
                    alert('Thêm sản phẩm vào giỏ hàng thất bại. Vui lòng thử lại.');
                }
            } else {
                alert('Sản phẩm đã hết hàng')
            }
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
            alert('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.');
        }
    };


    const dataAddToCart = {
        name: productDetail?.name,
        image: images[0],
        price: helpers.roundNumber(productDetail?.price * (1 - productDetail?.discount / 100)),
        size: selectedSize
    }

    return (
        <div className='py-6'>
            <ToastCart data={dataAddToCart} status={statusToastCart} />
            <div className="container mx-auto">
                {/* <Breadcrumb /> */}
                <div className="grid grid-cols-12 gap-x-6">
                    <div className="col-span-6 grid grid-cols-12">
                        <div className="flex flex-col gap-y-2 col-span-2">
                            {
                                images.map((image, index) => {
                                    return (
                                        <img
                                            onClick={() => { setImgActive(index) }}
                                            className={`w-2/3 rounded-[6px] ${imgActive == index ? "" : " opacity-40"}`}
                                            src={image}
                                            alt=""
                                            key={index}
                                        />
                                    )
                                })
                            }
                        </div>
                        <div className="col-span-10">
                            <img className='w-full rounded-[10px]' src={images[imgActive]} alt="" />
                        </div>
                    </div>
                    <div className="col-span-6 bg-white flex flex-col gap-y-5">
                        <div className="flex flex-col gap-y-3">
                            <h1 className='text-main font-semibold text-[30px]'>{productDetail?.name}</h1>
                            <a className='-ml-[1px] flex gap-x-2 items-center text-gray-600 text-sm' href="#feedback">
                                <FeedbackStar />
                                <span>1 đánh giá</span>
                            </a>
                            {productDetail?.discount > 0 &&
                                <div className="flex gap-2 items-center text-gray-600 font-medium">
                                    <span className='before:w-full before:h-[1px] before:bg-gray-400 before:absolute before:top-1/2 before:-translate-y-1/2 text-[17px] text-gray-400 relative'>{productDetail?.price}₫</span>
                                </div>}
                            <div className=" text-[25px] font-bold flex items-center gap-x-2 text-gray-600">
                                <span className='text-black'>
                                    {
                                        productDetail?.discount > 0 ?
                                            helpers.numberFormat(helpers.roundNumber(productDetail?.price * (1 - productDetail?.discount / 100)))
                                            :
                                            helpers.numberFormat(Number(productDetail?.price))
                                    }
                                    ₫
                                </span>
                            </div>
                            <div className="">
                                <div className="flex gap-2 flex-col text-gray-600 text-[17px] font-medium">
                                    <span>Kích thước:</span>
                                    <div className="flex gap-x-3">
                                        {
                                            sizes?.map((size, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        onClick={() => {
                                                            setSizeActive(index);
                                                            setSelectedSize(size)
                                                        }}
                                                        className={`w-[79px] h-[40px] flex justify-center items-center rounded-[8px] cursor-pointer ${sizeActive === index ? "bg-black text-white" : "bg-[#d9d9d9]"}`}
                                                    >
                                                        {size}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-x-2">
                                <span>Số lượng: </span>
                                <div className="flex gap-x-3 items-center px-2 py-1 border-main text-main rounded-full">
                                    <button onClick={handleDecreaseQuantity}>
                                        <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                    <span className='font-semibold'>{quantity}</span>
                                    <button onClick={handleIncreaseQuantity}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                            </div>
                            <div className=" flex items-center gap-x-3 text-[20px] font-bold">
                                <span>Tổng số tiền: </span>
                                <span>
                                    {
                                        helpers.numberFormat(helpers.roundNumber(
                                            productDetail?.discount > 0
                                                ? productDetail?.price * (1 - productDetail?.discount / 100) * quantity
                                                : productDetail?.price * quantity
                                        ))}₫
                                </span>
                            </div>
                            <div className="mt-4 flex items-center gap-3">
                                <button
                                    onClick={handleAddToCart}
                                    className={`text-white font-medium px-6 h-[45px] rounded-full flex-1 duration-200 flex items-center justify-center ${productDetail?.stockQuantity === 0 ? 'bg-gray-600 ' : 'bg-main hover:bg-[#d9d9d9] hover:text-black'}`}
                                >
                                    {loading && <LayzyLoad />}
                                    {!loading && productDetail?.stockQuantity > 0 && "Thêm vào giỏ hàng"}
                                    {!loading && productDetail?.stockQuantity === 0 && "Sản phẩm đã hết hàng"}
                                </button>
                                <button className=" h-[45px] aspect-square rounded-full border border-gray-400 hover:bg-red-400 hover:text-red-600 hover:border-none transition-all duration-200">
                                    <FontAwesomeIcon className='' icon={faHeart} />
                                </button>
                                <button>
                                    <FontAwesomeIcon className='text-gray-600' icon={faShareNodes} size='2xl' />
                                </button>
                            </div>
                            <div className="grid grid-cols-12 gap-4 mt-[40px] text-[14px] font-medium">
                                <div className=" col-span-6 flex gap-2 items-center">
                                    <img className=' size-[35px]' src={return_0} alt="" />
                                    <span>Đổi trả cực dễ chỉ cần số
                                        điện thoại</span>
                                </div>
                                <div className=" col-span-6 flex gap-2 items-center">
                                    <img className=' size-[35px]' src={return_60} alt="" />
                                    <span>60 ngày đổi trả vì bất kỳ lý do gì</span>
                                </div>
                                <div className=" col-span-6 flex gap-2 items-center">
                                    <img className=' size-[35px]' src={contact} alt="" />
                                    <span>Hotline 1900.27.27.37 hỗ
                                        trợ từ 8h30 - 22h mỗi ngày</span>
                                </div>
                                <div className=" col-span-6 flex gap-2 items-center">
                                    <img className=' size-[35px]' src={location} alt="" />
                                    <span>Đến tận nơi nhận hàng trả,
                                        hoàn tiền trong 24h</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=""></div>
            </div>
        </div>
        // <div className=""></div>
    )
}
export default ProductDetail
