// Importamos el logo y el archivo CSS
import logo from './logo.svg';
import './App.css';

// Este código comentado define un componente de ejemplo llamado App.
// Puedes descomentarlo si deseas usarlo en lugar del componente actual.
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

// Definimos un componente funcional llamado MyButton que muestra un botón
function MyButton() {
  return (
    <button>
      Soy un botón
    </button>
  );
}

// Definimos otro componente funcional principal llamado MyApp
export default function MyApp() {
  return (
    <div>
      <h1>Bienvenido a mi aplicación</h1>
      {/* Llamamos al componente MyButton aquí */}
      <MyButton />
    </div>
  );
}

// Nota: Eliminamos la declaración duplicada de `export default App`
// Si necesitas usar `App`, descomenta la primera función `App` y exporta solo esa.
