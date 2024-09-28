import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetUser } from '../../../../redux/userSlice';
import { logoutUser } from '../../../../services/UserService';
import { useNavigate } from 'react-router-dom';

const HeaderAdmin = () => {
    const user = useSelector((state) => state?.user)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleLogout = async () => {
        localStorage.removeItem('accessToken');
        dispatch(resetUser());
        navigate("/")
        await logoutUser();
      };
    return (
        <div className="px-6 sm:px-10 bg-white border-b-2 border-gray-200">
            <div className="container mx-auto flex items-center h-20 ">
                <button className="block sm:hidden relative flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full">
                    <span className="sr-only">Menu</span>
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </button>
                <div className="relative w-full max-w-md sm:-ml-2">
                    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="absolute h-6 w-6 mt-2.5 ml-2 text-gray-400">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                    <input type="text" role="search" placeholder="Search..." className="py-2 pl-10 pr-4 w-full outline-none border-4 border-transparent placeholder-gray-400 focus:bg-gray-200 rounded-lg" />
                </div>
                <div className="flex flex-shrink-0 items-center ml-auto">
                    <button className="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg">
                        <span className="sr-only">User Menu</span>
                        <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
                            <span className="font-semibold">{user?.username}</span>
                            <span className="text-sm text-gray-600">Quản trị viên</span>
                        </div>
                        <a href="/profile" className="size-12 sm:ml-3 mr-2 flex items-center justify-center text-[20px] p-2 font-[700] bg-gray-300 text-white rounded-full ">
                            {user?.username.charAt(0)}
                        </a>
                        <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="hidden sm:block h-6 w-6 text-gray-300">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <div className="border-l pl-3 ml-3 space-x-1">
                        <button className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
                            <span className="sr-only">Notifications</span>
                            <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full"></span>
                            <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full animate-ping"></span>
                            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>
                        <button onClick={handleLogout} className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
                            <span className="sr-only">Log out</span>
                            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderAdmin
