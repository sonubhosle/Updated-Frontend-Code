import React, { useEffect, useState } from 'react';
import Product_Card from '../Cards/Product_Card';
import axios from 'axios';
import Loading from '../Loading/Loading';

const Home_Products = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch products.');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
<>
<h2 className='heading text=[20px]'>Products</h2>
<div className='products_grid p-5'>
      {loading ? (
        <div className="loading_products">
          <span class="loader"></span>
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : products && products.content && products.content.length > 0 ? (
        products.content.map((item, index) => (
          <Product_Card product={item} key={index} />
        ))
      ) : (
        <div className='error'>No Products Found</div>
      )}
    </div>
</>
  );
};

export default Home_Products;
