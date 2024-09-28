import React, { useState } from 'react';
import { COD, email, paypal } from '../../assets';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getAllCartItems } from '../../services/CartServices';

const PaymentPage = () => {
  const user = useSelector((state) => state.user);
  
  return (
   <div className="">
    
   </div>
  );
};

export default PaymentPage;
