import React from 'react'
import { useNavigate } from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
const Product_Card = ({product}) => {
  const navigate = useNavigate()
  const handleProductDetails = () =>{
    navigate(`/product/${product._id}`)
  }

  return (
    <div onClick={handleProductDetails} className='product_card cursor-pointer'>
        <div className="poster">
           <img src={product?.imageUrl} alt="" />
        </div>
        <div className="product_info">
          <div className="brand">{product?.brand}</div>
          <div className="title">{product?.title}</div>
          <div className="price_box flex items-center gap-3">
            <div className="discounted_price ">&#8377;{product?.discountedPrice}</div>
            <div className="price line-through">&#8377;{product?.price}</div>
            <div className="discount">{product?.discountPersent}% Off</div>
          </div>
          <div className="rating_stock">
            <div className="rating">4.5 <FaStar className='flex items-center' size={13} /></div>
            <div className="stock">Stock:{product?.quantity}</div>
          </div>
        </div>
    </div>
  )
}

export default Product_Card