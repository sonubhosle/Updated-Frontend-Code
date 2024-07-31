import React from 'react'
import './App.css'
import Customers from './Routes/Customer/Customer_Routes'
import {Route,Routes} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div >
     <Routes>
      <Route path='/*' element={<Customers />} />
     </Routes>
     <ToastContainer  className='custom-toast-container'/>
    </div>
  )
}

export default App