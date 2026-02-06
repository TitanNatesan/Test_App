
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-16 text-center">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex justify-center space-x-10 mb-8 text-[11px] font-bold tracking-[0.2em] text-slate-600 uppercase">
          <a href="#" className="hover:text-yellow-500 transition-colors">About</a>
          <a href="#" className="hover:text-yellow-500 transition-colors">API Docs</a>
          <a href="#" className="hover:text-yellow-500 transition-colors">Terms</a>
          <a href="#" className="hover:text-yellow-500 transition-colors">Privacy</a>
        </nav>
        
        <div className="text-slate-400 text-[10px] font-medium tracking-wider">
          © {new Date().getFullYear()} REFERENCES SCHOLARLY SEARCH. ALL KNOWLEDGE IS CONNECTED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
