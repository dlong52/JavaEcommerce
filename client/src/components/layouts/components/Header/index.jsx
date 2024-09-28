import React, { Fragment, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { headerRoutes } from '../../../../routes';
import { cart, heart, logo } from '../../../../assets';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../../services/UserService';
import { resetUser } from '../../../../redux/userSlice';
import { useQuery } from '@tanstack/react-query';
import { getAllCartItems } from '../../../../services/CartServices';

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname + location.hash;
  const queryCarts = useQuery({
    queryKey: ['cart', user?.userId],
    queryFn: () => getAllCartItems(user?.userId),
  });

  const handleLogout = async () => {
    localStorage.removeItem('accessToken');
    dispatch(resetUser());
    await logoutUser();
  };

  return (
    <Fragment>
      <div className='relative'>
        <div className="py-[20px] bg-main">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <a href="/"><img className='h-[60px]' src={logo} alt="Logo" /></a>
              <form name='name' action='/search' className="flex flex-1 mx-[30px] bg-white h-[40px] rounded-[5px] overflow-hidden">
                <input name='name' className='h-full flex-1 pl-[20px] outline-none' placeholder='Tìm kiếm...' type="text" />
              </form>
              <div className="flex gap-6">
                <a className='relative h-[40px]' href="">
                  <img className='h-full' src={heart} alt="Favorites" />
                </a>
                <a className='relative h-[40px]' href="/cart">
                  <img className='h-full' src={cart} alt="Cart" />
                  <span className='bg-main-yellow absolute -top-[5px] -right-[5px] text-white px-[5px] font-medium rounded-full'>{queryCarts?.data?.items?.length}</span>
                </a>
                {!user?.username ? (
                  <a className='h-[40px] text-[14px] p-2 font-[600] bg-white text-main rounded-[5px]' href="/signin">Đăng nhập</a>
                ) : (
                  <div className="relative group">
                    {user?.image ? (
                      <a href="/profile"><img className='w-[40px] h-[40px] rounded-full object-cover' src={user?.image} alt='Avatar' /></a>
                    ) : (
                      <a href="/profile" className="w-[40px] h-[40px] flex items-center justify-center text-[20px] font-[700] bg-gray-300 text-white rounded-full">
                        {user?.username.charAt(0)}
                      </a>
                    )}
                    {/* Menu ẩn, sẽ hiển thị khi hover */}
                    <div className="cursor-pointer absolute bg-white flex flex-col z-50 shadow-lg rounded-[10px] right-0 mt-[5px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out before:content-[''] before:absolute before:bottom-[100%] before:right-[14px] before:border-[6px] before:border-transparent before:border-b-white font-medium">
                      <a className='px-4 py-2 text-gray-700 text-nowrap hover:bg-slate-200 hover:text-blue-700 rounded-t-[10px]' href="/profile">Thông tin người dùng</a>
                      <a className='px-4 py-2 text-gray-700 text-nowrap hover:bg-slate-200 hover:text-blue-700' href="/profile/order">Đơn hàng</a>
                      {(user?.role === "admin" || user?.role === "subadmin") && <a className='px-4 py-2 text-gray-700 text-nowrap hover:bg-slate-200 hover:text-blue-700' href="/admin">Quản lí hệ thống</a>}
                      <a onClick={handleLogout} className='px-4 py-2 text-gray-700 text-nowrap hover:bg-slate-200 hover:text-blue-700 rounded-b-[10px] cursor-pointer'>Đăng xuất</a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="shadow-md">
          <div className="container mx-auto flex justify-center">
            <div className="flex font-medium text-gray-800 text-[17px]">
              {headerRoutes.map((headerRoute, index) => (
                <a
                  key={index}
                  className={`mx-[20px] py-[10px] px-2 hover:text-[#234bbb] ${headerRoute.name === "FLASH SALE" ? "text-red-600 font-bold" : ""} ${currentPath === headerRoute.path ? "text-[#234bbb] border-b-2 border-[#234bbb]" : ""}`}
                  href={headerRoute?.path}
                >
                  {headerRoute.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default memo(Header);
