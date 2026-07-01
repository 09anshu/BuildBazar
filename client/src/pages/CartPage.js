import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../store/slices/cartSlice';
import { Trash2, ChevronLeft, ShieldCheck } from 'lucide-react';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-medium mb-6">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-3 bg-white p-6 shadow-sm rounded-md">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl mb-4">Your Shopping Cart is empty.</p>
                <Link to="/" className="text-blue-600 hover:underline flex items-center justify-center">
                  <ChevronLeft className="h-4 w-4" />
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.product} className="flex flex-col sm:flex-row items-center justify-between border-b pb-6 last:border-0">
                    <div className="flex items-center space-x-6 w-full sm:w-auto mb-4 sm:mb-0">
                      <Link to={`/product/${item.product}`}>
                        <img 
                          src={item.image?.startsWith('http') ? item.image : `http://localhost:5000${item.image}`} 
                          alt={item.name} 
                          className="h-24 w-24 object-contain"
                        />
                      </Link>
                      <div>
                        <Link to={`/product/${item.product}`} className="text-lg font-medium hover:text-blue-600 line-clamp-2">
                          {item.name}
                        </Link>
                        <p className="text-xs text-green-700 font-bold mt-1">In Stock</p>
                        <p className="text-xs text-gray-500 mt-1">Eligible for FREE Shipping</p>
                        <div className="flex items-center mt-3 space-x-4">
                          <div className="flex items-center bg-gray-100 rounded-md border border-gray-300 overflow-hidden">
                            <span className="px-2 text-xs font-bold text-gray-600">Qty:</span>
                            <input 
                              type="number"
                              min="1"
                              max={item.countInStock}
                              value={item.qty} 
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                if (val > 0 && val <= item.countInStock) {
                                  dispatch(addToCart({ ...item, qty: val }));
                                }
                              }}
                              className="bg-transparent p-1.5 w-16 text-sm outline-none font-semibold text-center border-l border-gray-300"
                            />
                          </div>
                          <button 
                            onClick={() => removeFromCartHandler(item.product)}
                            className="text-xs text-blue-600 hover:underline flex items-center"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="text-right w-full sm:w-auto">
                      {item.basePrice && item.price < item.basePrice && (
                        <div className="flex flex-col items-end">
                          <p className="text-xs text-gray-400 line-through">₹{item.basePrice.toLocaleString('en-IN')}</p>
                          <p className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded mb-1 border border-emerald-100">
                            Bulk Discount Applied!
                          </p>
                        </div>
                      )}
                      <p className="text-xl font-bold">₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Subtotal */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 shadow-sm rounded-md sticky top-24">
              <div className="flex items-center text-green-700 mb-4">
                <ShieldCheck className="h-6 w-6 mr-2" />
                <p className="text-xs">Your order qualifies for FREE Shipping. Choose this option at checkout.</p>
              </div>
              
              <p className="text-lg mb-4">
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items): 
                <span className="font-bold text-xl ml-2">₹{itemsPrice.toLocaleString('en-IN')}</span>
              </p>

              <button 
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
                className={`w-full font-bold py-2 rounded-md transition-colors ${
                  cartItems.length === 0 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-amazon_yellow hover:bg-yellow-500 text-black'
                }`}
              >
                Proceed to Buy
              </button>

              <div className="mt-6 border-t pt-4">
                <p className="text-xs text-gray-500">
                  The price and availability of items at BuildBazaar are subject to change. 
                  The Cart is a temporary place to store a list of your items and reflects each item's most recent price.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
