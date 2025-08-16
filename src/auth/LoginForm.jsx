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

const Login = ({ navigate, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotMode, setForgotMode] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        onLogin(data.user.email);
        setMessage("Login successful!");
        setTimeout(() => navigate("products"), 1000);
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch("http://localhost:8000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password reset link sent to your email!");
      } else {
        setMessage(data.message || "Error sending reset link.");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 mt-4">
        {forgotMode ? "Forgot Password" : "Login"}
      </h2>
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-md mx-auto">
        {!forgotMode ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input type="email" id="email"
                className="shadow border rounded-lg w-full py-2 px-3"
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your@example.com" required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input type="password" id="password"
                className="shadow border rounded-lg w-full py-2 px-3"
                value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="********" required
              />
            </div>
            <div className="text-right">
              <button
                type="button"
                className="text-blue-600 text-sm hover:underline"
                onClick={() => setForgotMode(true)}
              >
                Forgot Password?
              </button>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-full">
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-6">
            <div>
              <label htmlFor="forgotEmail" className="block text-gray-700 text-sm font-bold mb-2">Enter your email</label>
              <input type="email" id="forgotEmail"
                className="shadow border rounded-lg w-full py-2 px-3"
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your@example.com" required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-full">
              Send Reset Link
            </button>
            <div className="text-center mt-4">
              <button type="button" className="text-gray-500 hover:underline" onClick={() => setForgotMode(false)}>
                Back to Login
              </button>
            </div>
          </form>
        )}

        {message && (
          <MessageModal
            message={message}
            type={message.includes('success') || message.includes('sent') ? 'success' : 'error'}
            onClose={() => setMessage('')}
          />
        )}

        {!forgotMode && (
          <p className="text-center text-gray-600 text-sm mt-6">
            Don't have an account?{' '}
            <button onClick={() => navigate('register')} className="text-blue-600 hover:underline font-medium">
              Register here
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
