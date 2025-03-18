// Importamos React y el hook useState para manejar estados dentro del componente
import React, { useState } from 'react';

// Importamos el archivo de estilos CSS para agregar diseño a la aplicación
import './App.css';

// Importamos el componente TresEnRaya que contiene el juego del tres en raya
import TresEnRaya from './TresEnRaya';

// Función principal que renderiza nuestra aplicación
export default function MyApp() {
  // Estado para indicar si el robot está saludando (true/false)
  const [isWaving, setIsWaving] = useState(false);

  // Estado para manejar el mensaje del robot en el chat
  const [chatMessage, setChatMessage] = useState('');

  // Estado para almacenar lo que el usuario escribe en el input
  const [userInput, setUserInput] = useState('');

  // Estado para determinar si se muestra el juego TresEnRaya
  const [mostrarJuego, setMostrarJuego] = useState(false);

  // Estado para controlar la imagen que se muestra del robot
  const [robotSrc, setRobotSrc] = useState('/robot_still.png'); // Por defecto, el robot está estático

  /**
   * Función que ejecuta la acción del robot para saludar.
   * Cambia la imagen del robot a un GIF de saludo por 2 segundos y actualiza el mensaje del chat.
   */
  function handleWave() {
    setIsWaving(true); // Cambiamos el estado indicando que el robot está saludando
    setRobotSrc('/robot_wave.gif'); // Actualizamos la imagen a un GIF que muestra al robot saludando

    // Después de 2 segundos, regresamos la imagen del robot a su estado inicial y agregamos un mensaje al chat
    setTimeout(() => {
      setIsWaving(false); // Indicamos que el robot deja de saludar
      setRobotSrc('/robot_still.png'); // Volvemos al PNG estático del robot
      setChatMessage('¡Hola! ¿Cómo estás?'); // Mostramos un mensaje de saludo en el chat
    }, 2000);
  }

  /**
   * Función que maneja la despedida del robot cuando el usuario escribe "adios".
   * Cambia la imagen del robot a un GIF deprimido y envía un mensaje de despedida.
   */
  function handleGoodbye() {
    setRobotSrc('/robot_depressed.gif'); // Cambiamos la imagen a un GIF mostrando al robot "deprimido"
    setChatMessage('¡Adiós! Espero verte pronto.'); // Mostramos un mensaje de despedida en el chat

    // Opcional: después de 5 segundos, el robot regresa a su estado inicial
    setTimeout(() => {
      setRobotSrc('/robot_still.png'); // Volvemos al PNG estático del robot
    }, 5000);
  }

  /**
   * Función para manejar los cambios en el input del usuario.
   * Se ejecuta cada vez que el usuario escribe algo.
   */
  function handleInputChange(event) {
    setUserInput(event.target.value); // Actualizamos el estado del input con el texto ingresado por el usuario
  }

  /**
   * Función que maneja el mensaje ingresado por el usuario y genera una respuesta personalizada.
   * También puede realizar acciones como iniciar el juego o ejecutar un saludo/despedida.
   */
  function handleUserInput() {
    const input = userInput.toLowerCase(); // Convertimos el texto del usuario a minúsculas para evitar problemas con las mayúsculas
    let response = ''; // Variable para almacenar la respuesta del robot

    // Analizamos el texto ingresado y definimos la respuesta según ciertas palabras clave
    if (input.includes('bien')) {
      response = '¡Me alegra oír eso!'; // Respuesta cuando el usuario dice que está bien
    } else if (input.includes('nombre')) {
      response = 'Soy un robot amigable.'; // Respuesta si preguntan el nombre del robot
    } else if (input.includes('ayuda')) {
      response = '¡Claro! ¿En qué puedo ayudarte?'; // Respuesta si el usuario menciona la palabra "ayuda"
    } else if (input.includes('jugar')) {
      setMostrarJuego(true); // Cambiamos el estado para mostrar el juego TresEnRaya
      response = '¡Claro! Aquí tienes un juego de tres en raya.'; // Mensaje para iniciar el juego
    } else if (input.includes('adios')) {
      handleGoodbye(); // Llamamos a la función para manejar la despedida
      return; // Detenemos el flujo para evitar que se sobrescriba la despedida
    } else {
      response = '¡Entiendo! Cuéntame más.'; // Respuesta genérica si no se detecta una palabra clave
    }

    setChatMessage(response); // Actualizamos el mensaje del chat con la respuesta generada
    setUserInput(''); // Limpiamos el input del usuario
  }

  // Renderizamos el contenido de nuestra aplicación
  return (
    <div
      className="container" // Agregamos clases de CSS para diseñar el contenedor principal
      style={{
        minHeight: '100vh', // Altura mínima para que ocupe toda la ventana
        display: 'flex', // Usamos flexbox para alinear los elementos
        flexDirection: 'column', // Los elementos se apilan en columna
        alignItems: 'center', // Centramos los elementos horizontalmente
      }}
    >
      <h1>¡Haz que el robot salude!</h1> {/* Título de la aplicación */}

      {/* Contenedor del robot */}
      <div className="robot-container">
        <img
          src={robotSrc} // Mostramos la imagen actual del robot según el estado
          alt="Robot"
          className="robot" // Clase CSS para diseñar la imagen del robot
        />
      </div>

      {/* Botón para ejecutar la función de saludo */}
      <button onClick={handleWave} className="button">
        ¡Saluda!
      </button>

      {/* Contenedor del chat: mostramos solo si hay un mensaje en el chat */}
      {chatMessage && (
        <div className="chat-container">
          <p>{chatMessage}</p> {/* Mostramos el mensaje del chat */}
          <input
            type="text" // Campo de texto para el input del usuario
            value={userInput} // Enlazamos el estado del input
            onChange={handleInputChange} // Ejecutamos la función cuando el usuario escribe
            placeholder="Escribe tu respuesta..." // Texto de ayuda en el campo de texto
          />
          <button onClick={handleUserInput}>Enviar</button> {/* Botón para enviar el input */}
        </div>
      )}

      {/* Mostramos el componente TresEnRaya solo si el estado mostrarJuego es true */}
      {mostrarJuego && <TresEnRaya />}
    </div>
  );
}
