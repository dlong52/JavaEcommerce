import React from 'react';

const WidgetItem = ({ content, title, icon }) => {
    return (
        <a 
            className="transform hover:scale-105 transition duration-300 shadow-lg rounded-lg col-span-12 sm:col-span-6 xl:col-span-4 bg-white"
            href="#"
        >
            <div className="p-6 flex flex-col">
                <div className="flex justify-between items-center">
                    {icon}
                    <div className="bg-green-500 rounded-full h-8 w-8 flex items-center justify-center text-white font-semibold text-sm">
                        <span className="flex items-center">30%</span>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="text-3xl font-bold leading-8 text-gray-800">{content}</div>
                    <div className="mt-1 text-base text-gray-500">{title}</div>
                </div>
            </div>
        </a>
    );
};

export default WidgetItem;
