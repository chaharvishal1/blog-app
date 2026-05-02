import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutBtn from './LogoutBtn';

const Header = () => {

  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    // {
    //     name: 'Home',
    //     slug: '/',
    //     active: true
    // },
    {
        name: 'Login',
        slug: '/login',
        active: !authStatus
    },
    {
        name: 'Signup',
        slug: '/signup',
        active: !authStatus
    },
    {
        name: 'Add Post',
        slug: '/add-post',
        active: authStatus
    },
    {
        name: 'All Post',
        slug: '/all-post',
        active: authStatus
    }
  ]

  return (
    <header className="bg-gray-900 text-white py-4 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left Side - Logo */}
          <div className="flex-shrink-0">
            <div className="text-2xl font-bold text-blue-500">
              CRUDApp
            </div>
          </div>

          {/* Center - Home Link */}
          <div className="flex-1 text-center">
            <button onClick={() => navigate('/')} className="text-white text-sm transition-all hover:bg-blue-700 px-4 py-2 rounded-full bg-blue-600">
              Home
            </button>
          </div>

          {/* Right Side - Nav Links */}
          <div className="flex-shrink-0 flex gap-6">
            {navItems.map((item) => (
              item.active && (
                <button key={item.slug} onClick={() => navigate(item.slug)} className="text-white text-sm transition-all hover:bg-blue-700 px-4 py-2 rounded-full bg-blue-600">
                  {item.name}
                </button>
              )
            ))}
            {authStatus && (
              <LogoutBtn />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;