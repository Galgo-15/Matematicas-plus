import { useState } from 'react';
import Navigation from './components/Navigation';
import LessonCard from './components/LessonCard';
import LessonContent from './components/LessonContent';
import ResourceLinks from './components/ResourceLinks';
import PracticeExercises from './components/PracticeExercises';
import Calculator from './components/Calculator';
import './styles/patterns.css';

interface Video {
  title: string;
  url: string;
  description?: string;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  videoUrl: string;
  helpVideos: Video[];
  content: {
    introduction: string;
    theory: string;
    examples: Example[];
  };
}

function App() {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showPractice, setShowPractice] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');

  const lessons = [
    {
      id: 'algebra',
      title: 'Factorizaciones',
      description: 'Aprende a factorizar expresiones algebraicas y a resolver ecuaciones mediante factorización.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmU-u32WWAQBwxEFmKQFDhefHSmDb24YHTADypll4fcf8VrjD5',
      category: 'Álgebra',
      videoUrl: 'https://www.youtube.com/embed/F5GQOpJP9jM',
      helpVideos: [
        {
          title: "Caso por Factor Común",
          url: "https://www.youtube.com/embed/pkWYq43L_Es?si=FU_0D4TcOY0LxrGX",
          description: "Como identificar y extraer el factor común"
        },
        {
          title: "Caso por Agrupación",
          url: "https://www.youtube.com/embed/Rhttf8bA3v8?si=6ReVb33ltziRpZj3",
          description: "Factorizar por agrupación"
        },
        {
          title: "Trinomio Cuadrado Perfecto",
          url: "https://www.youtube.com/embed/4bg8tJLVjrc?si=xtdldlTdSonBm3CR",
          description: "Factorizar un trinomio cuadrado perfecto"
        },
        {
          title: "Diferencia de Cuadrados",
          url: "https://www.youtube.com/embed/uxLNcfJmqvg?si=wYSMGy-eN5RdVbV6",
          description: "Factorizar una diferencia de cuadrados"
        },
        {
          title: "Trinomio Cuadrado Perfecto por Adición y Sustracción",
          url: "https://www.youtube.com/embed/CyqqeVtSETM?si=eApr4lACn9ggEQdx",
          description: "Factorizar Trinomios cuadrados perfectos por adición y sustracción"
        },
        {
          title: "Trinomio de la forma ax^2 + bx + c",
          url: "https://www.youtube.com/embed/PgJyTFoNCI8?si=_C4fpRUeH4ikLb8s",
          description: "Factorizar un trinomio de la forma ax^2 + bx + c"
        }
      ],
      content: {
        introduction: 'La factorización es un proceso que consiste en descomponer una expresión algebraica en el producto de factores más simples. En este módulo, aprenderás a factorizar polinomios y a resolver ecuaciones utilizando la factorización.',
        theory: `La factorización es una técnica fundamental en álgebra que permite simplificar expresiones y resolver ecuaciones. Existen varios métodos de factorización, incluyendo:

1. Factor común: Sacar el factor común de todos los términos.
2. Diferencia de cuadrados: \(a^2 - b^2 = (a - b)(a + b)\).
3. Trinomio cuadrado perfecto: \(a^2 + 2ab + b^2 = (a + b)^2\).
4. Trinomio de la forma \(ax^2 + bx + c\).

Conceptos clave:
- Factor: Un número o expresión que divide a otro número o expresión sin dejar residuo.
- Polinomio: Una expresión algebraica que consiste en variables y coeficientes, combinados mediante operaciones de suma, resta y multiplicación.`,
        examples: [
          {
            problem: 'Factoriza la expresión: \(x^2 - 9\)',
            solution: '(x - 3)(x + 3)',
            explanation: 'Esta es una diferencia de cuadrados: \(x^2 - 9 = (x - 3)(x + 3)\)'
          },
          {
            problem: 'Factoriza la expresión: \(x^2 + 5x + 6\)',
            solution: '(x + 2)(x + 3)',
            explanation: 'Buscamos dos números que sumen 5 y multipliquen 6: 2 y 3.'
          },
          {
            problem: 'Factoriza la expresión: \(2x^2 + 8x\)',
            solution: '2x(x + 4)',
            explanation: 'Sacamos el factor común 2x: \(2x(x + 4)\)'
          }
        ]
      }
    },
    {
      id: 'geometry',
      title: 'Geometría',
      description: 'Explora las formas geométricas y sus propiedades fundamentales.',
      image: 'https://s1.significados.com/foto/geometria-og.jpg',
      category: 'Geometría',
      videoUrl: 'https://www.youtube.com/embed/wGS8x2IbZfU',
      helpVideos: [
        {
          title: "Área de un cuadrado",
          url: "https://www.youtube.com/embed/f0Me4RjKJp4",
          description: "Área de un cuadrado"
        },
        {
          title: "Áreas y Perímetros",
          url: "https://www.youtube.com/embed/l3ZydJ4RGjM",
          description: "Perímetro de un rectángulo"
        },
        {
          title: "Área de un triángulo",
          url: "https://www.youtube.com/embed/pPticNTF6so",
          description: "Calcular el área de un triángulo"
        },
        {
          title: "Perímetro de un cuadrado",
          url: "https://www.youtube.com/embed/PBfcIieUvto",
          description: "Calcular el perímetro de un cuadrado	"
        },
        {
          title: "Área de un círculo",
          url: "https://www.youtube.com/embed/f5n4DNpMw0s",
          description: "Calcular el área de un círculo"
        },
        {
          title: "Volumen de un cubo",
          url: "https://www.youtube.com/embed/Zu7BJuPuWBk",
          description: "Calcular el volumen de un cubo"
        },
        
        
        
      ],
      content: {
        introduction: 'La geometría es el estudio de las formas, tamaños y posiciones de figuras en el espacio. Este módulo te introducirá a los conceptos fundamentales de la geometría plana y espacial.',
        theory: `La geometría se basa en el estudio de figuras geométricas y sus propiedades. Aprenderemos a calcular áreas, perímetros y volúmenes de las figuras más comunes.

Conceptos fundamentales:

1. Cuadrado 🟦
   - Figura de 4 lados iguales y 4 ángulos rectos (90°)
   - Área = lado × lado
   - Perímetro = 4 × lado
   - Ejemplo: Si el lado es 5 cm
     * Área = 5 × 5 = 25 cm²
     * Perímetro = 4 × 5 = 20 cm

2. Rectángulo 📏
   - Figura de 4 lados, lados opuestos iguales, 4 ángulos rectos
   - Área = base × altura
   - Perímetro = 2 × (base + altura)
   - Ejemplo: Si base = 6 cm y altura = 4 cm
     * Área = 6 × 4 = 24 cm²
     * Perímetro = 2 × (6 + 4) = 20 cm

3. Triángulo 📐
   - Figura de 3 lados y 3 ángulos
   - Área = (base × altura) ÷ 2
   - Ejemplo: Si base = 8 cm y altura = 6 cm
     * Área = (8 × 6) ÷ 2 = 24 cm²

4. Círculo ⭕
   - Figura curva donde todos los puntos están a igual distancia del centro
   - Radio: distancia del centro a cualquier punto del círculo
   - Área = π × radio²
   - Ejemplo: Si radio = 3 cm (usando π = 3.14)
     * Área = 3.14 × 3² = 28.26 cm²

5. Cubo 📦
   - Figura tridimensional de 6 caras cuadradas iguales
   - Volumen = lado × lado × lado = lado³
   - Ejemplo: Si la arista = 4 cm
     * Volumen = 4³ = 64 cm³

Fórmulas importantes:
- Área del cuadrado = lado²
- Área del rectángulo = base × altura
- Área del triángulo = (base × altura) ÷ 2
- Área del círculo = πr²
- Perímetro del cuadrado = 4 × lado
- Perímetro del rectángulo = 2(base + altura)
- Volumen del cubo = lado³

Consejos para resolver problemas:
1. Identifica la figura geométrica
2. Reconoce los datos proporcionados
3. Selecciona la fórmula adecuada
4. Sustituye los valores en la fórmula
5. Realiza los cálculos paso a paso
6. No olvides incluir las unidades (cm, cm², cm³)`,
        examples: [
          {
            problem: 'Calcula el área de un rectángulo de base 6 cm y altura 4 cm',
            solution: 'Área = 24 cm²',
            explanation: 'El área de un rectángulo se calcula multiplicando base por altura:\nÁrea = base × altura\nÁrea = 6 cm × 4 cm = 24 cm²'
          },
          {
            problem: 'Encuentra el perímetro de un cuadrado de lado 5 cm',
            solution: 'Perímetro = 20 cm',
            explanation: 'El perímetro de un cuadrado es la suma de todos sus lados:\nPerímetro = 4 × lado\nPerímetro = 4 × 5 cm = 20 cm'
          },
          {
            problem: 'Calcula el área de un triángulo con base 8 cm y altura 6 cm',
            solution: 'Área = 24 cm²',
            explanation: 'El área de un triángulo es base por altura dividido entre 2:\nÁrea = (base × altura) ÷ 2\nÁrea = (8 cm × 6 cm) ÷ 2 = 24 cm²'
          }
        ]
      }
    },
    {
      id: 'statistics',
      title: 'Estadística',
      description: 'Aprende a analizar y representar datos estadísticos en el deporte.',
      image: 'https://st2.depositphotos.com/5365202/9486/v/450/depositphotos_94863172-stock-illustration-successful-business-vector.jpg',
      category: 'Estadística',
      videoUrl: 'https://www.youtube.com/embed/Mywx4zTP77g',
      helpVideos: [
        {
          title: "Medidas de Tendencia Central",
          url: "https://www.youtube.com/embed/RrWsyV_Q1-Y",
          description: "Media, mediana y moda"
        }
      ],
      content: {
        introduction: 'Las medidas de tendencia central nos ayudan a encontrar valores representativos de un conjunto de datos. Son fundamentales para entender y analizar información numérica.',
        theory: `Las medidas de tendencia central son valores que nos ayudan a describir un conjunto de datos de manera resumida. 

Conceptos fundamentales:

1. Media Aritmética (Promedio) 📊
   - Es la suma de todos los valores dividida entre el número total de valores
   - Fórmula: Media = (x₁ + x₂ + ... + xₙ) ÷ n
   - Ejemplo: Para los números 2, 4, 6, 8
     * Suma = 2 + 4 + 6 + 8 = 20
     * Total de números = 4
     * Media = 20 ÷ 4 = 5

2. Mediana 📏
   - Es el valor que está en el medio cuando los datos están ordenados
   - Para encontrarla:
     1. Ordenar los números de menor a mayor
     2. Si hay cantidad impar de números, es el valor central
     3. Si hay cantidad par, es el promedio de los dos valores centrales
   - Ejemplo: Para 3, 1, 4, 1, 5
     * Ordenados: 1, 1, 3, 4, 5
     * Mediana = 3 (valor central)

3. Moda 🎯
   - Es el valor que más se repite en un conjunto de datos
   - Puede haber más de una moda
   - Ejemplo: En 2, 3, 3, 4, 5, 3, 6
     * Moda = 3 (aparece tres veces)

Consejos para calcular medidas de tendencia central:
1. Para la media:
   - Suma todos los valores cuidadosamente
   - Divide entre el total de valores
   - Verifica que el resultado tenga sentido

2. Para la mediana:
   - Siempre ordena los números primero
   - Identifica si hay cantidad par o impar de valores
   - En caso par, promedia los dos valores centrales

3. Para la moda:
   - Cuenta cuántas veces aparece cada valor
   - Puede haber más de una moda
   - Si todos los valores aparecen una vez, no hay moda`,
        examples: [
          {
            problem: 'Encuentra la media de: 4, 8, 6, 10, 7',
            solution: 'Media = 7',
            explanation: '1. Suma todos los números: 4 + 8 + 6 + 10 + 7 = 35\n2. Divide entre la cantidad de números: 35 ÷ 5 = 7'
          },
          {
            problem: 'Calcula la mediana de: 3, 8, 2, 6, 9, 4',
            solution: 'Mediana = 5',
            explanation: '1. Ordena los números: 2, 3, 4, 6, 8, 9\n2. Como hay 6 números (par), promedia los dos centrales: (4 + 6) ÷ 2 = 5'
          },
          {
            problem: 'Encuentra la moda de: 2, 5, 3, 5, 8, 5, 4',
            solution: 'Moda = 5',
            explanation: 'El número 5 aparece tres veces, más que cualquier otro número'
          }
        ]
      }
    }
  ];

  const generateExercises = (lessonId: string) => {
    switch (lessonId) {
      case 'algebra':
        return [
          {
            id: 1,
            question: '¡Encuentra el factor común! 🎯\n2x^2 + 6x',
            options: ['2x(x + 3)', '2(x + 3)', 'x(2x + 6)', '2x(x + 2)'],
            correctAnswer: 0,
            explanation: '¡Genial! Sacamos el factor común 2x: 2x(x + 3) ✨'
          },
          {
            id: 2,
            question: '¡Agrupa y factoriza! 🎨\nax + ay + bx + by',
            options: ['(a + b)(x + y)', '(x + y)(a + b)', '(a + x)(b + y)', '(a - b)(x + y)'],
            correctAnswer: 0,
            explanation: '¡Excelente! Agrupamos términos semejantes: (ax + ay) + (bx + by) = a(x + y) + b(x + y) = (a + b)(x + y) 🌟'
          },
          {
            id: 3,
            question: '¡Descubre el trinomio cuadrado perfecto! 🎪\nx^2 + 6x + 9',
            options: ['(x + 3)^2', '(x - 3)^2', '(x + 3)(x + 3)', '(x - 3)(x - 3)'],
            correctAnswer: 0,
            explanation: '¡Increíble! Es un trinomio cuadrado perfecto donde a = x y b = 3 🎉'
          },
          {
            id: 4,
            question: 'Diferencia de cuadrados: Factoriza 25x^2 - 16',
            options: ['(5x + 4)(5x - 4)', '(5x + 4)(5x + 4)', '(5x - 4)(5x - 4)', '(5x - 2)(5x + 2)'],
            correctAnswer: 0,
            explanation: 'Aplicamos la fórmula a^2 - b^2 = (a + b)(a - b) donde a = 5x y b = 4'
          },
          {
            id: 5,
            question: 'Trinomio de la forma ax^2 + bx + c: Factoriza 2x^2 + 7x + 3',
            options: ['(2x + 1)(x + 3)', '(2x + 3)(x + 1)', '(2x - 1)(x - 3)', '(2x - 3)(x - 1)'],
            correctAnswer: 1,
            explanation: 'Buscamos dos números que multiplicados den 6 (2×3) y sumados den 7'
          },
          {
            id: 6,
            question: '¡Factoriza esta diferencia de cubos! 🎲\nx^3 - 8',
            options: ['(x - 2)(x^2 + 2x + 4)', '(x + 2)(x^2 - 2x + 4)', '(x - 2)(x^2 - 2x + 4)', '(x + 2)(x^2 + 2x + 4)'],
            correctAnswer: 0,
            explanation: '¡Fantástico! La diferencia de cubos a^3 - b^3 = (a - b)(a^2 + ab + b^2) 🌈'
          },
          {
            id: 7,
            question: '¡Resuelve este trinomio especial! 🎭\nx^2 - 4x + 4',
            options: ['(x - 2)^2', '(x + 2)^2', '(x - 2)(x - 2)', '(x + 2)(x - 2)'],
            correctAnswer: 0,
            explanation: '¡Magnífico! Es un trinomio cuadrado perfecto donde a = x y b = -2 ⭐'
          }
        ];

      case 'geometry':
        return [
          {
            id: 1,
            question: '¡Calcula el área del cuadrado! 🟦\nSi el lado mide 6 cm',
            options: ['36 cm²', '24 cm²', '30 cm²', '42 cm²'],
            correctAnswer: 0,
            explanation: '¡Excelente! El área del cuadrado es lado × lado = 6 × 6 = 36 cm² 🎨'
          },
          {
            id: 2,
            question: '¡Encuentra el área del rectángulo! 📏\nBase: 8 cm, Altura: 5 cm',
            options: ['40 cm²', '26 cm²', '35 cm²', '45 cm²'],
            correctAnswer: 0,
            explanation: '¡Muy bien! El área del rectángulo es base × altura = 8 × 5 = 40 cm² ✨'
          },
          {
            id: 3,
            question: '¡Calcula el área del triángulo! 📐\nBase: 10 cm, Altura: 6 cm',
            options: ['30 cm²', '25 cm²', '35 cm²', '40 cm²'],
            correctAnswer: 0,
            explanation: '¡Genial! El área del triángulo es (base × altura) ÷ 2 = (10 × 6) ÷ 2 = 30 cm² 🌟'
          },
          {
            id: 4,
            question: '¡Descubre el área del círculo! ⭕\nRadio: 4 cm (usa π = 3.14)',
            options: ['50.24 cm²', '48.24 cm²', '52.24 cm²', '46.24 cm²'],
            correctAnswer: 0,
            explanation: '¡Increíble! El área del círculo es πr² = 3.14 × 4² = 3.14 × 16 = 50.24 cm² 🎯'
          },
          {
            id: 5,
            question: '¡Calcula el perímetro del rectángulo! 📏\nBase: 12 cm, Altura: 7 cm',
            options: ['38 cm', '36 cm', '40 cm', '42 cm'],
            correctAnswer: 0,
            explanation: '¡Fantástico! El perímetro del rectángulo es 2(base + altura) = 2(12 + 7) = 2(19) = 38 cm 🎨'
          },
          {
            id: 6,
            question: '¡Encuentra el perímetro del cuadrado! 🟦\nLado: 9 cm',
            options: ['36 cm', '32 cm', '40 cm', '38 cm'],
            correctAnswer: 0,
            explanation: '¡Excelente! El perímetro del cuadrado es 4 × lado = 4 × 9 = 36 cm ⭐'
          },
          {
            id: 7,
            question: '¡Calcula el volumen del cubo! 📦\nArista: 5 cm',
            options: ['125 cm³', '115 cm³', '135 cm³', '145 cm³'],
            correctAnswer: 0,
            explanation: '¡Magnífico! El volumen del cubo es lado³ = 5³ = 125 cm³ 🎉'
          },
          {
            id: 8,
            question: '¡Área del cuadrado mágico! 🟦\nLado: 7.5 cm',
            options: ['56.25 cm²', '54.25 cm²', '58.25 cm²', '52.25 cm²'],
            correctAnswer: 0,
            explanation: '¡Muy bien! El área del cuadrado es lado × lado = 7.5 × 7.5 = 56.25 cm² 🌈'
          },
          {
            id: 9,
            question: '¡Calcula el área del rectángulo gigante! 📏\nBase: 15 cm, Altura: 8 cm',
            options: ['120 cm²', '110 cm²', '130 cm²', '140 cm²'],
            correctAnswer: 0,
            explanation: '¡Perfecto! El área del rectángulo es base × altura = 15 × 8 = 120 cm² ✨'
          },
          {
            id: 10,
            question: '¡Descubre el volumen del cubo misterioso! 📦\nArista: 6 cm',
            options: ['216 cm³', '206 cm³', '226 cm³', '236 cm³'],
            correctAnswer: 0,
            explanation: '¡Excelente! El volumen del cubo es lado³ = 6³ = 216 cm³ 🎈'
          }
        ];

      case 'statistics':
        return [
          {
            id: 1,
            question: '¡Calcula la media! 📊\nNúmeros: 15, 20, 25, 30, 35',
            options: ['25', '20', '30', '35'],
            correctAnswer: 0,
            explanation: '¡Excelente! Suma todos los números (125) y divide entre la cantidad (5): 125 ÷ 5 = 25 ⭐'
          },
          {
            id: 2,
            question: '¡Encuentra la mediana! 📏\nNúmeros: 7, 3, 9, 5, 1',
            options: ['5', '3', '7', '9'],
            correctAnswer: 0,
            explanation: '¡Muy bien! Ordenando los números: 1, 3, 5, 7, 9. La mediana es 5 (valor central) 🎯'
          },
          {
            id: 3,
            question: '¡Descubre la moda! 🎲\nNúmeros: 4, 2, 4, 3, 4, 6, 2',
            options: ['4', '2', '3', '6'],
            correctAnswer: 0,
            explanation: '¡Genial! El número 4 aparece tres veces, más que cualquier otro número 🌟'
          },
          {
            id: 4,
            question: '¡Media mágica! 🎨\nSi la media de cinco números es 10, y cuatro de ellos son 8, 12, 9 y 13, ¿cuál es el quinto número?',
            options: ['8', '10', '12', '14'],
            correctAnswer: 0,
            explanation: '¡Increíble! Si la suma total debe ser 50 (10 × 5), y la suma de los cuatro números es 42, entonces 50 - 42 = 8 ✨'
          },
          {
            id: 5,
            question: '¡Mediana misteriosa! 🔍\nNúmeros: 4, 8, 2, 6, 10',
            options: ['6', '4', '8', '2'],
            correctAnswer: 0,
            explanation: '¡Fantástico! Ordenando: 2, 4, 6, 8, 10. La mediana es 6 🎈'
          },
          {
            id: 6,
            question: '¡Encuentra la moda! 🎯\nNúmeros: 5, 3, 5, 2, 5, 4, 1',
            options: ['5', '3', '2', '4'],
            correctAnswer: 0,
            explanation: '¡Excelente! El número 5 aparece tres veces 🌈'
          },
          {
            id: 7,
            question: '¡Media de edades! 👥\nEdades: 12, 14, 13, 15, 11',
            options: ['13', '12', '14', '15'],
            correctAnswer: 0,
            explanation: '¡Muy bien! Suma todas las edades (65) y divide entre 5: 65 ÷ 5 = 13 🎉'
          },
          {
            id: 8,
            question: '¡Mediana de temperaturas! 🌡️\nTemperaturas: 22°C, 19°C, 25°C, 20°C, 23°C',
            options: ['22°C', '19°C', '25°C', '20°C'],
            correctAnswer: 0,
            explanation: '¡Perfecto! Ordenando: 19, 20, 22, 23, 25. La mediana es 22°C 🌞'
          },
          {
            id: 9,
            question: '¡Moda de calificaciones! 📚\nNotas: 85, 90, 85, 95, 85, 80',
            options: ['85', '90', '95', '80'],
            correctAnswer: 0,
            explanation: '¡Genial! La nota 85 aparece tres veces 🎓'
          },
          {
            id: 10,
            question: '¡Media de puntos! 🏀\nPuntos: 8, 12, 10, 14, 6',
            options: ['10', '8', '12', '14'],
            correctAnswer: 0,
            explanation: '¡Excelente! Suma todos los puntos (50) y divide entre 5: 50 ÷ 5 = 10 🏆'
          }
        ];
    }
  };

  const handleNavigation = (section: string) => {
    setCurrentSection(section);
    setSelectedLesson(null);
    setShowQuiz(false);
    setShowPractice(false);
  };

  const handlePracticeClick = () => {
    if (selectedLesson) {
      setShowPractice(true);
      setShowQuiz(false);
    }
  };

  const renderContent = () => {
    if (currentSection === 'home') {
      return (
        <div className="space-y-12">
          {/* Sección Sobre el Proyecto */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Sobre MatemáticasPlus</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-gray-600 mb-4">
                  MatemáticasPlus es una plataforma educativa diseñada para estudiantes de 8vo curso, 
                  que busca hacer el aprendizaje de las matemáticas más divertido e interactivo.
                </p>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-indigo-600">Nuestros Objetivos:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Hacer las matemáticas accesibles y divertidas</li>
                    <li>Proporcionar contenido interactivo y personalizado</li>
                    <li>Ayudar a desarrollar habilidades matemáticas sólidas</li>
                    <li>Fomentar el pensamiento lógico y analítico</li>
                  </ul>
                </div>
              </div>
              <div className="bg-indigo-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-indigo-600 mb-4">¿Por qué elegirnos?</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🎯</span>
                    <div>
                      <h4 className="font-semibold">Contenido Personalizado</h4>
                      <p className="text-gray-600">Lecciones adaptadas al nivel de 8vo curso</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🎮</span>
                    <div>
                      <h4 className="font-semibold">Aprendizaje Interactivo</h4>
                      <p className="text-gray-600">Ejercicios prácticos y visualizaciones dinámicas</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🤝</span>
                    <div>
                      <h4 className="font-semibold">Soporte Continuo</h4>
                      <p className="text-gray-600">Ayuda y recursos adicionales disponibles</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sección de Temas */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestros Temas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg">
                <span className="text-4xl mb-4 block">📐</span>
                <h3 className="text-xl font-semibold mb-2">Geometría</h3>
                <p className="text-gray-600">Explora figuras, áreas, perímetros y más</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg">
                <span className="text-4xl mb-4 block">🔢</span>
                <h3 className="text-xl font-semibold mb-2">Álgebra</h3>
                <p className="text-gray-600">Factorización y ecuaciones algebraicas</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg">
                <span className="text-4xl mb-4 block">📊</span>
                <h3 className="text-xl font-semibold mb-2">Estadística</h3>
                <p className="text-gray-600">Medidas de tendencia central y análisis de datos</p>
              </div>
            </div>
          </section>

          {/* Sección de Contacto y Redes Sociales */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Conéctate con Nosotros</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-indigo-600 mb-4">Contacto</h3>
                <div className="space-y-3">
                  <p className="flex items-center text-gray-600">
                    <span className="text-xl mr-3">📧</span>
                    <a href="mailto:contacto@matematicasplus.com" className="hover:text-indigo-600">
                      contacto@matematicasplus.com
                    </a>
                  </p>
                  <p className="flex items-center text-gray-600">
                    <span className="text-xl mr-3">📱</span>
                    <span>+1 234 567 890</span>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-600 mb-4">Redes Sociales</h3>
                <div className="flex space-x-4">
                  <a href="#" className="p-3 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors">
                    <span className="text-2xl">👨‍🏫</span>
                  </a>
                  <a href="#" className="p-3 bg-pink-100 rounded-full hover:bg-pink-200 transition-colors">
                    <span className="text-2xl">📸</span>
                  </a>
                  <a href="#" className="p-3 bg-sky-100 rounded-full hover:bg-sky-200 transition-colors">
                    <span className="text-2xl">🐦</span>
                  </a>
                  <a href="#" className="p-3 bg-red-100 rounded-full hover:bg-red-200 transition-colors">
                    <span className="text-2xl">📺</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center text-gray-600 mt-12">
            <p>© 2024 MatemáticasPlus. Todos los derechos reservados.</p>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="#" className="hover:text-indigo-600">Términos y Condiciones</a>
              <span>•</span>
              <a href="#" className="hover:text-indigo-600">Política de Privacidad</a>
            </div>
          </footer>
        </div>
      );
    }

    if (currentSection === 'lessons' || selectedLesson) {
      if (selectedLesson && !showQuiz && !showPractice) {
        const lessonContent = lessons.find(l => l.id === selectedLesson)?.content;
        const videoUrl = lessons.find(l => l.id === selectedLesson)?.videoUrl;
        return (
          <div className="space-y-8">
            <button
              onClick={() => setSelectedLesson(null)}
              className="text-indigo-600 font-medium hover:text-indigo-800"
            >
              ← Volver a las lecciones
            </button>
            {lessonContent && (
              <LessonContent
                title={lessons.find(l => l.id === selectedLesson)?.title || ''}
                category={lessons.find(l => l.id === selectedLesson)?.category || ''}
                {...lessonContent}
                videoUrl={videoUrl}
                onPracticeClick={handlePracticeClick}
              />
            )}
          </div>
        );
      }

      if (showPractice) {
        const currentLesson = lessons.find(l => l.id === selectedLesson);
        
        return (
          <div className="space-y-8">
            <button
              onClick={() => setShowPractice(false)}
              className="text-indigo-600 font-medium hover:text-indigo-800"
            >
              ← Volver a la lección
            </button>
            <PracticeExercises
              exercises={generateExercises(selectedLesson || '')}
              title={`Ejercicios de ${currentLesson?.title}`}
              videos={currentLesson?.helpVideos || []}
            />
          </div>
        );
      }

      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson, index) => (
            <div key={index} onClick={() => { setSelectedLesson(lesson.id); setCurrentSection('exercises'); }} className="cursor-pointer">
              <LessonCard {...lesson} />
            </div>
          ))}
        </div>
      );
    }

    if (currentSection === 'exercises') {
      if (selectedLesson) {
        const currentLesson = lessons.find(l => l.id === selectedLesson);
        
        return (
          <PracticeExercises
            exercises={generateExercises(selectedLesson)}
            title={`Ejercicios de ${currentLesson?.title}`}
            videos={currentLesson?.helpVideos || []}
          />
        );
      }
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson, index) => (
            <div key={index} onClick={() => { setSelectedLesson(lesson.id); setCurrentSection('exercises'); }} className="cursor-pointer">
              <LessonCard {...lesson} />
            </div>
          ))}
        </div>
      );
    }

    if (selectedLesson) {
      return (
        <PracticeExercises
          exercises={generateExercises(selectedLesson)}
          title={`Ejercicios de ${lessons.find(l => l.id === selectedLesson)?.title}`}
        />
      );
    }

    if (currentSection === 'resources') {
      return (
        <ResourceLinks
          resources={[
            {
              title: 'Ejercicios Interactivos de Geometría',
              description: 'Explora conceptos geométricos con ejercicios interactivos en MateFacil',
              url: 'https://www.matesfacil.com/interactivos/primaria/geometria/indice-ejercicios-interactivos-geometria-plana.html',
              type: 'video'
            },
            {
              title: 'GeoGebra - Geometría Interactiva',
              description: 'Herramienta interactiva para explorar conceptos geométricos',
              url: 'https://www.geogebra.org/geometry',
              type: 'interactive'
            },
            {
              title: 'WordWall',
              description: 'Descubre un montón de juegos matemáticos para divertirte y aprender',
              url: 'https://wordwall.net/es-cl/community/ejercicios-de-matematica',
              type: 'video'
            }
          ]}
        />
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Patrón de fondo */}
      <div className="absolute inset-0 opacity-5 pattern-math"></div>
      
      <Navigation onNavigate={handleNavigation} currentSection={currentSection} />
      
      {/* Hero Section con gradiente actualizado */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white py-16 relative">
        {/* Burbujas animadas */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="bubble-animation"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ¡Aprende Matemáticas Jugando! 
            <span className="text-yellow-300">✨</span>
          </h1>
          <p className="text-xl text-white opacity-90">
            Tu aventura matemática comienza aquí 🚀
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="relative">
        {/* Patrón de fondo */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="pattern-math"></div>
        </div>
        
        {/* Contenido */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
          {renderContent()}
        </div>
      </div>

      {/* Calculadora Flotante */}
      <Calculator />
    </div>
  );
}

export default App;