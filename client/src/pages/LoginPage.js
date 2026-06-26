import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, login } from '../store/slices/authSlice';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { userInfo, loading, error } = useSelector((state) => state.auth);

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate(redirect);
    } catch (err) {
      toast.error(err || 'Unable to sign in. Please check your credentials.');
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAuthError());
    }
  }, [dispatch, error]);

  return (
    <div className="bg-white min-h-screen flex flex-col items-center pt-10">
      <Link to="/" className="text-3xl font-bold text-black mb-8">
        Build<span className="text-amazon_yellow">Bazaar</span>
      </Link>

      <div className="w-full max-w-md border border-gray-300 rounded-md p-8 shadow-sm">
        <h1 className="text-3xl font-medium mb-6">Sign-In</h1>

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Email or mobile phone number</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-400 rounded-sm focus:outline-none focus:border-amazon_yellow focus:ring-1 focus:ring-amazon_yellow"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-bold">Password</label>
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot your password?</Link>
            </div>
            <input
              type="password"
              className="w-full p-2 border border-gray-400 rounded-sm focus:outline-none focus:border-amazon_yellow focus:ring-1 focus:ring-amazon_yellow"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-amazon_yellow text-black font-bold py-2 rounded-md transition-colors hover:bg-yellow-500 shadow-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {loading ? 'Signing in...' : 'Sign-In'}
          </button>
        </form>

        <p className="text-xs text-gray-600 mt-6 leading-relaxed">
          By continuing, you agree to BuildBazaar's <span className="text-blue-600 hover:underline cursor-pointer">Conditions of Use</span> and <span className="text-blue-600 hover:underline cursor-pointer">Privacy Notice</span>.
        </p>
      </div>

      <div className="w-full max-w-md mt-6 flex flex-col items-center">
        <div className="w-full border-t border-gray-300 relative my-6">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
            New to BuildBazaar?
          </span>
        </div>

        <Link
          to={`/register?redirect=${redirect}`}
          className="w-full bg-gray-100 border border-gray-400 py-2 rounded-md text-center text-sm font-bold hover:bg-gray-200 shadow-sm"
        >
          Create your BuildBazaar account
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
