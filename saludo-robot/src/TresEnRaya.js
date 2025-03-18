import React, { useState } from 'react';
import './TresEnRaya.css'; // Importamos el archivo CSS para dar estilo al juego

// Componente principal
function TresEnRaya() {
  // Estado para almacenar el tablero, un arreglo de 9 elementos inicializados en null
  const [tablero, setTablero] = useState(Array(9).fill(null));

  // Estado para almacenar el ganador ('X', 'O' o 'Empate')
  const [ganador, setGanador] = useState(null);

  // Estado para controlar si el juego está activo o no
  const [juegoActivo, setJuegoActivo] = useState(true);

  // Función que se ejecuta cuando el usuario hace clic en una casilla
  const handleClick = (index) => {
    // Evitar modificaciones si la casilla ya está ocupada, hay ganador o el juego terminó
    if (tablero[index] || ganador || !juegoActivo) {
      return;
    }

    // Crear una copia del tablero y actualizar la casilla seleccionada con 'X' (jugador humano)
    const nuevoTablero = [...tablero];
    nuevoTablero[index] = 'X';
    setTablero(nuevoTablero);

    // Verificar si el jugador humano ganó
    const nuevoGanador = calcularGanador(nuevoTablero);
    if (nuevoGanador) {
      setGanador(nuevoGanador);
      setJuegoActivo(false); // El juego termina si hay un ganador
    } else if (nuevoTablero.every((casilla) => casilla !== null)) {
      // Si no hay ganador y todas las casillas están llenas, es un empate
      setGanador('Empate');
      setJuegoActivo(false);
    } else {
      // Si no hay ganador ni empate, permite a la IA jugar después de un pequeño retraso
      setTimeout(() => movimientoIA(nuevoTablero), 500);
    }
  };

  // Lógica del movimiento de la IA ('O')
  const movimientoIA = (tableroActual) => {
    // Identificar las casillas vacías
    const casillasDisponibles = tableroActual
      .map((valor, index) => (valor === null ? index : null))
      .filter((valor) => valor !== null);

    // Si no hay casillas disponibles o ya hay ganador, no hacer nada
    if (casillasDisponibles.length === 0 || ganador) {
      return;
    }

    // La IA selecciona una casilla aleatoria
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

  // Función para calcular el ganador
  const calcularGanador = (tablero) => {
    // Combinaciones ganadoras predefinidas
    const lineas = [
      [0, 1, 2], // Fila superior
      [3, 4, 5], // Fila central
      [6, 7, 8], // Fila inferior
      [0, 3, 6], // Columna izquierda
      [1, 4, 7], // Columna central
      [2, 5, 8], // Columna derecha
      [0, 4, 8], // Diagonal principal
      [2, 4, 6], // Diagonal secundaria
    ];

    // Revisar si alguna línea tiene el mismo valor ('X' o 'O') y no es null
    for (let linea of lineas) {
      const [a, b, c] = linea;
      if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
        return tablero[a]; // Retorna el ganador ('X' o 'O')
      }
    }
    return null; // No hay ganador
  };

  // Función para reiniciar el juego
  const resetearJuego = () => {
    setTablero(Array(9).fill(null)); // Limpiar el tablero
    setGanador(null); // Eliminar cualquier ganador
    setJuegoActivo(true); // Reactivar el juego
  };

  // Función para detener el juego manualmente
  const detenerJuego = () => {
    setJuegoActivo(false); // Cambiar el estado del juego a inactivo
    setGanador('Detenido'); // Mostrar que el juego fue detenido
  };

  // Función para renderizar cada casilla
  const renderCasilla = (index) => (
    <button className="casilla" onClick={() => handleClick(index)}>
      {tablero[index]} {/* Mostrar 'X', 'O' o null */}
    </button>
  );

  // Componente principal del juego
  return (
    <div>
      <div className="tablero">
        {/* Renderizar cada casilla */}
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
      {/* Mostrar el estado del juego */}
      {ganador && <p>¡{ganador === 'Empate' ? 'Empate' : `Ganador: ${ganador}`}!</p>}
      <button onClick={resetearJuego}>Reiniciar</button> {/* Botón para reiniciar */}
      <button onClick={detenerJuego}>Detener Juego</button> {/* Botón para detener */}
    </div>
  );
}

export default TresEnRaya; // Exportar el componente principal
