import React from 'react';
import Calculator from './components/Calculator';

const App = () => {
  return (
    <div className="container-fluid p-3 bg-light min-vh-100">
      <h2 className="text-center text-primary mb-4 display-6">Scientific Calculator</h2>
      <Calculator />
    </div>
  );
};

export default App;
