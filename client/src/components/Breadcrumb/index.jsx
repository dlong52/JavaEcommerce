import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((item) => item);

    return (
        <nav className="breadcrumb flex items-center space-x-1 my-5">
            <Link className="text-gray-600 font-medium hover:underline" to="/">Trang chủ</Link>
            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                if(value === "cart")
                    value = "Giỏ hàng"
                else if(value === "shop")
                    value = "Cửa hàng"
                return (
                    <span key={to} className="flex items-center space-x-1">
                        <FontAwesomeIcon icon={faAngleRight} size="sm" className="text-gray-600 mt-1" />
                        <Link className="text-gray-600 font-medium hover:underline" to={to}>
                            {decodeURIComponent(value.charAt(0).toUpperCase() + value.slice(1))}
                        </Link>
                    </span>
                );
            })}
        </nav>
    );
};

export default Breadcrumb;
