import React from 'react';
import { Link } from 'react-router-dom';
import { useProductos } from '../data/ProductsContext';
import ProductCard from './ProductCard';
import Revelar from './Revelar';
import { RejillaEsqueleto } from './Esqueleto';

const Catalog = ({ excludeId, title = 'Productos destacados' }) => {
  const { productos, cargando } = useProductos();
  const products = productos.filter((product) => product.id !== excludeId).slice(0, 4);

  if (!cargando && products.length === 0) return null;

  return (
    <section className="seccion">
      <div className="envoltura">
        <Revelar className="seccion-titulo">
          <h2>{title}</h2>
          <Link to="/catalogo" className="enlace-flecha">Ver todo →</Link>
        </Revelar>
        {cargando ? (
          <RejillaEsqueleto cantidad={4} />
        ) : (
          <div className="rejilla">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} indice={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Catalog;
