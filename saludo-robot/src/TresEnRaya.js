import React, { useState } from 'react';
import './TresEnRaya.css'; // Asegúrate de tener tu archivo CSS

function TresEnRaya() {
  // Estado para el tablero de juego (9 casillas, inicialmente null)
  const [tablero, setTablero] = useState(Array(9).fill(null));
  // Estado para el ganador ('X', 'O' o 'Empate')
  const [ganador, setGanador] = useState(null);
  // Estado para controlar si el juego está activo
  const [juegoActivo, setJuegoActivo] = useState(true);

  // Función para manejar el clic en una casilla
  const handleClick = (index) => {
    // Si la casilla ya está ocupada, hay un ganador o el juego está inactivo, no hacer nada
    if (tablero[index] || ganador || !juegoActivo) {
      return;
    }

    // Actualizar el tablero con la jugada del usuario ('X')
    const nuevoTablero = [...tablero];
    nuevoTablero[index] = 'X';
    setTablero(nuevoTablero);

    // Verificar si hay un ganador
    const nuevoGanador = calcularGanador(nuevoTablero);
    if (nuevoGanador) {
      setGanador(nuevoGanador);
      setJuegoActivo(false);
    } else if (nuevoTablero.every((casilla) => casilla !== null)) {
      // Si todas las casillas están llenas y no hay ganador, es un empate
      setGanador('Empate');
      setJuegoActivo(false);
    } else {
      // Si no hay ganador ni empate, la IA realiza su movimiento después de un retraso
      setTimeout(() => movimientoIA(nuevoTablero), 500);
    }
  };

  // Función para el movimiento de la IA ('O')
  const movimientoIA = (tableroActual) => {
    // Obtener las casillas disponibles
    const casillasDisponibles = tableroActual
      .map((valor, index) => (valor === null ? index : null))
      .filter((valor) => valor !== null);

    // Si no hay casillas disponibles o ya hay un ganador, no hacer nada
    if (casillasDisponibles.length === 0 || ganador) {
      return;
    }

    // Elegir una casilla aleatoria para la IA
    const eleccionIA = casillasDisponibles[Math.floor(Math.random() * casillasDisponibles.length)];
    const nuevoTablero = [...tableroActual];
    nuevoTablero[eleccionIA] = 'O';
    setTablero(nuevoTablero);

    // Verificar si la IA ganó o si hay un empate
    const nuevoGanador = calcularGanador(nuevoTablero);
    if (nuevoGanador) {
      setGanador(nuevoGanador);
      setJuegoActivo(false);
    } else if (nuevoTablero.every((casilla) => casilla !== null)) {
      setGanador('Empate');
      setJuegoActivo(false);
    }
  };

  // Función para calcular si hay un ganador
  const calcularGanador = (tablero) => {
    const lineas = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Verificar si alguna de las líneas ganadoras coincide
    for (let linea of lineas) {
      const [a, b, c] = linea;
      if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
        return tablero[a];
      }
    }
    return null;
  };

  // Función para reiniciar el juego
  const resetearJuego = () => {
    setTablero(Array(9).fill(null));
    setGanador(null);
    setJuegoActivo(true);
  };

  // Función para detener el juego
  const detenerJuego = () => {
    setJuegoActivo(false);
    setGanador('Detenido');
  };

  // Función para renderizar una casilla del tablero
  const renderCasilla = (index) => (
    <button className="casilla" onClick={() => handleClick(index)}>
      {tablero[index]}
    </button>
  );

  return (
    <div>
      <div className="tablero">
        {renderCasilla(0)}
        {renderCasilla(1)}
        {renderCasilla(2)}
        {renderCasilla(3)}
        {renderCasilla(4)}
        {renderCasilla(5)}
        {renderCasilla(6)}
        {renderCasilla(7)}
        {renderCasilla(8)}
      </div>
      {ganador && <p>¡{ganador === 'Empate' ? 'Empate' : `Ganador: ${ganador}`}!</p>}
      <button onClick={resetearJuego}>Reiniciar</button>
      <button onClick={detenerJuego}>Detener Juego</button>
    </div>
  );
}

export default TresEnRaya;