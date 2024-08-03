import { Button, IconButton } from '@mui/material'
import React from 'react'
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { removeCartItem, updateCartItem } from '../../../State/Cart/Action'
import { toast } from 'react-toastify'

const Cart_Items = ({item}) => {
    const dispatch = useDispatch()

    const handleUpdateCartItem = (num) => {
        const data = { data: { quantity: item.quantity + num }, cartItemId: item?._id }
        dispatch(updateCartItem(data));

    }

    const handleRemoveCartItem = async () => {
        try {
            await dispatch(removeCartItem(item._id));
            toast.success('Cart item removed successfully');
        } catch (error) {
            toast.error('Something went wrong');
        }
    }


    return (
        <div className='p-3 mb-4 border-light box-shadow border-radius box-shadow '>
            <div className="flex ">
                <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
                    <img className='w-full h-full object-cover object-top' src={item.product.imageUrl} alt="" />
                </div>
                <div className="ml-5 space-y-l">
                    <p className='font-semibold '>{item.product.title}</p>
                    <p className='opacity-70 '>Size :{item.size}</p>
                    <p className='opacity-70 mt-1 '>Seller : {item.brand}</p>
                    <div className="flex space-x-5 items-center  text-gray-900 pt-2">
                        <p className="font-semibold"> ₹{item.discountedPrice}</p>
                        <p className=' opacity-50 line-through'>₹{item.price} </p>
                        <p className='text-green-600 font-semibold'>{item.product.discountPersent}% off</p>
                    </div>
                    <div className="lg:flex items-center lg:space-x-2 ">
                        <div className="flex  space-x-1">
                            <IconButton sx={{ color: "RGB(145,85,253)" }}>
                                <IoRemoveCircleOutline onClick={() => handleUpdateCartItem(-1)} disabled={item.quantity <= 1} />
                            </IconButton>
                            <span className="py-2 px-2 rounded-sm" >{item.quantity}</span>
                            <IconButton sx={{ color: "RGB(145,85,253)" }}>
                                <IoAddCircleOutline onClick={() => handleUpdateCartItem(1)} />
                            </IconButton>

                        </div>
                        <Button onClick={handleRemoveCartItem} sx={{ color: "RGB(145,85,253)" }}>Remove</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Cart_Items