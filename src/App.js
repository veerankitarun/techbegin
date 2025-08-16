import React, { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is imported if not already in your environment

// Import Login and Register components from the new Auth folder
import Login from './auth/LoginForm';
import Register from './auth/RegisterForm';
import ResetPassword from './auth/ResetPassword';








// Icon Components - All necessary SVG icons are included here.
export const ShoppingCartIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>;
export const HomeIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
export const XIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>;
export const PlusIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>;
export const MinusIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"></path></svg>;
export const MenuIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>;
export const SearchIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>;
export const TruckIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M1 3h15v14H1z"></path><polyline points="16 8 20 8 23 11 23 16 16 16"></polyline><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>;

// Dummy Product Data - This array holds all the product information.
const products = [
  {
    id: '1',
    name: 'Stylish T-Shirt',
    price: 29,
    image: 'https://placehold.co/400x400/E0F2F7/000000?text=T-Shirt',
    description: 'A comfortable and stylish t-shirt made from 100% organic cotton. Perfect for everyday wear.',
    category: 'Apparel',
    rating: 4.5,
    reviews: 120,
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    price: 99,
    image: 'https://placehold.co/400x400/FCE7F3/000000?text=Headphones',
    description: 'Immersive sound experience with noise-cancelling features and long-lasting battery life. Bluetooth 5.0.',
    category: 'Electronics',
    rating: 4.8,
    reviews: 350,
  },
  {
    id: '3',
    name: 'Smartwatch',
    price: 199,
    image: 'https://placehold.co/400x400/E6FFFA/000000?text=Smartwatch',
    description: 'Track your fitness, receive notifications, and make calls directly from your wrist. Water-resistant.',
    category: 'Electronics',
    rating: 4.2,
    reviews: 210,
  },
  {
    id: '4',
    name: 'Leather Backpack',
    price: 75.00,
    image: 'https://placehold.co/400x400/FFFBEB/000000?text=Backpack',
    description: 'Durable and spacious leather backpack, ideal for daily commute or weekend trips. Multiple compartments.',
    category: 'Accessories',
    rating: 4.6,
    reviews: 80,
  },
  {
    id: '5',
    name: 'Coffee Maker',
    price: 49,
    image: 'https://placehold.co/400x400/F0F9FF/000000?text=Coffee+Maker',
    description: 'Brew your perfect cup of coffee every morning with this easy-to-use machine. Programmable timer.',
    category: 'Home Goods',
    rating: 4.3,
    reviews: 150,
  },
  {
    id: '6',
    name: 'Running Shoes',
    price: 89,
    image: 'https://placehold.co/400x400/FEF2F2/000000?text=Shoes',
    description: 'Lightweight and comfortable running shoes designed for optimal performance and support.',
    category: 'Footwear',
    rating: 4.7,
    reviews: 280,
  },
];
// Dummy Order Data for Tracking
const dummyOrders = [
  { id: 'ORDER123', status: 'Processing', estimatedDelivery: '2-3 business days' },
  { id: 'ORDER456', status: 'Shipped', estimatedDelivery: 'Tomorrow' },
  { id: 'ORDER789', status: 'Delivered', estimatedDelivery: 'Yesterday' },
  { id: 'ORDER101', status: 'Pending Payment', estimatedDelivery: 'N/A' },
];

// MessageModal Component - Replaces browser alert() for displaying messages.
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

// Cart Context - Provides cart state and functions to all components that need them.
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Adds a product to the cart or increments its quantity if already present.
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Increases the quantity of a specific item in the cart.
  const increaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decreases the quantity of a specific item in the cart, ensuring it doesn't go below 1.
  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
    );
  };

  // Removes an item completely from the cart.
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // Clears all items from the cart.
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculates the total price of all items in the cart.
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Header Component - Contains the navigation, search bar, and mobile menu.
const Header = ({ navigate, cartItemCount, searchQuery, setSearchQuery, isLoggedIn, userEmail, handleLogout }) => {
  // State to control the visibility of the mobile navigation menu.
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggles the mobile menu's open/close state.
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-4 shadow-lg sticky top-0 z-50 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-tight cursor-pointer" onClick={() => navigate('products')}>
          Tech Begin
        </h1>

        {/* Search bar for desktop and tablet views. Hidden on smaller screens. */}
        <div className="hidden md:flex flex-grow max-w-md mx-4 relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full py-2 pl-10 pr-4 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
        </div>

        <nav className="flex items-center space-x-4">
          {/* Mobile navigation icons: Hamburger and Cart. Hidden on larger screens. */}
          <div className="md:hidden flex items-center space-x-6"> {/* Increased space-x to 6 */}
            <button
              className="relative flex items-center space-x-2 text-lg font-medium hover:text-blue-200 transition duration-300 transform hover:scale-105"
              onClick={() => { navigate('cart'); setIsMobileMenuOpen(false); }}
            >
              <ShoppingCartIcon className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
              <MenuIcon className="w-8 h-8" />
            </button>
          </div>

          {/* Desktop navigation links. Hidden on smaller screens. */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              className="flex items-center space-x-2 text-lg font-medium hover:text-blue-200 transition duration-300 transform hover:scale-105"
              onClick={() => { navigate('products'); setIsMobileMenuOpen(false); }}
            >
              <HomeIcon className="w-6 h-6" />
              <span>Home</span>
            </button>
            <button
              className="relative flex items-center space-x-2 text-lg font-medium hover:text-blue-200 transition duration-300 transform hover:scale-105"
              onClick={() => { navigate('cart'); setIsMobileMenuOpen(false); }}
            >
              <ShoppingCartIcon className="w-6 h-6" />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              className="flex items-center space-x-2 text-lg font-medium hover:text-blue-200 transition duration-300 transform hover:scale-105"
              onClick={() => { navigate('trackOrder'); setIsMobileMenuOpen(false); }}
            >
              <TruckIcon className="w-6 h-6" />
              <span>Track Order</span>
            </button>
            {/* Conditional rendering for Login/Logout */}
            {isLoggedIn ? (
              <button
                className="text-lg font-medium hover:text-blue-200 transition duration-300 transform hover:scale-105"
                onClick={handleLogout}
              >
                <span>Logout ({userEmail.split('@')[0]})</span>
              </button>
            ) : (
              <>
                <button
                  className="text-lg font-medium hover:text-blue-200 transition duration-300 transform hover:scale-105"
                  onClick={() => { navigate('login'); setIsMobileMenuOpen(false); }}
                >
                  <span>Login</span>
                </button>
                <button
                  className="bg-white text-blue-600 font-bold py-2 px-4 rounded-full shadow-md hover:bg-blue-100 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                  onClick={() => { navigate('register'); setIsMobileMenuOpen(false); }}
                >
                  <span>Register</span>
                </button>
              </>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile-only search bar: This will be visible right below the main nav on small screens */}
      <div className="md:hidden container mx-auto px-4 py-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full py-2 pl-10 pr-4 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
        </div>
      </div>

      {/* Mobile menu overlay. Appears when isMobileMenuOpen is true. */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-8 animate-fade-in">
          {/* Close button for the mobile menu */}
          <button onClick={toggleMobileMenu} className="absolute top-4 right-4 text-white">
            <XIcon className="w-8 h-8" />
          </button>
          {/* Mobile navigation links (Home, Track Order, Login, Register) */}
          <button
            className="flex items-center space-x-3 text-2xl font-medium text-white hover:text-blue-200 transition duration-300"
            onClick={() => { navigate('products'); setIsMobileMenuOpen(false); }}
          >
            <HomeIcon className="w-8 h-8" />
            <span>Home</span>
          </button>
          <button
            className="flex items-center space-x-3 text-2xl font-medium text-white hover:text-blue-200 transition duration-300"
            onClick={() => { navigate('trackOrder'); setIsMobileMenuOpen(false); }}
          >
            <TruckIcon className="w-8 h-8" />
            <span>Track Order</span>
          </button>
          {isLoggedIn ? (
            <button
              className="text-2xl font-medium text-white hover:text-blue-200 transition duration-300"
              onClick={handleLogout}
            >
              <span>Logout ({userEmail.split('@')[0]})</span>
            </button>
          ) : (
            <>
              <button
                className="text-2xl font-medium text-white hover:text-blue-200 transition duration-300"
                onClick={() => { navigate('login'); setIsMobileMenuOpen(false); }}
              >
                <span>Login</span>
              </button>
              <button
                className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-100 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 text-2xl"
                onClick={() => { navigate('register'); setIsMobileMenuOpen(false); }}
              >
                <span>Register</span>
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

// Footer Component - Displays copyright and designer information.
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-8 shadow-inner">
      <div className="container mx-auto text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Tech Begin. All rights reserved.</p>
        <p className="mt-2">Designed by Tarun kumar</p>
      </div>
    </footer>
  );
};

// Product List Component - Displays a grid of products, with search filtering and add-to-cart animation.
const ProductList = ({ navigate, searchQuery }) => {
  const { addToCart } = useContext(CartContext);
  // State to manage the animation effect on the "Add to Cart" button.
  const [animatedButtonId, setAnimatedButtonId] = useState(null);

  // Filters products based on the search query, making the search case-insensitive.
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handles adding a product to the cart and triggers the button animation.
  const handleAddToCartClick = (product) => {
    addToCart(product);
    setAnimatedButtonId(product.id);
    // Remove the animation class after 500ms to allow re-triggering.
    setTimeout(() => {
      setAnimatedButtonId(null);
    }, 500);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Added mt-6 for more space above the heading in ProductList */}
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 mt-6">Our Products</h2>
      {/* Message displayed if no products match the current search query. */}
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-600 text-xl">No products found matching your search.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Renders each filtered product as a card. */}
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover object-center rounded-t-xl cursor-pointer"
              onClick={() => navigate('productDetail', product.id)}
              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x400/E0F2F7/000000?text=${product.name.replace(/\s/g, '+')}`; }}
            />
            <div className="p-5 flex flex-col flex-grow">
              <h3
                className="text-xl font-semibold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 transition duration-200"
                onClick={() => navigate('productDetail', product.id)}
              >
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-3 flex-grow">{product.description.substring(0, 70)}...</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-2xl font-bold text-blue-700">₹{product.price.toFixed(2)}</span>
                <button
                  onClick={() => handleAddToCartClick(product)}
                  // Dynamically applies the 'animate-pop' class when the button is clicked.
                  className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
                    ${animatedButtonId === product.id ? 'animate-pop' : 'hover:scale-105'}`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Product Detail Component - Displays detailed information for a single product.
const ProductDetail = ({ navigate, productId }) => {
  const product = products.find((p) => p.id === productId);
  const { addToCart } = useContext(CartContext);
  // State for the "Add to Cart" button animation in the detail view.
  const [animatedButtonId, setAnimatedButtonId] = useState(null);

  // Handles adding the product to cart and triggers the animation.
  const handleAddToCartClick = (product) => {
    addToCart(product);
    setAnimatedButtonId(product.id);
    setTimeout(() => {
      setAnimatedButtonId(null);
    }, 500);
  };

  // Renders a "Product not found" message if the product ID doesn't match.
  if (!product) {
    return (
      <div className="container mx-auto p-8 text-center text-red-600 text-xl">
        Product not found. <button onClick={() => navigate('products')} className="text-blue-600 underline">Go back to products</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <button
        onClick={() => navigate('products')}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition duration-200 font-medium"
      >
        &larr; Back to Products
      </button>

      <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md h-auto rounded-lg shadow-md object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x600/E0F2F7/000000?text=${product.name.replace(/\s/g, '+')}`; }}
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">{product.name}</h2>
          <p className="text-blue-700 text-3xl font-bold mb-4">₹{product.price.toFixed(2)}</p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">{product.description}</p>

          <div className="mb-6">
            <span className="text-gray-600 font-semibold">Category: </span>
            <span className="text-gray-800">{product.category}</span>
          </div>
          <div className="mb-6">
            <span className="text-yellow-500 font-bold">{product.rating} / 5</span> ({product.reviews} reviews)
          </div>

          <button
            onClick={() => handleAddToCartClick(product)}
            // Dynamically applies the 'animate-pop' class when the button is clicked.
            className={`w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 text-lg
              ${animatedButtonId === product.id ? 'animate-pop' : 'hover:scale-105'}`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// Cart Component - Displays items in the shopping cart and allows quantity adjustments.
const Cart = ({ navigate }) => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, clearCart, cartTotal } =
    useContext(CartContext);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 mt-4">Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 text-xl py-10 bg-white rounded-xl shadow-lg">
          <p className="mb-4">Your cart is empty.</p>
          <button
            onClick={() => navigate('products')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full shadow-md hover:shadow-lg transition duration-300"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex items-center flex-grow mb-4 sm:mb-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/80x80/E0F2F7/000000?text=${item.name.replace(/\s/g, '+')}`; }}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-full px-2 py-1">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="text-gray-700 hover:text-blue-600 transition duration-200 p-1 rounded-full hover:bg-gray-100"
                    >
                      <MinusIcon className="w-5 h-5" />
                    </button>
                    <span className="mx-2 text-lg font-medium">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="text-gray-700 hover:text-blue-600 transition duration-200 p-1 rounded-full hover:bg-gray-100"
                    >
                      <PlusIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <span className="text-lg font-bold text-blue-700 w-24 text-right">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition duration-200 p-1 rounded-full hover:bg-red-50"
                  >
                    <XIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
              Total: <span className="text-blue-700">₹{cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
              <button
                onClick={clearCart}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 w-full sm:w-auto"
              >
                Clear Cart
              </button>
              <button
                onClick={() => navigate('checkout')}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 w-full sm:w-auto"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Checkout Component
const Checkout = ({ navigate }) => {
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    zip: '',
  });

  // Effect to load Razorpay script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleShippingChange = (e) => {
    const { id, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    setIsLoadingPayment(true);
    setPaymentMessage(''); // Clear previous messages

    // Basic validation for shipping info
    const requiredFields = ['fullName', 'address', 'city', 'zip'];
    const missingFields = requiredFields.filter(field => !shippingInfo[field]);
    if (missingFields.length > 0) {
      setPaymentMessage(`Please fill in all shipping details: ${missingFields.map(f => f.replace(/([A-Z])/g, ' $1').toLowerCase()).join(', ')}.`);
      setIsLoadingPayment(false);
      return;
    }

    try {
      // 1. Fetch Razorpay key from your backend (GET request)
      const { data: { key } } = await axios.get("/api/v1/getKey");
      console.log("Fetched Razorpay Key:", key);

      const amountToSend = Math.round(cartTotal * 100); // Amount in paise
      console.log("Frontend amountToSend (for backend):", amountToSend);

      // 2. Process payment and create order on your backend (POST request)
      const { data: { order } } = await axios.post("/api/v1/payment/process", {
        amount: amountToSend,
      });
      console.log("Received Order from Backend:", order);

      const options = {
        key, // Use the actual key fetched from backend
        amount: order.amount, // Amount from the created order
        currency: order.currency,
        name: "Tech Begin",
        description: "Test Transaction",
        order_id: order.id, // Order ID from the backend
        callback_url: '/api/v1/paymentVerification', // This URL will be hit by Razorpay after payment
        handler: async function (response) {
          // This function is called after successful payment
          // You should send this response to your backend for verification
          try {
            const verificationResponse = await axios.post("/api/v1/payment/verify", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verificationResponse.data.success) {
              setPaymentMessage('Payment Successful! Your order has been placed.');
              setOrderPlaced(true);
              clearCart();
            } else {
              setPaymentMessage('Payment successful but order verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            setPaymentMessage('An error occurred during payment verification. Please contact support.');
          } finally {
            setIsLoadingPayment(false);
          }
        },
        prefill: {
          name: shippingInfo.fullName,
          email: "customer@example.com", // Replace with actual user email if available
          contact: "9999999999" // Replace with actual user contact if available
        },
        notes: {
          address: shippingInfo.address,
          city: shippingInfo.city,
          zip: shippingInfo.zip
        },
        theme: {
          color: "#3399CC"
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        // Handle payment failure here
        console.error('Payment failed:', response.error);
        setPaymentMessage(`Payment Failed: ${response.error.description || 'Please try again.'}`);
        setIsLoadingPayment(false);
      });
      rzp1.open(); // Open the Razorpay payment dialog

    } catch (error) {
      console.error('Error initiating payment:', error);
      // More user-friendly error message based on the error type
      if (error.response && error.response.status === 400) {
        setPaymentMessage(`Payment initiation failed: ${error.response.data.message || 'Invalid request.'}`);
      } else {
        setPaymentMessage('Failed to initiate payment. Please try again later.');
      }
      setIsLoadingPayment(false);
    }
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="container mx-auto p-8 text-center text-gray-600 text-xl bg-white rounded-xl shadow-lg mt-8">
        <p className="mb-4">Your cart is empty. Please add items to proceed to checkout.</p>
        <button
          onClick={() => navigate('products')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full shadow-md hover:shadow-lg transition duration-300"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 mt-4">Checkout</h2>

      {orderPlaced ? (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center">
          <h3 className="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h3>
          <p className="text-gray-700 text-lg mb-6">{paymentMessage}</p>
          <button
            onClick={() => navigate('products')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition duration-300"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Shipping Information Form */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Shipping Information</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={shippingInfo.fullName}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={shippingInfo.address}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-gray-700 text-sm font-bold mb-2">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      id="zip"
                      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={shippingInfo.zip}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h3>
              <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span className="text-gray-700">{item.name} (x{item.quantity})</span>
                    <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-3 flex justify-between items-center font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-blue-700">₹{cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {paymentMessage && (
                <MessageModal
                  message={paymentMessage}
                  type={paymentMessage.includes('Successful') ? 'success' : 'error'}
                  onClose={() => setPaymentMessage('')}
                />
              )}

              <button
                onClick={handlePlaceOrder}
                className={`w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 text-lg mt-6
                  ${isLoadingPayment ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={isLoadingPayment}
              >
                {isLoadingPayment ? 'Processing Payment...' : 'Pay Now'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// TrackOrder Component
const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);
  const [message, setMessage] = useState('');

  const handleTrackOrder = () => {
    setMessage('');
    const order = dummyOrders.find(o => o.id.toLowerCase() === orderId.toLowerCase());
    if (order) {
      setOrderStatus(order);
    } else {
      setOrderStatus(null);
      setMessage('Order not found. Please check the Order ID and try again.');
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 mt-4">Track Your Order</h2>
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-md mx-auto">
        <div className="mb-6">
          <label htmlFor="orderId" className="block text-gray-700 text-sm font-bold mb-2">
            Enter Order ID
          </label>
          <input
            type="text"
            id="orderId"
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="e.g., ORDER123"
          />
        </div>
        <button
          onClick={handleTrackOrder}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 text-lg"
        >
          Track Order
        </button>

        {message && (
          <MessageModal
            message={message}
            type="error"
            onClose={() => setMessage('')}
          />
        )}

        {orderStatus && (
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200 text-blue-900">
            <h4 className="text-xl font-bold mb-3">Order Details:</h4>
            <p className="mb-2"><strong>Order ID:</strong> {orderStatus.id}</p>
            <p className="mb-2"><strong>Status:</strong> <span className={`font-semibold ${orderStatus.status === 'Delivered' ? 'text-green-600' : orderStatus.status === 'Shipped' ? 'text-yellow-600' : 'text-blue-600'}`}>{orderStatus.status}</span></p>
            <p><strong>Estimated Delivery:</strong> {orderStatus.estimatedDelivery}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('products'); // Default page
  const [currentProductId, setCurrentProductId] = useState(null); // For product detail page
  const [searchQuery, setSearchQuery] = useState(''); // Global search query
  const { cartItems } = useContext(CartContext); // Get cart items for count
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [resetToken, setResetToken] = useState(null);

  // If user came directly to /reset-password/<token>, capture token and switch to reset page
  useEffect(() => {
    const pathname = window.location.pathname || '';
    // match /reset-password/sometoken  (capturing anything after the last slash)
    const match = pathname.match(/^\/reset-password\/(.+)$/);
    if (match && match[1]) {
      setResetToken(match[1]);
      setCurrentPage('resetPassword'); // show reset password page in your renderPage switch
    }
  }, []);

  // Function to navigate between pages
  const navigate = (page, productId = null) => {
    setCurrentPage(page);
    setCurrentProductId(productId);
    // Clear search query when navigating to a non-product list page
    if (page !== 'products') {
      setSearchQuery('');
    }

    // optionally update URL when navigating to resetPassword so the link is shareable:
    if (page !== 'resetPassword') {
      // reset any reset-password URL if we navigate away
      if (window.location.pathname.startsWith('/reset-password/')) {
        window.history.replaceState({}, '', '/');
      }
    }
  };

  const handleLogin = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    navigate('products'); // Redirect to products page after logout
  };

  // Render the appropriate component based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'products':
        return <ProductList navigate={navigate} searchQuery={searchQuery} />;
      case 'productDetail':
        return <ProductDetail navigate={navigate} productId={currentProductId} />;
      case 'cart':
        return <Cart navigate={navigate} />;
      case 'checkout':
        return <Checkout navigate={navigate} />;
      case 'trackOrder':
        return <TrackOrder />;
      case 'login':
        return <Login navigate={navigate} onLogin={handleLogin} />;
      case 'register':
        return <Register navigate={navigate} onLogin={handleLogin} />;
      case 'resetPassword': // note camelCase key
        // pass token prop into ResetPassword component (may be null if user navigated in-app)
        return <ResetPassword navigate={navigate} token={resetToken} />;
      default:
        return <ProductList navigate={navigate} searchQuery={searchQuery} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans antialiased">
      {/* Tailwind CSS styles for animations */}
      <style>{`
          @keyframes pop {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          .animate-pop { animation: pop 0.3s ease-in-out; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        `}</style>

      <Header
        navigate={navigate}
        cartItemCount={cartItems.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        handleLogout={handleLogout}
      />

      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
};


// Wrap the App component with CartProvider to make cart context available
const AppWrapper = () => (
  <CartProvider>
    <App />
  </CartProvider>
);





export default AppWrapper;
