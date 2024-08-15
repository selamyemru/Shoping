import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">MyStore</Link>
        </div>
        <div className="hidden md:flex md:items-center space-x-4">
          <Link to="/wishlist" className="hover:text-gray-400">Wishlist</Link>
          <Link to="/admin" className="hover:text-gray-400">Admin</Link>
          <Link to="/login" className=" text-gray-900 font-medium px-4 py-1  text-sm rounded-md bg-white hover:bg-gray-800 hover:text-white ">Signin</Link>
          <Link to="/login" className=" text-gray-900 font-medium px-4 py-1 hidden  text-sm rounded-md bg-white hover:bg-gray-800 hover:text-white ">Logout</Link>
          <Link to="/cart" className="hover:text-gray-400"><FontAwesomeIcon icon={faCartShopping} /></Link>


        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-gray-700 mt-2 rounded-md`}>
        <Link to="/wishlist" className="block px-4 py-2 text-white hover:bg-gray-600">Wishlist</Link>
        <Link to="/admin" className="block px-4 py-2 text-white hover:bg-gray-600">Admin</Link>
        <Link to="/login" className=" block  px-4 py-1text-white hover:bg-gray-600 ">Signin</Link>
        <Link to="/login" className=" px-4 py-1 hidden text-white hover:bg-gray-600 ">Logout</Link>
        <Link to="/cart" className="block px-4 py-2 text-white hover:bg-gray-600"><FontAwesomeIcon icon={faCartShopping} /></Link>

      </div>
    </nav>
  );
};

export default Navbar;
