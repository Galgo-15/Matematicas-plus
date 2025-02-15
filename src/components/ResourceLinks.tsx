import React from 'react';
import { ExternalLink, Video, FileText, Calculator } from 'lucide-react';

interface Resource {
  title: string;
  description: string;
  url: string;
  type: 'video' | 'article' | 'interactive';
}

const ResourceLinks: React.FC<{ resources: Resource[] }> = ({ resources }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'article':
        return <FileText className="h-5 w-5" />;
      case 'interactive':
        return <Calculator className="h-5 w-5" />;
      default:
        return <ExternalLink className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recursos Adicionales</h2>
      <div className="grid gap-4">
        {resources.map((resource, index) => (
          <a
            key={index}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-white rounded-lg text-indigo-600 group-hover:text-indigo-700">
                {getIcon(resource.type)}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
                  {resource.title}
                </h3>
                <p className="text-gray-600 mt-1">{resource.description}</p>
                <div className="flex items-center mt-2 text-indigo-600">
                  <span className="text-sm font-medium">Explorar recurso</span>
                  <ExternalLink className="h-4 w-4 ml-1" />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ResourceLinks;