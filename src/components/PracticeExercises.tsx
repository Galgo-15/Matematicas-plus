import React, { useState } from 'react';
import { CheckCircle, XCircle, RefreshCw, ChevronDown, ChevronUp, Video } from 'lucide-react';

interface Exercise {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  videoUrl?: string;
}

interface Video {
  title: string;
  url: string;
  description?: string;
}

interface PracticeExercisesProps {
  exercises: Exercise[];
  title: string;
  videos?: Video[];
}

const PracticeExercises: React.FC<PracticeExercisesProps> = ({ exercises, title, videos = [] }) => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showVideos, setShowVideos] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentExercise] = answerIndex;
    setSelectedAnswers(newAnswers);
    
    // Mostrar feedback
    setIsCorrect(answerIndex === exercises[currentExercise].correctAnswer);
    setShowFeedback(true);
    
    // Ocultar feedback después de 2 segundos
    setTimeout(() => {
      setShowFeedback(false);
    }, 2000);
  };

  const calculateScore = () => {
    const correctAnswers = selectedAnswers.filter(
      (answer, index) => answer === exercises[index].correctAnswer
    ).length;
    
    // Calcular el porcentaje y redondear a 2 decimales
    const score = Number(((correctAnswers / exercises.length) * 100).toFixed(2));
    setScore(score);
    setShowResults(true);
  };

  const resetExercises = () => {
    setCurrentExercise(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const exercise = exercises[currentExercise];
  const progress = ((currentExercise + 1) / exercises.length) * 100;

  const renderVideoSection = () => {
    if (!videos.length) return null;

    return (
      <div className="mb-8">
        <button
          onClick={() => setShowVideos(!showVideos)}
          className="flex items-center justify-between w-full p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
        >
          <div className="flex items-center">
            <Video className="h-5 w-5 mr-2 text-indigo-600" />
            <span className="font-semibold text-indigo-900">Videos de Ayuda</span>
          </div>
          {showVideos ? (
            <ChevronUp className="h-5 w-5 text-indigo-600" />
          ) : (
            <ChevronDown className="h-5 w-5 text-indigo-600" />
          )}
        </button>

        {showVideos && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videos.map((video, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedVideo(video)}
                  className={`p-4 rounded-lg border-2 transition-colors text-left ${
                    selectedVideo === video
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <h4 className="font-semibold text-gray-900">{video.title}</h4>
                  {video.description && (
                    <p className="text-sm text-gray-600 mt-1">{video.description}</p>
                  )}
                </button>
              ))}
            </div>

            {selectedVideo && (
              <div className="mt-4">
                <iframe
                  width="100%"
                  height="315"
                  src={selectedVideo.url}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  if (showResults) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Resultados de la Práctica</h2>
          <div className="text-4xl font-bold text-indigo-600 mb-2">{score.toFixed(2)}%</div>
          <p className="text-gray-600 mb-6">
            Resolviste correctamente {selectedAnswers.filter(
              (answer, index) => answer === exercises[index].correctAnswer
            ).length} de {exercises.length} ejercicios
          </p>

          <div className="space-y-4 mb-8">
            {exercises.map((ex, index) => (
              <div key={ex.id} className={`p-4 rounded-lg ${
                selectedAnswers[index] === ex.correctAnswer ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <div className="flex items-center mb-2">
                  {selectedAnswers[index] === ex.correctAnswer ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600 mr-2" />
                  )}
                  <h3 className="font-semibold text-gray-900">{ex.question}</h3>
                </div>
                <p className="text-gray-600 ml-7">{ex.explanation}</p>
              </div>
            ))}
          </div>

          <button
            onClick={resetExercises}
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
          Ejercicio {currentExercise + 1} de {exercises.length}
        </p>
      </div>

      {renderVideoSection()}

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{exercise.question}</h3>
        <div className="space-y-3">
          {exercise.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                selectedAnswers[currentExercise] === index
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {showFeedback && (
        <div className={`mt-4 p-4 rounded-xl ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
          <div className="flex items-center">
            {isCorrect ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <p className="text-green-700 font-medium">
                  ¡Increíble! 🎉 ¡Lo has logrado! ⭐
                </p>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-600 mr-2" />
                <p className="text-red-700 font-medium">
                  ¡No te preocupes! Inténtalo de nuevo, ¡tú puedes!
                </p>
              </>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentExercise(prev => prev - 1)}
          disabled={currentExercise === 0}
          className="px-4 py-2 text-indigo-600 disabled:text-gray-400 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          Anterior
        </button>
        {currentExercise === exercises.length - 1 ? (
          <button
            onClick={calculateScore}
            disabled={selectedAnswers.length !== exercises.length}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
          >
            Finalizar Práctica
          </button>
        ) : (
          <button
            onClick={() => setCurrentExercise(prev => prev + 1)}
            disabled={selectedAnswers[currentExercise] === undefined}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
};

export default PracticeExercises;