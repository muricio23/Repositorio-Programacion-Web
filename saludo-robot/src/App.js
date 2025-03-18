// Importamos React, que es necesario para trabajar con componentes en React
import React from 'react';

// Importamos el componente MyApp desde el archivo MyApp.js (se asume que está en el mismo directorio)
import MyApp from './MyApp'; // Importa MyApp

/**
 * Este es el componente principal de la aplicación llamado App.
 * Sirve como punto de entrada para renderizar otros componentes.
 */
function App() {
  return (
    <div>
      {/* Renderizamos el componente MyApp dentro de un contenedor <div> */}
      <MyApp /> {/* Muestra tu componente original */}    
    </div>
  );
}

// Exportamos el componente App como predeterminado para que otros archivos puedan importarlo
export default App;
