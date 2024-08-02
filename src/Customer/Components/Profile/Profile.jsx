import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getUser, logout } from '../../../State/Auth/Action';
import { getAllOrders } from '../../../State/Order/Action'; // Import the action
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Style.css';
import Order_Card from '../Cards/Order_Card';
import { Button, Grid } from '@mui/material';

const Profile = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector(state => state.auth);
  const orders = useSelector(state => state.order.orders);
  const [addresses, setAddresses] = useState([]);

  const userId = auth.user?._id;
 
  useEffect(() => {
    if (auth.user && auth.user.address) {
      setAddresses(auth.user.address);
    }
  }, [auth.user]);

  const deleteAddress = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/address/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      const updatedAddresses = addresses.filter(address => address._id !== id);
      setAddresses(updatedAddresses);
      toast.success('Address deleted successfully!');
    } catch (error) {
      console.error('Error deleting address:', error);
      toast.error('Failed to delete address.');
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/addresses/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log(response);
      setAddresses(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
      dispatch(getAllOrders());
      fetchAddresses();
    }
  }, [jwt, dispatch, userId]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className='user_profile'>
      <h2>{auth.user?.firstName}'s Profile & Addresses ({addresses.length})</h2>
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
 
      <div className='bg-light rounded-md p-5'>
        <h2 className='text-2xl font-bold pb-5'>Orders </h2>
        <div className="order_grid">
          {orders.map((order) => <Order_Card key={order.id} order={order} />)}
        </div>
      </div>
    </div>
  );
};

export default Profile;


 
