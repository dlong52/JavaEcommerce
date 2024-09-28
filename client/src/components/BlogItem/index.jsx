import React from 'react'

const BlogItem = () => {
    return (
        <div className="col-span-4 bg-white">
            <div className="">
                <a href="">
                    <img src="https://paddy.vn/cdn/shop/articles/Cham_soc_thu_c_ng_6_720x.jpg?v=1719913887" alt="" />
                </a>
                <div className="p-5 border-x border-gray-300 border-b flex flex-col gap-y-3">
                    <a href="">
                        <h1 className='uppercase font-[700] text-[18px]'>top 3 thức ăn cho mèo mẹ và mèo con - royal canin baby cat</h1>
                    </a>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic illum itaque quasi quis maiores voluptas maxime quos voluptates quidem. Debitis?</p>
                    <a className='text-blue-600' href="">Đọc thêm</a>
                </div>
            </div>
        </div>
    )
}

export default BlogItem
