import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface ExerciseProps {
  question: string;
  options: string[];
  correctAnswer: number;
}

const InteractiveExercise: React.FC<ExerciseProps> = ({ question, options, correctAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
  };

  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{question}</h3>
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className={`w-full text-left p-3 rounded-md border transition-colors ${
              selectedAnswer === index
                ? isCorrect
                  ? 'bg-green-100 border-green-500'
                  : 'bg-red-100 border-red-500'
                : 'border-gray-300 hover:border-indigo-500'
            }`}
            disabled={showFeedback}
          >
            {option}
          </button>
        ))}
      </div>
      {showFeedback && (
        <div className={`mt-4 p-4 rounded-md ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
          <div className="flex items-center">
            {isCorrect ? (
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600 mr-2" />
            )}
            <p className={isCorrect ? 'text-green-700' : 'text-red-700'}>
              {isCorrect ? '¡Correcto!' : 'Inténtalo de nuevo'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveExercise;