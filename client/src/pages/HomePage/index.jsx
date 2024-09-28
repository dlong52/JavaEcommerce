import React, { useState } from 'react'
//Images
import {
  banner1,
  banner2,
  banner3,
} from '../../assets'
// Components
import {
  ProductItem,
  Slider,
} from '../../components'
import Banner from '../../components/Banner'
import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '../../services/ProductServices'

const HomePage = () => {
  const page_size = 5;
  const queryProducts = useQuery({
    queryKey: ['products', { pagesize: page_size }],
    queryFn: getAllProducts,
    onError: (error) => console.error('Error fetching products:', error),
  });
  const data = queryProducts?.data?.content
  return (
    <div className='relative'>
      <div className="">
        <Slider />
        <div className="container mx-auto mt-[40px]">
          <div className="flex items-end justify-between">
            <h1 className='font-bold text-[25px] text-footer my-1'>Sản phẩm mới</h1>
            <a className='text-main font-[500] underline' href="">Xem thêm</a>
          </div>
          <div className="grid grid-cols-10 gap-4">
            {data?.map((product, index) => {
              return (
                <div key={index} className="col-span-2">
                  <ProductItem data={product}/>
                </div>
              )
            })}
          </div>
        </div>
        <div className="mt-[40px]">
          <Banner background={banner1} title={"Đồ chạy bộ"} des={"Mua 2 bất kỳ giảm thêm 5%"} />
        </div>
        <div className="mt-[40px]">
          <Banner background={banner2} title={"MẶC HÀNG NGÀY"} des={"Giảm thêm 10% khi mua từ 2 sản phẩm bất kỳ"} />
        </div>
        <div className="mt-[40px]">
          <Banner background={banner3} title={"Quần lót"} des={"Tặng 01 Túi Tote Canvas (một số sản phẩm)"} />
        </div>
      </div>
    </div>
  )
}
export default HomePage