import React from 'react'
import { sidebarRouter } from '../../../../routes'
import { logo, logoHz } from '../../../../assets'

const Sidebar = () => {
    const routeAcctiveStyle = "my-3 flex items-center px-3 py-2 rounded-md "
    const currentPath = window.location.pathname
    return (
        <div className=' fixed top-0 bottom-0 left-0 w-[250px] bg-main p-5'>
            <div className="">
                <img src={logoHz} alt="" />
            </div>
            <div className="flex flex-col mt-[30px]">
                {sidebarRouter.map((route, index) => {
                    return (
                        <a
                            href={route.path}
                            key={index}
                            className={route.path == currentPath ? `${routeAcctiveStyle} bg-primary text-white` : `${routeAcctiveStyle} text-gray-400 hover:bg-gray-600 hover:text-white`}
                        >
                            {route.icon}
                            <span className='ml-[20px]' >{route.name}</span>
                        </a>
                    )
                })}
            </div>
        </div>
    )
}

export default Sidebar
