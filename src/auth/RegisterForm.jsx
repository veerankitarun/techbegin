import React, { useState } from 'react';
import { XIcon } from '../App';

const MessageModal = ({ message, type, onClose }) => {
  if (!message) return null;
  const bgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const borderColor = type === 'success' ? 'border-green-400' : 'border-red-400';

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-[100]">
      <div className={`relative p-6 rounded-lg shadow-xl max-w-sm w-full ${bgColor} ${textColor} border ${borderColor}`}>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <XIcon className="w-5 h-5" />
        </button>
        <p className="text-center font-medium">{message}</p>
      </div>
    </div>
  );
};

const Register = ({ navigate, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token); // Save JWT token
        onLogin(data.user.email); // Pass email to parent
        setMessage("Registration successful!");
        setTimeout(() => navigate("products"), 1000);
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 mt-4">Register</h2>
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-md mx-auto">
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 text-lg"
          >
            Register
          </button>
        </form>

        {message && (
          <MessageModal
            message={message}
            type={message.includes('successful') ? 'success' : 'error'}
            onClose={() => setMessage('')}
          />
        )}

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{' '}
          <button onClick={() => navigate('login')} className="text-blue-600 hover:underline font-medium">
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
