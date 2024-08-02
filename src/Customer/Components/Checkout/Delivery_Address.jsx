import { Box, Button, Grid, TextField, Radio, FormControl, FormControlLabel, FormLabel, RadioGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../../State/Order/Action';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Style.css'

const Delivery_Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);
  const userId = auth?.user?._id;
  const jwt = localStorage.getItem("jwt");

  // Fetching User Addresses

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/addresses/${userId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setAddresses(response.data);
        console.log("Fetched addresses:", response.data); // Log fetched addresses
      } catch (error) {
        console.log("Error fetching addresses:", error.message);
      }
    };

    if (userId && jwt) {
      fetchAddresses();
    }
  }, [userId, jwt]);

  const handleAddressSelect = (e) => {
    setSelectedAddress(JSON.parse(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let address;
    if (selectedAddress) {
      address = selectedAddress;
    } else {
      const data = new FormData(e.currentTarget);
      address = {
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        streetAddress: data.get('address'),
        city: data.get('city'),
        state: data.get('state'),
        zipCode: data.get('zip'),
        mobile: data.get('phoneNumber'),
        email: data.get('email'),
      };
    }

    const orderData = { address, navigate };
    dispatch(createOrder(orderData));
  };

  return (
    <>


      {addresses.length > 0 && (
        <div className='address_cards'>
          {addresses.map((addr, index) => (
            <div key={index} className="address_card">

              <label htmlFor={`address-${index}`} className="custom-radio-label">
                <div className="custom-radio-indicator"></div>
                <div className="address_details">
                  <div className="user_name">Name : {addr?.firstName} {addr?.lastName}</div>
                  <div className="email">Email : {addr?.email}</div>
                  <div className="name">Mobile : {addr?.mobile}</div>
                  <div className="name">Pincode : {addr?.zipCode}</div>
                  <div className="name">Street : {addr?.streetAddress}</div>
                  <div className="state_city">
                    <div className="city">City : {addr?.city}</div>
                    <div className="city">State : {addr?.state}</div>
                  </div>
                </div>
              </label>
              <div className="btns flex items-center justify-between">
                <div className="radio border">
                  <input type="radio" id={`address-${index}`} name="address" value={JSON.stringify(addr)}
                    checked={JSON.stringify(addr) === JSON.stringify(selectedAddress)}
                    onChange={handleAddressSelect}
                    className="custom-radio-input"
                  />
                </div>
                <Button variant="contained" sx={{ px: '1rem', py: '.7rem', bgcolor: "#9155fd",  }} onClick={() => dispatch(createOrder({ address: addr, navigate }))}>
                  Deliver Here
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}


      <div className="mt-8">

        {addresses.length > 0 && !showForm && (
          <Button variant="contained" sx={{ px: '2rem', py: '.7rem', bgcolor: "#9155fd", mt: 2 }} onClick={() => setShowForm(true)} >  Add New Address </Button>
        )}
      </div>

      {showForm && (
        <div className='px-5 lg:px-10'>
          <Grid container spacing={4}>
            <Grid item xs={12} lg={12}>
              <Box className="border border-0-md shadow-md p-5">
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField required id='firstName' name='firstName' label='First Name' fullWidth autoComplete='given-name' disabled={!!selectedAddress} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField required id='lastName' name='lastName' label='Last Name' fullWidth autoComplete='given-name' disabled={!!selectedAddress} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField required multiline rows={3} id='address' name='address' label='Enter Address' fullWidth autoComplete='given-name' disabled={!!selectedAddress} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField required id='city' name='city' label='City' fullWidth autoComplete='given-name' disabled={!!selectedAddress} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField required id='state' name='state' label='State/Province/Region' fullWidth autoComplete='given-name' disabled={!!selectedAddress} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField required id='zip' name='zip' label='Zip Code/Postal Code' fullWidth autoComplete='shipping postal code' disabled={!!selectedAddress} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField required id='phoneNumber' name='phoneNumber' label='Phone Number' fullWidth autoComplete='given-name' disabled={!!selectedAddress} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField required id='email' name='email' label='Email' fullWidth autoComplete='given-name' disabled={!!selectedAddress} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button type='submit' variant='contained' sx={{ px: '2rem', py: '.7rem', bgcolor: "#9155fd" }}>
                        Deliver Here
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default Delivery_Address;
