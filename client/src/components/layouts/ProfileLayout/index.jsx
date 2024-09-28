import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { faBell, faClipboardList, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProfileLayout = ({ children }) => {
    const location = useLocation(); 
    return (
        <div>
            <Header />
            <div className="bg-white pt-5 pb-10">
                <div className="container mx-auto flex py-5 gap-x-6 text-gray-600">
                    <div className="min-w-[250px] bg-white p-6 rounded-lg shadow-md">
                        <a className='font-bold text-xl pb-4 border-b block text-gray-800' href="">
                            Hồ sơ của tôi
                        </a>
                        {/* Sidebar */}
                        <div className="mt-6 space-y-4">
                            <a
                                className={`flex items-center py-2 px-3 rounded-md transition ${
                                    location.pathname === '/profile' ? 'bg-gray-100 text-gray-900 font-semibold' : 'hover:bg-gray-100 text-gray-700'
                                }`}
                                href="/profile"
                            >
                                <div className="w-[25px] text-gray-500">
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                <span className='ml-3'>Tài khoản</span>
                            </a>

                            <a
                                className={`flex items-center py-2 px-3 rounded-md transition ${
                                    location.pathname === '/profile/order' ? 'bg-gray-100 text-gray-900 font-semibold' : 'hover:bg-gray-100 text-gray-700'
                                }`}
                                href="/profile/order"
                            >
                                <div className="w-[25px] text-gray-500">
                                    <FontAwesomeIcon icon={faClipboardList} />
                                </div>
                                <span className='ml-3'>Đơn hàng</span>
                            </a>

                            <a
                                className={`flex items-center py-2 px-3 rounded-md transition ${
                                    location.pathname === '/profile/notify' ? 'bg-gray-100 text-gray-900 font-semibold' : 'hover:bg-gray-100 text-gray-700'
                                }`}
                                href="/profile/notify"
                            >
                                <div className="w-[25px] text-gray-500">
                                    <FontAwesomeIcon icon={faBell} />
                                </div>
                                <span className='ml-3'>Thông báo</span>
                            </a>
                        </div>
                    </div>
                    <div className="flex-grow">{children}</div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default ProfileLayout;
