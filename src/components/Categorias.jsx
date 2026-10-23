import React from 'react';
import { Link } from 'react-router-dom';
import { useProductos } from '../data/ProductsContext';
import Revelar from './Revelar';

// Sección "Compra por categoría" del inicio: una tarjeta con foto por categoría
const Categorias = () => {
  const { categorias, cargando } = useProductos();
  if (!cargando && categorias.length === 0) return null;

  return (
    <section className="seccion seccion-categorias">
      <div className="envoltura">
        <Revelar className="seccion-titulo">
          <h2>Compra por categoría</h2>
          <Link to="/catalogo" className="enlace-flecha">Ver todo →</Link>
        </Revelar>
        <div className="categorias-lista">
          {cargando && [1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="categoria-celda" aria-hidden="true">
              <div className="categoria-tarjeta esqueleto" />
            </div>
          ))}
          {categorias.map((categoria, index) => (
            <Revelar key={categoria.id} retraso={index * 60} className="categoria-celda">
              <Link to={`/catalogo?categoria=${categoria.id}`} className="categoria-tarjeta">
                <img src={categoria.foto} alt="" loading="lazy" />
                <span className="categoria-texto">
                  <strong>{categoria.nombre}</strong>
                  <small>{categoria.cantidad} {categoria.cantidad === 1 ? 'producto' : 'productos'}</small>
                </span>
              </Link>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categorias;
