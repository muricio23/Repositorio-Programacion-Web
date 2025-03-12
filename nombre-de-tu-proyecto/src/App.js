import React, { useState } from 'react';
import './App.css';

function MyButton({ count, onClick, label }) {
  return (
    <button onClick={onClick} className="button">
      {label} {count !== undefined ? `(${count} clics)` : ''}
    </button>
  );
}

export default function MyApp() {
  const [sharedCount, setSharedCount] = useState(0);
  const [independentCount, setIndependentCount] = useState(0);

  function handleSharedClick() {
    setSharedCount(sharedCount + 1);
  }

  function handleIndependentClick() {
    setIndependentCount(independentCount + 1);
  }

  return (
    <div className="container">
      <h1>Contadores con React</h1>
      
      <img src="https://static.vecteezy.com/system/resources/previews/018/813/672/non_2x/cute-robot-waving-hand-cartoon-science-technology-concept-isolated-flat-cartoon-style-vector.jpg" alt="Imagen centrada" className="centered-image" />
      
      <div className="button-group">
        <MyButton label="Clic Compartido 1" onClick={handleSharedClick} count={sharedCount} />
        <MyButton label="Clic Compartido 2" onClick={handleSharedClick} count={sharedCount} />
      </div>
      
      <MyButton label="Clic Independiente" onClick={handleIndependentClick} count={independentCount} className="independent-button" />
    </div>
  );
}
