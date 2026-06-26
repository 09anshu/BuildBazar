import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../store/slices/cartSlice';

const ShippingPage = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center pt-10 px-4">
      <div className="w-full max-w-xl">
        {/* Checkout Steps Placeholder */}
        <div className="flex items-center justify-between mb-10 text-xs font-bold text-gray-500 uppercase tracking-wider">
          <div className="text-orange-600">1. Shipping</div>
          <div>2. Payment</div>
          <div>3. Place Order</div>
        </div>

        <h1 className="text-3xl font-medium mb-6">Select a delivery address</h1>

        <form onSubmit={submitHandler} className="border border-gray-300 rounded-md p-8 space-y-4 shadow-sm">
          <div>
            <label className="block text-sm font-bold mb-1">Full Address</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-400 rounded-sm focus:outline-none focus:border-amazon_yellow focus:ring-1 focus:ring-amazon_yellow"
              placeholder="House no, Building, Street"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">City</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-400 rounded-sm focus:outline-none focus:border-amazon_yellow focus:ring-1 focus:ring-amazon_yellow"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Postal Code</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-400 rounded-sm focus:outline-none focus:border-amazon_yellow focus:ring-1 focus:ring-amazon_yellow"
              placeholder="Postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Country</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-400 rounded-sm focus:outline-none focus:border-amazon_yellow focus:ring-1 focus:ring-amazon_yellow"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amazon_yellow text-black font-bold py-2 rounded-md transition-colors hover:bg-yellow-500 shadow-sm mt-4"
          >
            Use this address
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingPage;
