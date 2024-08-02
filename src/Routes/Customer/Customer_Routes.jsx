import React,{lazy,Suspense} from 'react'
import {Route,Routes} from 'react-router-dom'
const Navigation = lazy(() =>  import('../../Customer/Components/Navigation/Navigation'));
const Footer = lazy(() => import('../../Customer/Components/Footer/Footer'));
const  Home = lazy(()=> import('../../Customer/Pages/Home'));
const  Products = lazy(()=> import('../../Customer/Components/Products/Products'));
const  Product_Details = lazy(()=> import('../../Customer/Pages/Product_Details'));
const  Cart = lazy(()=> import('../../Customer/Components/Cart/Cart')); 
const  Checkout = lazy(()=> import('../../Customer/Components/Checkout/Checkout')); 
const  Orders = lazy(()=> import('../../Customer/Components/Orders/Orders')); 
const  Order_Details = lazy(()=> import('../../Customer/Pages/Order_Details'));
const  Payment_Sucess = lazy(()=> import('../../Customer/Components/Payment_Sucess/Payment_Sucess')); 
const  Profile = lazy(()=> import('../../Customer/Components/Profile/Profile'));
import Loading from '../../Customer/Components/Loading/Loading'

const Customer_Routes = () => {
  return (
    <Suspense fallback={<Loading />}>
     <Navigation />
        <Routes>
        <Route path='/login' element={<Home />} />
        <Route path='/signup' element={<Home />} />
           <Route path='/' element={<Home />} />

           <Route path='/cart' element={<Cart />} />
                <Route path='/:lavelOne/:lavelTwo/:lavelThree' element={<Products />} />
                <Route path='/product/:productId' element={<Product_Details />} />
                <Route path='/checkout/' element={<Checkout />} />
                <Route path='/account/order' element={<Orders />} />
                <Route path='/account/user-profile' element={<Profile />} />
                <Route path='/account/order/:orderId' element={<Order_Details />} />
                <Route path='/payment/:orderId' element={<Payment_Sucess />} />
        </Routes>
        <Footer />
    </Suspense>
  )
}

export default Customer_Routes