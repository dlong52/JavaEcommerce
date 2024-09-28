import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { star } from '../../assets'

const FeedbackStar = () => {
  return (
    <div className='flex gap-x-1'>
      <img className='w-[20px]' src={star} alt="" />
      <img className='w-[20px]' src={star} alt="" />
      <img className='w-[20px]' src={star} alt="" />
      <img className='w-[20px]' src={star} alt="" />
      <img className='w-[20px]' src={star} alt="" />
      {/* <FontAwesomeIcon icon={faStar} style={{color: "#000",}} />
      <FontAwesomeIcon icon={faStar} style={{color: "#000",}} />
      <FontAwesomeIcon icon={faStar} style={{color: "#000",}} />
      <FontAwesomeIcon icon={faStar} style={{color: "#000",}} />
      <FontAwesomeIcon icon={faStar} style={{color: "#000",}} /> */}
    </div>
  )
} 

export default FeedbackStar
