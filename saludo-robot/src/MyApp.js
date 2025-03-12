import React, { useState } from 'react';
import './App.css';
import TresEnRaya from './TresEnRaya'; // Importa el componente del juego

export default function MyApp() {
  // Estados utilizados para manejar la lógica de interacción
  const [isWaving, setIsWaving] = useState(false); // Estado para saludar
  const [chatMessage, setChatMessage] = useState(''); // Mensaje del robot en el chat
  const [userInput, setUserInput] = useState(''); // Entrada del usuario
  const [mostrarJuego, setMostrarJuego] = useState(false); // Muestra o no el juego
  const [robotSrc, setRobotSrc] = useState('/robot_still.png'); // Estado para la imagen del robot

  /**
   * Cambia la imagen del robot a un GIF de saludo por 2 segundos,
   * luego vuelve a la imagen original (quieto).
   */
  function handleWave() {
    setIsWaving(true); // Indica que el robot está saludando
    setRobotSrc('/robot_wave.gif'); // Cambia al GIF de saludo
    setTimeout(() => {
      setIsWaving(false); // Deja de saludar
      setRobotSrc('/robot_still.png'); // Regresa al PNG inicial
      setChatMessage('¡Hola! ¿Cómo estás?'); // Mensaje en el chat
    }, 2000);
  }

  /**
   * Cambia la imagen del robot a "deprimido" cuando el usuario dice "adios"
   * y envía un mensaje de despedida.
   */
  function handleGoodbye() {
    setRobotSrc('/robot_depressed.gif'); // Cambia al GIF deprimido
    setChatMessage('¡Adiós! Espero verte pronto.'); // Mensaje de despedida

    // Opcional: después de cierto tiempo, puedes reiniciar el estado del robot
    setTimeout(() => {
      setRobotSrc('/robot_still.png'); // Regresa al estado inicial (quieto)
    }, 5000); // Ajusta el tiempo según tu preferencia
  }

  /**
   * Maneja el cambio del input del usuario.
   * Este método actualiza el estado del input cuando el usuario escribe algo.
   */
  function handleInputChange(event) {
    setUserInput(event.target.value); // Guarda lo que el usuario escribe
  }

  /**
   * Maneja las interacciones del usuario.
   * Responde según las palabras clave ingresadas por el usuario.
   */
  function handleUserInput() {
    const input = userInput.toLowerCase(); // Convierte el input a minúsculas
    let response = '';

    // Analiza las palabras clave ingresadas por el usuario
    if (input.includes('bien')) {
      response = '¡Me alegra oír eso!';
    } else if (input.includes('nombre')) {
      response = 'Soy un robot amigable.';
    } else if (input.includes('ayuda')) {
      response = '¡Claro! ¿En qué puedo ayudarte?';
    } else if (input.includes('jugar')) {
      setMostrarJuego(true); // Muestra el juego "Tres en Raya"
      response = '¡Claro! Aquí tienes un juego de tres en raya.';
    } else if (input.includes('adios')) {
      handleGoodbye(); // Llama al método para manejar la despedida
      return; // Detiene el flujo para evitar sobrescribir la despedida
    } else {
      response = '¡Entiendo! Cuéntame más.';
    }

    setChatMessage(response); // Actualiza el mensaje del robot
    setUserInput(''); // Limpia el input del usuario
  }

  return (
    <div
      className="container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>¡Haz que el robot salude!</h1>

      {/* Contenedor del robot */}
      <div className="robot-container">
        <img
          src={robotSrc} // Utiliza el estado para cambiar la imagen del robot
          alt="Robot"
          className="robot"
        />
      </div>

      {/* Botón para saludar */}
      <button onClick={handleWave} className="button">
        ¡Saluda!
      </button>

      {/* Contenedor del chat */}
      {chatMessage && (
        <div className="chat-container">
          <p>{chatMessage}</p>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Escribe tu respuesta..."
          />
          <button onClick={handleUserInput}>Enviar</button>
        </div>
      )}

      {/* Muestra el juego si es necesario */}
      {mostrarJuego && <TresEnRaya />}
    </div>
  );
}
