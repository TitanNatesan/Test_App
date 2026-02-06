
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <img 
              src="https://img.icons8.com/color/48/000000/microscope.png" 
              alt="Logo" 
              className="w-8 h-8 opacity-80"
            />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">References</span>
        </div>
        
        <nav className="flex items-center space-x-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-black transition-colors">Browse</a>
          {/* Sign in button and other links removed as per request */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
