import React from 'react';
import { MenuIcon, CodeBracketIcon } from './icons/Icons';

interface HeaderProps {
    onMenuClick: () => void;
    onCodeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onCodeClick }) => {
  return (
    <header className="bg-dark-surface border-b border-dark-border px-4 py-2 flex items-center justify-between z-10">
      <div className="flex items-center space-x-4">
        <button onClick={onMenuClick} className="md:hidden text-dark-text-secondary hover:text-white">
          <MenuIcon className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-white">PlugNotas</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm">
          <a href="#" className="text-dark-text-secondary hover:text-white transition-colors">Comunidade</a>
          <a href="#" className="text-dark-text-secondary hover:text-white transition-colors">Suporte</a>
          <a href="#" className="text-dark-text-secondary hover:text-white transition-colors">Painel</a>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <button className="hidden sm:block px-4 py-1.5 text-sm font-semibold bg-dark-accent text-white rounded-md hover:bg-blue-600 transition-colors">
          Comece agora
        </button>
        <button onClick={onCodeClick} className="lg:hidden text-dark-text-secondary hover:text-white">
            <CodeBracketIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;