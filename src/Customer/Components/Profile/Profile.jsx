import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getUser, logout } from '../../../State/Auth/Action';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Style.css';
import Order_Card from '../Cards/Order_Card';
import { Button } from '@mui/material';

const Profile = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector(state => state.auth);
  const order = useSelector(state => state.order)

  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    if (auth.user && auth.user.address) {
      setAddresses(auth.user.address);
    }
  }, [auth.user]);

  const deleteAddress = async (id) => {
    try {
      // Make an API call to delete the address
      await axios.delete(`http://localhost:5000/api/user/address/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      const updatedAddresses = addresses.filter(address => address._id !== id);
      setAddresses(updatedAddresses);
      // Show a toast notification
      toast.success('Address deleted successfully!');
    } catch (error) {
      console.error('Error deleting address:', error);
      toast.error('Failed to delete address.');
    }
  };



  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };




  return (
    <div className='user_profile'>
      <ToastContainer />
      <h2>{auth.user?.firstName}'s Profile  & Addresses ({addresses.length})</h2>
      <div className="user_details">
        <div className="user_box">
          <div className="item">
            <div className="name">Username :</div> <p>{auth.user?.firstName} {auth.user?.lastName}</p>
          </div>
          <div className="item">
            <div className="name"> Email :</div> <p>{auth.user?.email}</p>
          </div>
          <div className="item">
            <div className="name"> Mobile: </div><p>{auth.user?.mobile}</p>
          </div>
          <button onClick={handleLogout} className='logout_btn'>
            Logout
          </button>
        </div>
        <div className="user_address">
           <div className="address_grid">
           {addresses.map((item, index) => (
            <div className="address_card" key={item._id}>
              <div className="user_name">Name : {item.firstName} {item.lastName}</div>
              <div className="email">Email : {item.email}</div>
              <div className="name">Mobile : {item.mobile}</div>
              <div className="name">Pincode : {item.zipCode}</div>
              <div className="name">Street : {item.streetAddress}</div>
              <div className="state_city">
                <div className="city">City : {item.city}</div>
                <div className="city">State : {item.state}</div>
              </div>
        
              <button onClick={() => deleteAddress(item._id)}>Delete</button>
            </div>
          ))}
           </div>
        </div>
      </div>
      <h2>{auth.user?.firstName}'s Orders</h2>

      <div className="lg:grid grid-cols-3 relative">
        <div className='col-span-2'>
          {
            order.order?.orderItems.map((item, index) => <Order_Card item={item} key={index} />)
          }
        </div>

        <div className="px-5 sticky top-0 h-auto mt-5 lg:mt-0 ">
          <div className="border rounded-md p-5 bg-white ">
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
  );
};

export default Profile;
