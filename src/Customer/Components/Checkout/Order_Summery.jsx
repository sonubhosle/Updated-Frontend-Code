import React, { useEffect } from 'react'

import { Button } from '@mui/material'
import Address_Card from '../Cards/Address_Card'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getOrderById } from '../../../State/Order/Action';
import Order_Card from '../Cards/Order_Card';

const  Order_Summery = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const orderId = searchParams.get('order_id');
  const  order  = useSelector(state => state.order)

      useEffect(() => {
    dispatch(getOrderById(orderId))
  }, [orderId])


  return (
    <div>
      <div className='p-5 border-light  border-radius border'>
        <h2 className='font-semibold text-xl mb-8'>Shipping Address</h2>
        <Address_Card address={order.order?.shippingAddress} />
      </div>
      <div className='mt-5'>
      <h2 className='font-semibold text-xl mb-8'>Orders</h2>

        <div className="lg:grid grid-cols-3 relative">
          <div className='col-span-2'>
          {
              order.order?.orderItems.map((item,index) => <Order_Card item={item} key={index} />)
            }
          </div>

          <div className="px-5 sticky top-0 h-auto mt-5 lg:mt-0">
            <div className="border rounded-md p-5 ">
              <p className='uppercase font-bold opacity-60 pb-4'>Price Details</p>
              <hr />
              <div className="space-y-2 ">
                <div className="flex justify-between pt-2 text-black ">
                  <span>Price</span>
                  <span>₹{order.order?.totalPrice}</span>
                </div>
                <div className="flex justify-between pt-2 ">
                  <span>Discount</span>
                  <span className=' text-green-600'>-₹{order.order?.discount}</span>
                </div>
                <div className="flex justify-between pt-2 text-black ">
                  <span>Delivery Charge</span>
                  <span>Free</span>
                </div>
                <hr />
                <div className="flex justify-between pt-3 text-black font-bold ">
                  <span>Total Amount</span>
                  <span className=' text-green-600'>₹{order.order?.totalDiscountPrice}</span>
                </div>
              </div>
              <Button variant='contained' className='w-full' sx={{ px: '2rem', py: '.7rem', mt: "2rem", bgcolor: "#9155fd" }} >
                Checkout
              </Button>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Order_Summery