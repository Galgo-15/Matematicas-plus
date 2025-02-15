import React from 'react';
import { BookOpen } from 'lucide-react';

interface LessonCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
}

const LessonCard: React.FC<LessonCardProps> = ({ title, description, image, category }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full">
          {category}
        </span>
        <h3 className="mt-2 text-xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
        <button className="mt-4 flex items-center text-indigo-600 hover:text-indigo-800">
          <BookOpen className="h-4 w-4 mr-2" />
          Comenzar lección
        </button>
      </div>
    </div>
  );
};

export default LessonCard;