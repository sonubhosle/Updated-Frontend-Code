import React, { useEffect } from 'react';
import TrackOrders from '../Components/Orders/Track_Orders';
import { Box, Grid } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { FaRegStar } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderById, deleteOrder } from '../../State/Order/Action'; 

const Order_Details = () => {
    const { orderId } = useParams();
    const dispatch = useDispatch();

    const order = useSelector(state => state.order.order); // Fetch order from the Redux store
    const loading = useSelector(state => state.order.loading);
    const error = useSelector(state => state.order.error);

    useEffect(() => {
        dispatch(getOrderById(orderId));
    }, [dispatch, orderId]);

    const handleDeleteClick = () => {
        dispatch(deleteOrder(orderId));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!order) return <div>No order found</div>;

    return (
        <div className='space-y-5'>
            <h2 className='text-2xl font-bold '>Order Details</h2>
            <div className='bg-white rounded-md p-5 '>
                <h2 className='text-xl font-semibold pb-5 text-gray-600 '>Track Orders</h2>
                <TrackOrders activeStep={3} />
            </div>

            <Grid container className='space-y-4 bg-white rounded-md p-5'>
                <h2 className='text-xl font-semibold pb-3 text-gray-600 '>Your Orders</h2>
                {order.orderItems.map((orderItem) => (
                    <Grid key={orderItem._id} item container className='bg-white box-shadow border-radius p-2 border' sx={{ alignItems: "center" }}>
                        <Grid item xs={6}>
                            <div className='flex cursor-pointer'>
                                <img className='w-[6rem] h-[6rem] object-cover object-top' src={orderItem.product.imageUrl} alt={orderItem.product.title} />
                                <div className="ml-5 space-y-1">
                                    <p>{orderItem.product.title}</p>
                                    <p className='opacity-50 text-xs font-semibold'>
                                        <span>Color: {orderItem.product.color}</span> 
                                        <span>Size: {orderItem.size}</span>
                                    </p>
                                    <p className='opacity-50 text-xs font-semibold'>Seller: {orderItem.product.brand}</p>
                                    <p className='text-xl font-semibold'>₹{orderItem.product.price}</p>
                                </div>
                                <button className='rounded-sm text-[14px] bg-pink-700 text-white pt-1 pb-1 pl-3 pr-3' onClick={() => handleDeleteClick(order._id)}>Delete</button>

                            </div>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};



export default Order_Details