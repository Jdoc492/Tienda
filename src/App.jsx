import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/tienda.css';
import Layout from './components/Layout'; // Importa el Layout aquí
import { ProductsProvider } from './data/ProductsContext';

// HashRouter permite publicar la tienda gratis en GitHub Pages sin configurar el servidor
function App() {
  return (
    <Router>
      <ProductsProvider>
        <Layout />
      </ProductsProvider>
    </Router>
  );
}

export default App;
