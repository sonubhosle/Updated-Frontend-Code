import { useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { Box, Button, Grid, Rating } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findProductsById } from '../../State/Products/Action';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify components
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import './Style.css';
import { MdChevronRight } from "react-icons/md";
import { addItemToCart } from '../../State/Cart/Action';

const product = {
    images: [
        { src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg', alt: 'Two each of gray, white, and black shirts laying flat.' },
        { src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg', alt: 'Model wearing plain black basic tee.' },
        { src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg', alt: 'Model wearing plain gray basic tee.' },
        { src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg', alt: 'Model wearing plain white basic tee.' },
    ],
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
    ],
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details: 'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: '#', average: 4, totalCount: 117 };

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const ProductDetails = () => {
    const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    const  products  = useSelector(state => state.products);

    const handleAddTocart = () => {
        const data = { productId: params.productId, size: selectedSize.name };
        dispatch(addItemToCart(data))
            .then(() => {
                toast.success('Cart added successfully!');
                navigate('/cart');
            })
            .catch(() => {
                toast.error('Failed to add to cart!');
            });
    };

    useEffect(() => {
        const data = { productId: params.productId };
        dispatch(findProductsById(data));
    }, [params.productId]);

    return (
        <div className="product_details_section">
            <ToastContainer /> {/* Add ToastContainer here */}
            <div className="images">
                <div className="poster">
                    <img src={products.product?.imageUrl} alt="" />
                </div>
                <div className="image_grid">
                    {product.images.map((item) => <img src={item.src} alt={item.alt} />)}
                </div>
            </div>
            <div className="product_data">
                <div className="breadcrumb">
                    <Link to='/'>Home</Link>
                    <p><MdChevronRight /></p>
                    <Link>Products</Link>
                    <p><MdChevronRight /></p>
                    <Link>Men's Kurta</Link>
                    <p><MdChevronRight /></p>
                    <Link>{products.product?.title}</Link>
                </div>
                <div className="brand">{products.product?.brand}</div>
                <div className="title">{products.product?.title}</div>
                <div className="mt-3">
                    <h1 className='text-sm font-medium text-gray-900'>Rating & Reviews</h1>
                    <div className="flex items-center space-x-3 mt-2">
                        <Rating name="read-only" value={4} readOnly />
                        <p className='opacity-50 text-sm'>78999 Rating</p>
                        <p className='ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500'>567 Reviews</p>
                    </div>
                </div>
                <div className="mt-3">
                    <h1 className='text-sm font-medium text-gray-900'>Price Details</h1>
                    <div className="flex items-center price_details gap-6 mt-2">
                        <p className='discounted_price'>₹{products.product?.discountedPrice} </p>
                        <p className="price line-through"> ₹{products.product?.price}</p>
                        <p className='discount'>{products.product?.discountPersent}% off</p>
                    </div>
                </div>

                <form className="mt">
                    <div className="mt-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">Color</h3>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                            <div className="color bg-yellow-500"></div>
                            <div className="color bg-blue-800"></div>
                            <div className="color bg-black"></div>
                            <div className="color bg-pink-600"></div>
                        </div>
                    </div>

                    {/* Sizes */}
                    <div className="mt-10">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">Size</h3>
                        </div>
                        <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                            <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                            <div className="flex gap-2 flex-wrap">
                                {product.sizes.map((size) => (
                                    <RadioGroup.Option
                                        key={size.name}
                                        value={size}
                                        disabled={!size.inStock}
                                        className={({ active }) =>
                                            classNames(
                                                size.inStock
                                                    ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                    : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                active ? 'border-light  ring-indigo-500' : '',
                                                'group relative flex items-center justify-center border-light border-radius text-sm font-medium uppercase hover:box-shadow focus:outline-none' // Removed sm:flex-1
                                            )
                                        }
                                        style={{ flex: '0 10 60px ', height: "50px", boxShadow: "rgba(0,0,0,0.090) 0px 0px 15px 0px" }} // Flexbox property for width
                                    >
                                        {({ active, checked }) => (
                                            <>
                                                <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                                {size.inStock ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'border' : 'border-2',
                                                            checked ? 'border-indigo-500' : 'border-transparent',
                                                            'pointer-events-none absolute -inset-px rounded-md'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <span
                                                        aria-hidden="true"
                                                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                    >
                                                        <svg
                                                            className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                            viewBox="0 0 100 100"
                                                            preserveAspectRatio="none"
                                                            stroke="currentColor"
                                                        >
                                                            <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                        </svg>
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup>
                    </div>

                    <Button onClick={handleAddTocart} variant='contained' sx={{ px: '2rem', py: '1rem', mt: "2rem", bgcolor: "#9155fd" }} >
                        Add to Cart
                    </Button>
                </form>

                <div className="mt-10">
                    <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
                    <div className="mt-4">
                        <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                            {product.highlights.map((highlight) => (
                                <li key={highlight} className="text-gray-400">
                                    <span className="text-gray-600">{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-10">
                    <h3 className="text-sm font-medium text-gray-900">Description</h3>
                    <div className="mt-2">
                        <p>{products.product?.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
