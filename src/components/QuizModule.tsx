import React, { useState } from 'react';
import { CheckCircle, XCircle, RefreshCw, Award } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizModuleProps {
  title: string;
  questions: Question[];
}

const QuizModule: React.FC<QuizModuleProps> = ({ title, questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const calculateScore = () => {
    let newScore = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        newScore++;
      }
    });
    setScore(newScore);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <div className="text-center">
          <Award className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Resultados del Quiz</h2>
          <div className="text-4xl font-bold text-indigo-600 mb-2">{percentage}%</div>
          <p className="text-gray-600 mb-6">
            Respondiste correctamente {score} de {questions.length} preguntas
          </p>

          <div className="space-y-4 mb-8">
            {questions.map((q, index) => (
              <div key={q.id} className={`p-4 rounded-lg ${
                selectedAnswers[index] === q.correctAnswer ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <div className="flex items-center mb-2">
                  {selectedAnswers[index] === q.correctAnswer ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600 mr-2" />
                  )}
                  <h3 className="font-semibold text-gray-900">{q.question}</h3>
                </div>
                <p className="text-gray-600 ml-7">{q.explanation}</p>
              </div>
            ))}
          </div>

          <button
            onClick={resetQuiz}
            className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors mx-auto"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Intentar de Nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Pregunta {currentQuestion + 1} de {questions.length}
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{question.question}</h3>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                selectedAnswers[currentQuestion] === index
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentQuestion(prev => prev - 1)}
          disabled={currentQuestion === 0}
          className="px-4 py-2 text-indigo-600 disabled:text-gray-400 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          Anterior
        </button>
        {currentQuestion === questions.length - 1 ? (
          <button
            onClick={calculateScore}
            disabled={selectedAnswers.length !== questions.length}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
          >
            Finalizar Quiz
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestion(prev => prev + 1)}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizModule;