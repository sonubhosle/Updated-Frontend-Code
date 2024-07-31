import React, { useEffect, useState } from 'react';
import Product_Card from '../Cards/Product_Card';
import axios from 'axios';

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='products_grid p-5'>
      {products && products.content ? (
        products.content.map((item, index) => (
          <Product_Card product={item} key={index} />
        ))
      ) : (
        <div>No products available.</div>
      )}
    </div>
  );
};

export default Home_Products;
