import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../store/slices/productSlice';
import { Plus, Edit, Trash2, Package, ShoppingBag, Users, TrendingUp, X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [sellerProducts, setSellerProducts] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        if (userInfo.role === 'admin') {
          const { data: users } = await axios.get('/api/users', config);
          setAllUsers(users);
          const { data: orders } = await axios.get('/api/orders', config);
          setAllOrders(orders);
          const { data: prods } = await axios.get('/api/products', config);
          setSellerProducts(prods.products);
        } else if (userInfo.role === 'seller') {
          const { data: prods } = await axios.get('/api/products/seller', config);
          setSellerProducts(prods);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userInfo, activeTab]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post('/api/products', {
        name, price, image, brand, category, countInStock, description
      }, config);
      
      toast.success('Product created');
      setShowAddForm(false);
      // Refresh products
      const { data: prods } = await axios.get(userInfo.role === 'admin' ? '/api/products' : '/api/products/seller', config);
      setSellerProducts(userInfo.role === 'admin' ? prods.products : prods);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        await axios.delete(`/api/products/${id}`, config);
        setSellerProducts(sellerProducts.filter((p) => p._id !== id));
        toast.success('Product deleted');
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  const deliverHandler = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.put(`/api/orders/${id}/deliver`, {}, config);
      toast.success('Order marked as delivered');
      // Refresh orders
      const { data: orders } = await axios.get('/api/orders', config);
      setAllOrders(orders);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-amazon_blue text-white p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-10 text-amazon_yellow">Seller Central</h2>
        <nav className="space-y-4">
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full text-left p-3 rounded-md flex items-center ${activeTab === 'products' ? 'bg-amazon_blue-light text-amazon_yellow' : 'hover:bg-gray-800'}`}
          >
            <Package className="h-5 w-5 mr-3" />
            Products
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left p-3 rounded-md flex items-center ${activeTab === 'orders' ? 'bg-amazon_blue-light text-amazon_yellow' : 'hover:bg-gray-800'}`}
          >
            <ShoppingBag className="h-5 w-5 mr-3" />
            Orders
          </button>
          {userInfo.role === 'admin' && (
            <button 
              onClick={() => setActiveTab('users')}
              className={`w-full text-left p-3 rounded-md flex items-center ${activeTab === 'users' ? 'bg-amazon_blue-light text-amazon_yellow' : 'hover:bg-gray-800'}`}
            >
              <Users className="h-5 w-5 mr-3" />
              Users
            </button>
          )}
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`w-full text-left p-3 rounded-md flex items-center ${activeTab === 'analytics' ? 'bg-amazon_blue-light text-amazon_yellow' : 'hover:bg-gray-800'}`}
          >
            <TrendingUp className="h-5 w-5 mr-3" />
            Analytics
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold capitalize">{activeTab}</h1>
          {activeTab === 'products' && (
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-amazon_yellow text-black font-bold py-2 px-4 rounded-md flex items-center hover:bg-yellow-500 shadow-sm"
            >
              {showAddForm ? <X className="h-5 w-5 mr-2" /> : <Plus className="h-5 w-5 mr-2" />}
              {showAddForm ? 'Cancel' : 'Add Product'}
            </button>
          )}
        </div>

        {showAddForm && (
          <div className="bg-white p-8 rounded-md shadow-md mb-8 border border-amazon_yellow/20">
            <h2 className="text-xl font-bold mb-6">Create New Product</h2>
            <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2">Product Name</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-amazon_yellow"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Price (₹)</label>
                <input 
                  type="number" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-amazon_yellow"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Brand</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-amazon_yellow"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Category</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-amazon_yellow"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Cement">Cement</option>
                  <option value="Steel">Steel</option>
                  <option value="Tools">Tools</option>
                  <option value="Machinery">Machinery</option>
                  <option value="Safety Equipment">Safety Equipment</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Count In Stock</label>
                <input 
                  type="number" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-amazon_yellow"
                  value={countInStock}
                  onChange={(e) => setCountInStock(Number(e.target.value))}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2">Image</label>
                <div className="flex items-center space-x-4">
                  <input 
                    type="text" 
                    className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:border-amazon_yellow bg-gray-50"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Enter image URL or upload"
                  />
                  <input 
                    type="file" 
                    className="text-sm"
                    onChange={uploadFileHandler}
                  />
                </div>
                {uploading && <p className="text-xs text-blue-600 mt-1">Uploading image...</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2">Description</label>
                <textarea 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-amazon_yellow h-32"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <button 
                  type="submit"
                  className="w-full bg-amazon_yellow text-black font-bold py-3 rounded-md hover:bg-yellow-500 shadow-sm"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amazon_blue"></div></div>
        ) : (
          <div className="bg-white shadow-md rounded-md overflow-hidden">
            {activeTab === 'products' && (
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-600 font-bold text-sm uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {sellerProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="p-4 flex items-center">
                        <img 
                          src={product.image?.startsWith('http') ? product.image : `http://localhost:5000${product.image}`} 
                          alt={product.name} 
                          className="h-10 w-10 object-contain mr-3"
                        />
                        <span className="font-medium truncate max-w-xs">{product.name}</span>
                      </td>
                      <td className="p-4 font-bold text-red-700">₹{product.price.toLocaleString('en-IN')}</td>
                      <td className="p-4">{product.category}</td>
                      <td className="p-4">{product.countInStock}</td>
                      <td className="p-4 flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 p-1"><Edit className="h-5 w-5" /></button>
                        <button 
                          onClick={() => deleteHandler(product._id)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'orders' && (
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-600 font-bold text-sm uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Paid</th>
                    <th className="p-4">Delivered</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {allOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="p-4 text-xs font-mono">{order._id}</td>
                      <td className="p-4 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="p-4 font-bold text-red-700">₹{order.totalPrice.toLocaleString('en-IN')}</td>
                      <td className="p-4">
                        {order.isPaid ? (
                          <span className="text-green-600 font-bold">YES</span>
                        ) : (
                          <span className="text-red-600 font-bold">NO</span>
                        )}
                      </td>
                      <td className="p-4">
                        {order.isDelivered ? (
                          <span className="text-green-600 font-bold">YES</span>
                        ) : (
                          <span className="text-red-600 font-bold">NO</span>
                        )}
                      </td>
                      <td className="p-4">
                        {!order.isDelivered && (
                          <button 
                            onClick={() => deliverHandler(order._id)}
                            className="bg-amazon_yellow text-black text-xs font-bold py-1 px-3 rounded hover:bg-yellow-500"
                          >
                            Mark Delivered
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'users' && (
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-600 font-bold text-sm uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {allUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="p-4 font-medium">{user.name}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4 uppercase text-xs font-bold tracking-widest">{user.role}</td>
                      <td className="p-4 text-sm">{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'analytics' && (
              <div className="p-20 text-center text-gray-500 italic">
                Analytics dashboard coming soon. Track your sales and revenue in real-time.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
