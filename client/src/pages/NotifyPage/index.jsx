import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const NotifyPage = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-8 min-h-[300px] mx-auto text-center">
      <FontAwesomeIcon className="text-4xl text-gray-400 mb-4"  icon={faBell} />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Không có thông báo</h2>
      <p className="text-gray-600">Bạn không có thông báo nào tại thời điểm này.</p>
    </div>
  );
}

export default NotifyPage;
