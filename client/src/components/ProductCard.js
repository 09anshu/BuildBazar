import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (e) => {
    e.preventDefault();
    dispatch(addToCart({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      basePrice: product.price,
      wholesaleTiers: product.wholesaleTiers,
      countInStock: product.countInStock,
      qty: 1,
    }));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-md">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">{product.category}</p>

      <Link to={`/product/${product._id}`}>
        <img 
          src={product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`} 
          alt={product.name} 
          className="h-48 w-48 object-contain mx-auto hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <h4 className="my-3 font-semibold text-lg line-clamp-2 hover:text-amazon_yellow">
        <Link to={`/product/${product._id}`}>{product.name}</Link>
      </h4>

      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
          />
        ))}
        <span className="text-xs text-blue-500 ml-2">({product.numReviews} reviews)</span>
      </div>

      <p className="text-xs my-2 line-clamp-2 text-gray-600">{product.description}</p>

      <div className="mb-5 font-bold text-xl">
        ₹{product.price.toLocaleString('en-IN')}
      </div>

      {product.countInStock > 0 ? (
        <button 
          onClick={addToCartHandler}
          className="mt-auto button bg-amazon_yellow font-bold text-xs p-3 rounded-md hover:bg-yellow-500 flex items-center justify-center"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </button>
      ) : (
        <button 
          disabled
          className="mt-auto button bg-gray-300 text-gray-500 cursor-not-allowed font-bold text-xs p-3 rounded-md"
        >
          Out of Stock
        </button>
      )}
    </div>
  );
};

export default ProductCard;
