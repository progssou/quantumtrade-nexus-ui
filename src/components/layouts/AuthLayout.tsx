
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ChartLine } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 p-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <ChartLine className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold text-gray-900">QuantumTrade</span>
          </div>
          <p className="text-gray-600">Plateforme de trading intelligente</p>
        </div>
        
        {/* Auth form */}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
