import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-dark-surface border-b border-dark-border px-4 py-2 flex items-center justify-between z-10">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
           {/* Using a simple text logo */}
          <span className="text-xl font-bold text-white">PlugNotas</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm">
          <a href="#" className="text-dark-text-secondary hover:text-white transition-colors">Comunidade</a>
          <a href="#" className="text-dark-text-secondary hover:text-white transition-colors">Suporte</a>
          <a href="#" className="text-dark-text-secondary hover:text-white transition-colors">Painel</a>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <button className="px-4 py-1.5 text-sm font-semibold bg-dark-accent text-white rounded-md hover:bg-blue-600 transition-colors">
          Comece agora
        </button>
      </div>
    </header>
  );
};

export default Header;