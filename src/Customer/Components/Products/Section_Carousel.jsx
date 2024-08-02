import React, { useEffect, useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Product_Carousel_Card from '../Cards/Product_Carousel_Card';
import axios from 'axios';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 7,
        slidesToSlide: 1
    },
    largeDesktop: {
        breakpoint: { max: 3000, min: 1600 },
        items: 6,
        slidesToSlide: 1
    },
    desktop: {
        breakpoint: { max: 1600, min: 1024 },
        items: 5,
        slidesToSlide: 1
    },
    smallDesktop: {
        breakpoint: { max: 1024, min: 800 },
        items: 3,
        slidesToSlide: 1
    },
    tablet: {
        breakpoint: { max: 800, min: 464 },
        items: 2,
        slidesToSlide: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1
    }
};


const ButtonGroup = ({ next, previous, ...rest }) => {
    return (
        <div className="button-group">
            <button className='prev-btn' onClick={previous}><ChevronLeftIcon /></button>
            <button className='next-btn' onClick={next}><ChevronRightIcon /></button>
        </div>
    );
};

const Section_Carousel = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products');
                setProducts(res.data);
            } catch (error) {
                alert('Products Not Found');
            }
        };
        fetchProducts();
    }, []);

    const items = products?.content?.length > 0 ? products?.content.map((item, ind) => (
        <Product_Carousel_Card key={ind} product={item} index={ind} />
    )) : null;

    return (
        <div className='bg-white rounded-md p-5'>
            <h2 className='text-[20px] font-bold pl-2'>Top Products</h2>
            {items ? (
                <Carousel  className='slider-section'
                    autoPlay
                    infinite
                    responsive={responsive}
                    arrows={false}
                    renderButtonGroupOutside
                    customButtonGroup={<ButtonGroup />}
                >
                    {items}
                </Carousel>
            ) : (
                <p>Loading products...</p>
            )}
        </div>
    );
};

export default Section_Carousel;
