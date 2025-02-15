import React from 'react';
import { Home, BookOpen, PenTool, Library, Mail } from 'lucide-react';

interface NavigationProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate, currentSection }) => {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 shadow-lg relative z-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${
                currentSection === 'home'
                  ? 'text-yellow-300 border-b-2 border-yellow-300'
                  : 'text-white hover:text-yellow-200'
              }`}
            >
              🏠 Inicio
            </button>
            <button
              onClick={() => onNavigate('lessons')}
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${
                currentSection === 'lessons'
                  ? 'text-yellow-300 border-b-2 border-yellow-300'
                  : 'text-white hover:text-yellow-200'
              }`}
            >
              📚 Lecciones
            </button>
            <button
              onClick={() => onNavigate('exercises')}
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${
                currentSection === 'exercises'
                  ? 'text-yellow-300 border-b-2 border-yellow-300'
                  : 'text-white hover:text-yellow-200'
              }`}
            >
              ✏️ Ejercicios
            </button>
            <button
              onClick={() => onNavigate('resources')}
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${
                currentSection === 'resources'
                  ? 'text-yellow-300 border-b-2 border-yellow-300'
                  : 'text-white hover:text-yellow-200'
              }`}
            >
              🎮 Recursos
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ icon, text, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'bg-indigo-700 text-white' : 'hover:bg-indigo-700 text-indigo-100'
    }`}
  >
    {icon}
    <span className="ml-2">{text}</span>
  </button>
);

export default Navigation;