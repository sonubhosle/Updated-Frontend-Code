import React from 'react'

const Order_Card = ({ item }) => {
  
  return (
    <div className='p-3 mb-4 border-light box-shadow border-radius  border bg-white '>
      <div className="flex ">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img className='w-full h-full object-cover object-top' src={item.product?.imageUrl} alt="" />
        </div>
        <div className="ml-5 space-y-l">
          <p className='font-semibold '>{item.product.title}</p>
          <p className='opacity-70 '> Size : {item.size}</p>
          <p className='opacity-70 mt-1 '>{item.brand}</p>
          <div className="flex space-x-5 items-center  text-gray-900 pt-2">
            <p className="font-semibold"> ₹{item.discountedPrice}</p>
            <p className=' opacity-50 line-through'>₹{item.price} </p>
            <p className='text-green-600 font-semibold'>{item.product.discountPersent}% off</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order_Card