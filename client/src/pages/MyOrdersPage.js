import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Package, ChevronRight, ShoppingBag } from 'lucide-react';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      const fetchOrders = async () => {
        setLoading(true);
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
          const { data } = await axios.get('/api/orders/myorders', config);
          setOrders(data);
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [navigate, userInfo]);

  return (
    <div className="bg-gray-100 min-h-screen pt-10 px-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

        {loading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amazon_blue"></div></div>
        ) : orders.length === 0 ? (
          <div className="bg-white p-20 rounded-md shadow-sm border border-gray-200 text-center flex flex-col items-center">
            <ShoppingBag className="h-20 w-20 text-gray-200 mb-6" />
            <h2 className="text-2xl font-bold mb-4 text-gray-700">No orders yet</h2>
            <p className="text-gray-500 mb-8 max-w-sm">You haven't placed any orders with us. Start building your project today!</p>
            <Link to="/" className="bg-amazon_yellow text-black font-bold py-3 px-8 rounded-md hover:bg-yellow-500 shadow-sm transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-wrap justify-between items-center text-xs text-gray-600 font-bold uppercase tracking-wider">
                  <div className="flex space-x-8">
                    <div>
                      <p>Order Placed</p>
                      <p className="font-normal text-gray-800">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p>Total</p>
                      <p className="font-normal text-gray-800">₹{order.totalPrice.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p>Ship To</p>
                      <p className="font-normal text-gray-800 text-blue-600 hover:underline cursor-pointer">{userInfo.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p>Order # {order._id}</p>
                    <Link to={`/order/${order._id}`} className="text-blue-600 hover:underline lowercase font-normal">View order details</Link>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className={`h-3 w-3 rounded-full mr-3 ${order.isDelivered ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                    <h3 className="text-lg font-bold">
                      {order.isDelivered ? 'Delivered' : 'Arriving Soon'}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {order.orderItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <img 
                            src={item.image?.startsWith('http') ? item.image : `http://localhost:5000${item.image}`} 
                            alt={item.name} 
                            className="h-20 w-20 object-contain"
                          />
                          <div>
                            <Link to={`/product/${item.product}`} className="text-blue-600 hover:underline font-medium line-clamp-1 max-w-md">
                              {item.name}
                            </Link>
                            <p className="text-xs text-gray-500 mt-1">Quantity: {item.qty}</p>
                            <div className="mt-4 flex space-x-4">
                              <button 
                                onClick={() => navigate(`/product/${item.product}`)}
                                className="bg-amazon_yellow text-black text-xs font-bold py-2 px-4 rounded-md hover:bg-yellow-500 shadow-sm"
                              >
                                Buy it again
                              </button>
                              <button className="bg-white border border-gray-300 text-black text-xs font-bold py-2 px-4 rounded-md hover:bg-gray-50 shadow-sm">
                                Track package
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="hidden md:block">
                          <Link to={`/product/${item.product}/review`} className="text-sm text-blue-600 hover:underline block mb-2">Write a product review</Link>
                          <button className="text-sm text-blue-600 hover:underline">Return or replace items</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
