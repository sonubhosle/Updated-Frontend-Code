import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOrderById } from '../../../State/Order/Action'
import { updatePayment } from '../../../State/Payments/Action'
import { Alert, AlertTitle, Grid } from '@mui/material'
import TrackOrders from '../Orders/Track_Orders'
import './Style.css'
const Payment_Success = () => {
  const [paymentId, setPaymentId] = useState()
  const [referenceId, setReferenceId] = useState()
  const [paymentStatus, setPaymentStatus] = useState()
  const {orderId} = useParams()
  const dispatch = useDispatch()

  const  {order} = useSelector(store => store)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setPaymentId(urlParams.get("razorpay_payment_link_id"));
    setPaymentStatus(urlParams.get("razorpay_payment_link_status"))
  }, [])


  useEffect(() => {

    const data = (orderId,paymentId)
        dispatch(getOrderById(orderId))
        dispatch(updatePayment(data))
  }, [orderId,paymentId])
  
  

  return (
    <div className='px-2 lg:px-36 mt-5'>
     <div className="flex flex-col justify-center items-center">
      <Alert variant='filled' severity='success' sx={{mb:6,width:"fit-content"}} >
        <AlertTitle>Payment Success</AlertTitle>
        Congratulation your order is Placed

      </Alert>

      <TrackOrders activeStep={1} />
          <div className="order_card">
            {
              order.order?.orderItems?.map((item,index) =>{
                return(
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
     </div>
    </div>
  )
}

export default Payment_Success