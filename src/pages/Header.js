import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser, FaTshirt } from 'react-icons/fa'; // นำเข้าไอคอนเสื้อจาก react-icons

function Header({ handleLogout, userName }) {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-purple-700 shadow-xl p-4 flex justify-between items-center text-white fixed w-full z-10">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold cursor-pointer flex items-center space-x-2">
          <span className="text-yellow-400">⚽</span>
          <span>Football Shirt Store!</span>
        </Link>
      </div>
      <nav className="flex-1 flex justify-center space-x-8 text-lg">
        <Link to="/post" className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition duration-300 shadow-md">Post</Link>
        <Link to="/search-shirts" className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition duration-300 shadow-md flex items-center space-x-2">
          <FaTshirt className="text-white text-xl" /> {/* แทนที่ด้วยไอคอนเสื้อ */}
          <span>Shirts</span>
        </Link>
        <Link to="/cart" className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition duration-300 shadow-md flex items-center space-x-2">
          <FaShoppingCart />
          <span>Cart</span>
        </Link>
        <Link to="/profile" className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition duration-300 shadow-md flex items-center space-x-2">
          <FaUser />
          <span>Profile</span>
        </Link>
      </nav>
      <div className="flex items-center">
        <div className="bg-blue-600 text-white px-4 py-2 rounded-full mr-4 shadow-md">
          {userName}
        </div>
        <button 
          onClick={handleLogout} 
          className="text-white bg-red-500 px-4 py-2 rounded-full hover:bg-red-400 transition duration-300 shadow-md flex items-center"
          aria-label="Logout"
        >
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
