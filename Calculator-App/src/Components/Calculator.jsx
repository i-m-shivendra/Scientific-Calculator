import React, { useState } from 'react';
import './Calculator.css';

const buttons = [
  ['2nd', '(', ')', '10^x', 'mc', 'm+', 'm-', 'mr'],
  ['1/x', 'x²', 'x³', 'y^x', 'AC', '←', '+/-', '/'],
  ['x!', '√', 'x√y', 'log', '7', '8', '9', '*'],
  ['sin', 'cos', 'tan', 'ln', '4', '5', '6', '-'],
  ['sinh', 'cosh', 'tanh', 'e^x', '1', '2', '3', '+'],
  ['Rad', 'π', 'EE', 'Rand', '%', '0', '.', '='],
];

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [memory, setMemory] = useState(0);

  const handleClick = (value) => {
    switch (value) {
      case 'AC':
        setExpression('');
        break;
      case '←':
        setExpression(expression.slice(0, -1));
        break;
      case '=':
        try {
          const replaced = expression
            .replace(/π/g, Math.PI)
            .replace(/e\^x/g, 'Math.exp')
            .replace(/√/g, 'Math.sqrt')
            .replace(/x²/g, '**2')
            .replace(/x³/g, '**3')
            .replace(/y\^x/g, '**')
            .replace(/log/g, 'Math.log10')
            .replace(/ln/g, 'Math.log')
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan')
            .replace(/sinh/g, 'Math.sinh')
            .replace(/cosh/g, 'Math.cosh')
            .replace(/tanh/g, 'Math.tanh')
            .replace(/1\/x/g, '(1/')
            .replace(/x!/g, 'factorial')
            .replace(/\^/g, '**');

          const result = eval(replaced);
          setExpression(result.toString());
        } catch {
          setExpression('Error');
        }
        break;
      case 'mc':
        setMemory(0);
        break;
      case 'm+':
        setMemory(memory + parseFloat(expression || '0'));
        break;
      case 'm-':
        setMemory(memory - parseFloat(expression || '0'));
        break;
      case 'mr':
        setExpression(expression + memory.toString());
        break;
      case '+/-':
        setExpression((parseFloat(expression || '0') * -1).toString());
        break;
      case 'Rand':
        setExpression(Math.random().toString());
        break;
      case 'EE':
        setExpression(expression + 'e');
        break;
      default:
        setExpression(expression + value);
        break;
    }
  };

  return (
    <div className="calculator-box p-4 bg-white shadow rounded w-100">
      <input
        type="text"
        className="form-control mb-4 text-end fs-4"
        value={expression}
        readOnly
      />
      {buttons.map((row, i) => (
        <div key={i} className="row g-2 mb-2">
          {row.map((btn, j) => (
            <div key={j} className="col-3 col-md-1 flex-grow-1">
              <button
                className={`btn btn-${/[0-9.=]/.test(btn) ? 'dark' : /AC|←|=/.test(btn) ? 'primary' : 'light'} w-100 button-no-hover`}
                onClick={() => handleClick(btn)}
              >
                {btn}
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Calculator;
