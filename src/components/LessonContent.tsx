import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, CheckCircle2, AlertCircle, Share2, Copy, Check } from 'lucide-react';
import GeometryGraph from './GeometryGraph';

interface Example {
  problem: string;
  solution: string;
  explanation: string;
}

interface LessonContentProps {
  title: string;
  introduction: string;
  theory: string;
  examples: Example[];
  category: string;
  onPracticeClick: () => void;
  videoUrl?: string;
}

interface ShareOptions {
  platform: string;
  icon: string;
  color: string;
  url: string;
}

const LessonContent: React.FC<LessonContentProps> = ({
  title,
  introduction,
  theory,
  examples,
  category,
  onPracticeClick,
}) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState<'top' | 'bottom'>('top');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;
      
      setMenuPosition(spaceBelow > 400 ? 'bottom' : 'top');
    }
  }, [showShareMenu]);

  const handleShare = (platform: string, lessonUrl: string) => {
    const shareUrls: Record<string, string> = {
      'google-classroom': `https://classroom.google.com/share?url=${encodeURIComponent(lessonUrl)}`,
      'microsoft-teams': `https://teams.microsoft.com/share?url=${encodeURIComponent(lessonUrl)}`,
      'email': `mailto:?subject=Lección de Matemáticas: ${title}&body=¡Mira esta lección! ${encodeURIComponent(lessonUrl)}`,
      'whatsapp': `https://api.whatsapp.com/send?text=${encodeURIComponent(`¡Mira esta lección de matemáticas! ${lessonUrl}`)}`,
    };

    window.open(shareUrls[platform], '_blank');
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const renderInteractiveContent = () => {
    if (category === 'Geometría') {
      return (
        <div className="mt-8 bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Explorador de Figuras Geométricas</h3>
          <p className="text-gray-600 mb-4">
            Selecciona una figura y modifica sus dimensiones para ver cómo cambian sus propiedades.
          </p>
          <GeometryGraph />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full">
          {category}
        </span>
        <h2 className="text-3xl font-bold text-gray-900 mt-2">{title}</h2>
      </div>


      <div className="prose max-w-none">
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Introducción</h3>
          <p className="text-gray-600 whitespace-pre-line">{introduction}</p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Conceptos</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 whitespace-pre-line">{theory}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Ejemplos Resueltos</h3>
          <div className="space-y-6">
            {examples.map((example, index) => (
              <div key={index} className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Problema {index + 1}</h4>
                    <p className="text-gray-700 mt-2">{example.problem}</p>
                    <div className="mt-4 pl-4 border-l-4 border-blue-200">
                      <h5 className="font-semibold text-gray-900">Solución:</h5>
                      <p className="text-gray-700 mt-1">{example.solution}</p>
                      <div className="mt-2 bg-white p-3 rounded-md">
                        <h5 className="font-semibold text-gray-900">Explicación:</h5>
                        <p className="text-gray-600 whitespace-pre-line">{example.explanation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {renderInteractiveContent()}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={onPracticeClick}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <CheckCircle2 className="h-5 w-5 mr-2" />
          Practicar Ejercicios
        </button>
        <button className="flex items-center px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
          <AlertCircle className="h-5 w-5 mr-2" />
          Necesito Ayuda
        </button>
      </div>

      {/* Botón de compartir */}
      <div ref={menuRef} className="relative mt-6">
        <button
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="flex items-center px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors"
        >
          <Share2 className="h-5 w-5 mr-2" />
          Compartir Lección
        </button>

        {/* Menú de compartir */}
        {showShareMenu && (
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-25" 
              style={{ zIndex: 998 }}
              onClick={() => setShowShareMenu(false)}
            />
            
            {/* Menú */}
            <div 
              className={`absolute ${
                menuPosition === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
              } right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4`}
              style={{ zIndex: 999 }}
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-semibold text-gray-700">Compartir en:</h4>
                <button
                  onClick={() => setShowShareMenu(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              {/* Copiar enlace */}
              <button
                onClick={() => copyToClipboard(window.location.href)}
                className="flex items-center w-full p-3 hover:bg-gray-50 rounded-lg mb-3 border border-gray-100"
              >
                {copied ? (
                  <Check className="h-5 w-5 mr-2 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5 mr-2 text-gray-500" />
                )}
                <span className="text-sm text-gray-700">
                  {copied ? '¡Enlace copiado!' : 'Copiar enlace'}
                </span>
              </button>

              {/* Plataformas educativas */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleShare('google-classroom', window.location.href)}
                  className="flex flex-col items-center p-3 bg-[#1a73e8] text-white rounded-lg hover:bg-[#1557b0] transition-colors"
                >
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStR3gp3oUAFMLiVjj7EnxHK5JBLgOjZqbJrw&s" alt="Google Classroom" className="h-8 w-8 mb-1" />
                  <span className="text-sm">Classroom</span>
                </button>

                <button
                  onClick={() => handleShare('microsoft-teams', window.location.href)}
                  className="flex flex-col items-center p-3 bg-[#464EB8] text-white rounded-lg hover:bg-[#363b8e] transition-colors"
                >
                  <img src="https://f.hubspotusercontent30.net/hubfs/5796582/11-como-funciona-microsoft-teams.jpg" alt="Microsoft Teams" className="h-8 w-8 mb-1" />
                  <span className="text-sm">Teams</span>
                </button>

                <button
                  onClick={() => handleShare('email', window.location.href)}
                  className="flex flex-col items-center p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <span className="text-2xl mb-1">📧</span>
                  <span className="text-sm">Email</span>
                </button>

                <button
                  onClick={() => handleShare('whatsapp', window.location.href)}
                  className="flex flex-col items-center p-3 bg-[#25D366] text-white rounded-lg hover:bg-[#1da851] transition-colors"
                >
                  <span className="text-2xl mb-1">📱</span>
                  <span className="text-sm">WhatsApp</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LessonContent;