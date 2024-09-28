import React from 'react'
import Sidebar from '../components/Sidebar'
import HeaderAdmin from '../components/HeaderAdmin'

const AdminLayout = ({children}) => {
  return (
    <div className='relative'>
      <Sidebar/>
      <div className='w-full bg-[#f3f6fb] min-h-screen absolute right-0' style={{ width: "calc(100% - 250px)" }}>
        <HeaderAdmin/>
        <div className="">
            {children}
        </div>
      </div>
    </div>
  )
}
export default AdminLayout
