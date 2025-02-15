import React, { useState } from 'react';
import { Calculator as CalculatorIcon, X } from 'lucide-react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [isOpen, setIsOpen] = useState(false);
  const [memory, setMemory] = useState<string[]>([]);

  const buttons = [
    ['sin', 'cos', 'tan', 'DEL'],
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
    ['(', ')', '^', '√'],
  ];

  const handleNumber = (num: string) => {
    setDisplay(prev => prev === '0' ? num : prev + num);
  };

  const handleOperation = (op: string) => {
    switch (op) {
      case 'DEL':
        setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
        break;
      case '=':
        try {
          const expression = display
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/\^/g, '**')
            .replace(/√/g, 'Math.sqrt');
          const result = eval(expression);
          setDisplay(result.toString());
          setMemory(prev => [...prev, `${display} = ${result}`]);
        } catch (error) {
          setDisplay('Error');
        }
        break;
      case 'sin':
      case 'cos':
      case 'tan':
        setDisplay(prev => `Math.${op}(${prev})`);
        break;
      default:
        setDisplay(prev => prev + op);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700"
      >
        <CalculatorIcon className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 w-80">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Calculadora Científica</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="bg-gray-100 p-3 rounded-lg mb-4">
            <div className="text-right text-2xl font-mono">{display}</div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {buttons.map((row, i) => (
              <React.Fragment key={i}>
                {row.map((button) => (
                  <button
                    key={button}
                    onClick={() => {
                      if ('0123456789.()'.includes(button)) {
                        handleNumber(button);
                      } else {
                        handleOperation(button);
                      }
                    }}
                    className="p-2 text-sm bg-gray-50 rounded hover:bg-indigo-100 transition-colors"
                  >
                    {button}
                  </button>
                ))}
              </React.Fragment>
            ))}
          </div>

          {memory.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-semibold mb-2">Historial</h4>
              <div className="max-h-32 overflow-y-auto">
                {memory.map((calc, index) => (
                  <div key={index} className="text-sm text-gray-600 mb-1">
                    {calc}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Calculator; 