import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, payOrder } from '../store/slices/orderSlice';
import { ShieldCheck, Truck, CreditCard, ChevronLeft } from 'lucide-react';
import { toast } from 'react-toastify';

const OrderPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { order, loading, error, success: successPay } = useSelector((state) => state.orders);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id, successPay]);

  const payHandler = () => {
    // Mock payment result
    const paymentResult = {
      id: `PAY-${Date.now()}`,
      status: 'COMPLETED',
      update_time: new Date().toISOString(),
      email_address: userInfo.email,
    };
    dispatch(payOrder({ orderId: id, paymentResult }));
    toast.success('Payment Successful!');
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amazon_blue"></div></div>;
  if (error) return <div className="bg-red-100 text-red-700 p-4 m-10 rounded-md">{error}</div>;
  if (!order) return null;

  return (
    <div className="bg-gray-100 min-h-screen pt-10 px-4">
      <div className="max-w-screen-2xl mx-auto">
        <Link to="/" className="flex items-center text-sm text-gray-500 hover:text-amazon_yellow mb-4">
          <ChevronLeft className="h-4 w-4" />
          Back to shopping
        </Link>

        <h1 className="text-3xl font-medium mb-8">Order Summary: <span className="text-sm font-normal text-gray-500">{order._id}</span></h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 shadow-sm rounded-md border border-gray-300">
              <div className="flex items-center mb-4">
                <Truck className="h-6 w-6 mr-3 text-blue-600" />
                <h2 className="text-xl font-bold">Shipping</h2>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Name:</strong> {order.user.name}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Email:</strong> {order.user.email}
              </p>
              <p className="text-sm text-gray-700 mb-4">
                <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              <div className={`p-2 rounded-md text-sm ${order.isDelivered ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {order.isDelivered ? `Delivered on ${new Date(order.deliveredAt).toLocaleString()}` : 'Not Delivered'}
              </div>
            </div>

            <div className="bg-white p-6 shadow-sm rounded-md border border-gray-300">
              <div className="flex items-center mb-4">
                <CreditCard className="h-6 w-6 mr-3 text-blue-600" />
                <h2 className="text-xl font-bold">Payment Method</h2>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              <div className={`p-2 rounded-md text-sm ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {order.isPaid ? `Paid on ${new Date(order.paidAt).toLocaleString()}` : 'Not Paid'}
              </div>
            </div>

            <div className="bg-white p-6 shadow-sm rounded-md border border-gray-300">
              <div className="flex items-center mb-4">
                <ShieldCheck className="h-6 w-6 mr-3 text-blue-600" />
                <h2 className="text-xl font-bold">Order Items</h2>
              </div>
              <div className="space-y-4">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={item.image?.startsWith('http') ? item.image : `http://localhost:5000${item.image}`} 
                        alt={item.name} 
                        className="h-12 w-12 object-contain"
                      />
                      <Link to={`/product/${item.product}`} className="text-sm hover:underline hover:text-blue-600 line-clamp-1 max-w-md">
                        {item.name}
                      </Link>
                    </div>
                    <div className="text-sm text-right">
                      {item.qty} x ₹{item.price.toLocaleString('en-IN')} = <span className="font-bold">₹{(item.qty * item.price).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 shadow-sm rounded-md border border-gray-300 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Total</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Items</span>
                  <span>₹{order.itemsPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>₹{order.shippingPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>₹{order.taxPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold text-red-700">
                  <span>Total:</span>
                  <span>₹{order.totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {!order.isPaid && (
                <button
                  onClick={payHandler}
                  className="w-full bg-amazon_yellow text-black font-bold py-2 rounded-md transition-colors hover:bg-yellow-500 shadow-sm"
                >
                  Pay Now (Mock Payment)
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
