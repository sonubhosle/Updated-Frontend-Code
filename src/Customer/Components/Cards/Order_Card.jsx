import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdjustIcon from '@mui/icons-material/Adjust';
import { deleteOrder } from '../../../State/Order/Action';
import './Style.css';
import { toast } from 'react-toastify';

const Order_Card = ({ order }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOrderClick = (orderId) => {
    navigate(`/account/order/${orderId}`);
  };

  const handleDeleteClick = (orderId) => {
    dispatch(deleteOrder(orderId));
    toast.success('Order deleted successfully!');

  };

  return (
    <div className='order_card'>
      {order?.orderItems?.length ? (
        order.orderItems.map((orderItem) => (
          <div className='order_items' key={orderItem.product.id || orderItem.product._id}>
            <img src={orderItem.product.imageUrl} alt={orderItem.product.title} />
            <div className="product_info">
              <div className="font-semibold text-sm text-gray-600 pt-1 pb-1">{orderItem.product.brand}</div>
              <div className="name" onClick={() => handleOrderClick(order._id)}>{orderItem.product.title}</div>
              <div className="flex items-center gap-4">
                <div className='text-[14px] flex items-center gap-1'>Size: {orderItem.size}</div>
                <div className='text-[14px] flex items-center gap-1'>Color: {orderItem.product.color}</div>
              </div>
              <div className='text-[17px] flex items-center gap-1 pt-2 font-semibold text-sm text-indigo-600'>₹{orderItem.product.price}</div>
              <div className="absolute flex gap-4 bottom-3 right-3">
                <button className='rounded-sm text-[14px] bg-indigo-700 text-white pt-1 pb-1 pl-3 pr-3' onClick={() => handleOrderClick(order._id)}>View</button>
                <button className='rounded-sm text-[14px] bg-pink-700 text-white pt-1 pb-1 pl-3 pr-3' onClick={() => handleDeleteClick(order._id)}>Cancel</button>
              </div>
            </div>
            <div className='delivery_status'>
              {order.orderStatus === 'PENDING' ? (
                <p>
                  <AdjustIcon sx={{ width: '15px', height: '15px' }} className='text-green-600 mr-2 text-sm' />
                  <span>Expected Delivery: {new Date(order.orderDate).toLocaleDateString()}</span>
                </p>
              ) : (
                <p>
                  <AdjustIcon sx={{ width: '15px', height: '15px' }} className='text-green-600 mr-2 text-sm' />
                  <span>Delivered On: {new Date(order.orderDate).toLocaleDateString()}</span>
                </p>
              )}
              <p className='text-xs'>Your item has been {order.orderStatus === 'PENDING' ? 'ordered' : 'delivered'}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No order items available.</p>
      )}
    </div>
  );
};

export default Order_Card;
