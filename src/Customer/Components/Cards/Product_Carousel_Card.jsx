import React from 'react'
import { FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import './Style.css'
const Product_Carousel_Card = ({product}) => {

 const navigate = useNavigate()
  const handleProductDetails = () =>{
    navigate(`/product/${product._id}`)
  }
  return (
    <div onClick={handleProductDetails} className='product_carousel_card cursor-pointer border'>
        <div className="poster">
            <img src={product.imageUrl} alt="" />
        </div>
        <div className="product_info">
          <div className="brand">{product.brand}</div>
          <div className="title">{product.title}</div>
          <div className="price_box flex items-center gap-3">
            <div className="discounted_price ">&#8377;{product.discountedPrice}</div>
            <div className="price line-through">&#8377;{product.price}</div>
            <div className="discount">{product.discountPersent}% Off</div>
          </div>
          <div className="rating_stock">
            <div className="rating">4.5 <FaStar className='flex items-center' size={13} /></div>
            <div className="stock">Qty: {product.quantity}</div>
          </div>
        </div>
    </div>
  )
}

export default Product_Carousel_Card