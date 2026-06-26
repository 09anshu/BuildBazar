import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, register } from '../store/slices/authSlice';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('customer');

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

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
      toast.error('Please complete all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        await dispatch(register({ name: trimmedName, email: trimmedEmail, password, role })).unwrap();
        navigate(redirect);
      } catch (err) {
        toast.error(err || 'Unable to create account. Please try again.');
      }
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
        <h1 className="text-3xl font-medium mb-6">Create account</h1>

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Your name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-400 rounded-sm focus:outline-none focus:border-amazon_yellow focus:ring-1 focus:ring-amazon_yellow"
              placeholder="First and last name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Email</label>
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
            <label className="block text-sm font-bold mb-1">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-400 rounded-sm focus:outline-none focus:border-amazon_yellow focus:ring-1 focus:ring-amazon_yellow"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Re-enter password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-400 rounded-sm focus:outline-none focus:border-amazon_yellow focus:ring-1 focus:ring-amazon_yellow"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">I want to:</label>
            <select
              className="w-full p-2 border border-gray-400 rounded-sm focus:outline-none focus:border-amazon_yellow focus:ring-1 focus:ring-amazon_yellow"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="customer">Buy construction materials</option>
              <option value="seller">Sell construction materials</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-amazon_yellow text-black font-bold py-2 rounded-md transition-colors hover:bg-yellow-500 shadow-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {loading ? 'Registering...' : 'Create your account'}
          </button>
        </form>

        <p className="text-xs text-gray-600 mt-6 leading-relaxed">
          By creating an account, you agree to BuildBazaar's <span className="text-blue-600 hover:underline cursor-pointer">Conditions of Use</span> and <span className="text-blue-600 hover:underline cursor-pointer">Privacy Notice</span>.
        </p>

        <div className="border-t border-gray-300 mt-6 pt-6 text-sm">
          Already have an account? <Link to={`/login?redirect=${redirect}`} className="text-blue-600 hover:underline">Sign-In</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
