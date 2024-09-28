import React from 'react'
import Header from '../components/Header'

const NoFooterLayout = ({ children }) => {
  return (
    <div className=''>
      <Header />
      <div className="bg-white pt-[0px] pb-[40px]">
        {children}
      </div>
    </div>
  )
}

export default NoFooterLayout
