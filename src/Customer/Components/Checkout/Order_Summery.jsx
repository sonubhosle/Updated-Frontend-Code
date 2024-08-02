import React, { useEffect } from 'react'
import CartItems from '../Cart/Cart_Items'
import { Button } from '@mui/material'
import { getOrderById } from '../../../State/Order/Action'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Address_Card from '../Cards/Address_Card'
import {createPayment} from '../../../State/Payments/Action'

const Order_Summmery = () => {

  const dispatch = useDispatch();

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const orderId = searchParams.get('order_id');
  const { order } = useSelector(store => store)


  useEffect(() => {
    dispatch(getOrderById(orderId))
  }, [orderId])

  const handleCheckout = () => {
    dispatch(createPayment(orderId))
  }


  return (
    <div>
      <div className='p-5 border-light box-shadow border-radius'>
      <Address_Card address={order.order?.shippingAddress} />
      </div>
      <div className='mt-5'>
        <div className="lg:grid grid-cols-3 relative">
          <div className='col-span-2'>
            {
              order.order?.orderItems.map((item, index) => {
                return (
                  <div className='p-3 mb-4 border-light box-shadow border-radius box-shadow ' key={index}>
                    <div className="flex ">
                      <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
                        <img className='w-full h-full object-cover object-top' src={item.product.imageUrl} alt="" />
                      </div>
                      <div className="ml-5 space-y-l">
                        <p className='font-semibold '>{item.product.title}</p>
                        <p className='opacity-70 '>Size :{item.size}</p>
                        <p className='opacity-70 mt-1 '>Seller : {item.product.brand}</p>
                        <div className="flex space-x-5 items-center  text-gray-900 pt-2">
                          <p className="font-semibold"> ₹{item.discountedPrice}</p>
                          <p className=' opacity-50 line-through'>₹{item.price} </p>
                          <p className='text-green-600 font-semibold'>{item.product.discountPersent}% off</p>
                        </div>

                      </div>
                    </div>
                  </div>
                )
              })
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
              <Button onClick={handleCheckout} variant='contained' className='w-full' sx={{ px: '2rem', py: '.7rem', mt: "2rem", bgcolor: "#9155fd" }} >
                Checkout
              </Button>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Order_Summmery