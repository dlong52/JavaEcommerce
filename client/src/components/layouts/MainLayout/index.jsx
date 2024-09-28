import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const MainLayout = ({ children }) => {
  return (
    <div className=''>
      <Header />
      <div className="bg-white pt-[0px] pb-[40px]">
        {children}
      </div>
      <Footer />
    </div>
  )
}
export default MainLayout
