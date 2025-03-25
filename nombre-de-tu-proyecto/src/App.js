import React, { useState, useReducer } from 'react';
import './App.css';

// Componente MyButton: representa un botón reutilizable que muestra un contador de clics
function MyButton({ count, onClick, label }) {
  return (
    <button onClick={onClick} className="button">
      {label} {count !== undefined ? `(${count} clics)` : ''}
    </button>
  );
}

// Componente ShoppingList: muestra una lista de productos con diferentes estilos según su tipo
function ShoppingList() {
  const products = [
    { title: 'Cabbage', isFruit: false, id: 1 },
    { title: 'Garlic', isFruit: false, id: 2 },
    { title: 'Apple', isFruit: true, id: 3 },
  ];

  // Mapeo de productos a elementos de lista <li>, con colores diferenciados
  const listItems = products.map(product => (
    <li
      key={product.id}
      style={{ color: product.isFruit ? 'magenta' : 'darkgreen' }}
    >
      {product.title}
    </li>
  ));

  return <ul>{listItems}</ul>;
}

// Componente principal para la tabla filtrable de productos
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState(''); // Texto del filtro de búsqueda
  const [inStockOnly, setInStockOnly] = useState(false); // Estado del filtro de productos en stock

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

// Muestra una categoría de productos dentro de la tabla
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

// Muestra una fila de producto en la tabla, resaltando en rojo los que están fuera de stock
function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: 'red' }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

// Componente que genera la tabla de productos según el filtro aplicado
function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  // Filtrado y agrupación de productos
  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow category={product.category} key={product.category} />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

// Barra de búsqueda con campo de texto y filtro de stock
function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

// Lista de productos iniciales
const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

// Estado inicial y reducer para el contador
const initialState = { count: 0 };

function stateReducer(state, action) {
  switch (action.type) {
    case "reset":
      return initialState;
    case "setCount":
      return { ...state, count: action.value };
    default:
      throw new Error("Unknown action");
  }
}

// Componente principal que une todos los elementos de la aplicación
export default function MyApp() {
  const [count, setCount] = useState(0); // Contador sincronizado para los botones
  const [individualCount, setIndividualCount] = useState(0); // Contador individual
  const [state, dispatch] = useReducer(stateReducer, initialState); // Reducer para el nuevo contador

  const addFive = () => dispatch({ type: "setCount", value: state.count + 5 });
  const reset = () => dispatch({ type: "reset" });

  return (
    <div className="container">
      <h1>Mi Aplicación React</h1>
      
      <div className="flex-container">
        {/* Sección izquierda con la lista de compras */}
        <div className="left-section">
          <h2>Lista de Compras</h2>
          <ShoppingList />
           
          <div>
            <h2>Welcome to my app</h2>
            <MyButton label="I'm a button" />
            <MyButton label="I'm a disabled button" disabled={true} />
          </div>

          {/* Nuevo contador con useReducer */}
          <div>
            <h2>Welcome to my counter</h2>
            <p>Count: {state.count}</p>
            <button onClick={addFive}>Add 5</button>
            <button onClick={reset}>Reset</button>
          </div>
        </div> 

        <div className="center-section">
          <h2>Mi Aplicación React</h2>
          <img
            src="https://static.vecteezy.com/system/resources/previews/018/813/672/non_2x/cute-robot-waving-hand-cartoon-science-technology-concept-isolated-flat-cartoon-style-vector.jpg"
            alt="Imagen centrada"
            className="centered-image"
          />
          <div className="button-group">
            <MyButton count={count} onClick={() => setCount(count + 1)} label="Botón Sincronizado 1" />
            <MyButton count={count} onClick={() => setCount(count + 1)} label="Botón Sincronizado 2" />
            <MyButton count={individualCount} onClick={() => setIndividualCount(individualCount + 1)} label="Botón Individual" />
          </div>
        </div>

        {/* Sección derecha con la tabla filtrable de productos */}
        <div className="right-section">
          <h2>Productos Filtrables</h2>
          <FilterableProductTable products={PRODUCTS} />
        </div>
      </div>
    </div>
  );
}