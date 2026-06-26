import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../store/slices/cartSlice';

const PaymentPage = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center pt-10 px-4">
      <div className="w-full max-w-xl">
        {/* Checkout Steps Placeholder */}
        <div className="flex items-center justify-between mb-10 text-xs font-bold text-gray-500 uppercase tracking-wider">
          <div className="text-gray-400">1. Shipping</div>
          <div className="text-orange-600">2. Payment</div>
          <div>3. Place Order</div>
        </div>

        <h1 className="text-3xl font-medium mb-6">Select a payment method</h1>

        <form onSubmit={submitHandler} className="border border-gray-300 rounded-md p-8 space-y-6 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center p-4 border rounded-md hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === 'PayPal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-4 w-4 text-amazon_blue focus:ring-amazon_yellow"
              />
              <label htmlFor="PayPal" className="ml-4 flex-grow cursor-pointer">
                <p className="font-bold">PayPal or Credit Card</p>
                <p className="text-xs text-gray-500">Fast, secure and convenient.</p>
              </label>
            </div>

            <div className="flex items-center p-4 border rounded-md hover:bg-gray-50 cursor-pointer opacity-50">
              <input
                type="radio"
                id="Stripe"
                name="paymentMethod"
                value="Stripe"
                disabled
                className="h-4 w-4 text-amazon_blue focus:ring-amazon_yellow"
              />
              <label htmlFor="Stripe" className="ml-4 flex-grow cursor-pointer">
                <p className="font-bold">Stripe (Coming Soon)</p>
                <p className="text-xs text-gray-500">Direct credit card payments.</p>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amazon_yellow text-black font-bold py-2 rounded-md transition-colors hover:bg-yellow-500 shadow-sm mt-4"
          >
            Use this payment method
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
