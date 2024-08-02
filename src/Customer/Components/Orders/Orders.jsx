import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import './Style.css'
import Order_Card from '../Cards/Order_Card';
import { getAllOrders } from '../../../State/Order/Action';

const orderStatus = [
    { label: "On the way", value: "on_the_way" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Returned", value: "returned" },
];

const Orders = () => {
    const orders = useSelector(state => state.order.orders); 
    const dispatch = useDispatch(); // Get the dispatch function

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    return (
        <div className='bg-light rounded-md p-5'>
            <h2 className='text-2xl font-bold pb-5'>Orders </h2>
            <Grid container sx={{ justifyContent: 'space-between' }}>
                <Grid item xs={2.5}>
                    <div className="h-autop-5 bg-white  sticky top-20 p-5">
                        <h1 className='font-bold text-lg'> Filter</h1>
                        <div className="space-y-4 mt-5">
                            <h1 className='font-semibold'> ORDER STATUS</h1>
                            {
                                orderStatus.map((option) => (
                                    <div className='flex items-center' key={option.value}>
                                        <input className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500' defaultValue={option.value} type="checkbox" />
                                        <label className='ml-3 text-sm text-gray-600' htmlFor={option.value}>{option.label}</label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </Grid>
                <Grid item xs={9.5}>
                    {
                        orders.map((order) => <Order_Card key={order.id} order={order} />)
                    }
                </Grid>
            </Grid>
        </div>
    );
};

export default Orders;
