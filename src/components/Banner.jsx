import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { useProductos } from '../data/ProductsContext';
import { formatoPrecio } from '../config';

// Nombre corto para las etiquetas de precio: "Freidora de aire 5 litros" -> "Freidora de aire"
const nombreCorto = (nombre) => {
  const palabras = [];
  for (const palabra of nombre.split(' ')) {
    if ([...palabras, palabra].join(' ').length > 22) break;
    palabras.push(palabra);
  }
  while (palabras.length > 1 && /^(de|con|y|para|\d+.*)$/i.test(palabras[palabras.length - 1])) palabras.pop();
  return palabras.join(' ');
};

// Portada: mensaje de la tienda a la izquierda y fotos reales del catálogo a la derecha.
// En celular el texto va arriba y las fotos en un carrusel que se desliza con el dedo.
const Banner = () => {
  const { productos, cargando } = useProductos();
  // Productos que se muestran en la portada: primero los que tienen descuento
  const destacados = [...productos].sort((a, b) => Boolean(b.oldPrice) - Boolean(a.oldPrice));
  const collage = destacados.slice(0, 3);
  const carrusel = destacados.slice(0, 8);

  const verComoFunciona = () => {
    document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="portada">
      <div className="envoltura portada-grid">
        <div className="portada-texto">
          <span className="portada-sello">Envío gratis · Pago contra entrega</span>
          <h1>
            Pides, recibes, <span className="resaltado">pagas.</span>
          </h1>
          <p>
            Haz tu pedido sin pagar nada por adelantado. Te llega a la casa y pagas en efectivo
            cuando lo tienes en tus manos.
          </p>
          <div className="portada-botones">
            <Link to="/catalogo" className="boton boton-sol">
              Ver productos <FaArrowRight size={14} />
            </Link>
            <button type="button" className="boton boton-fantasma" onClick={verComoFunciona}>
              Cómo funciona
            </button>
          </div>
          <ul className="portada-puntos">
            <li><FaCheckCircle /> Sin pagos por adelantado</li>
            <li><FaCheckCircle /> Envío gratis a toda Colombia</li>
            <li><FaCheckCircle /> Garantía por defectos de fábrica</li>
          </ul>
        </div>

        <div className="portada-collage">
          {cargando && [1, 2, 3].map((n) => <div key={n} className={`collage-foto collage-${n} collage-esqueleto`} aria-hidden="true" />)}
          {collage.map((product, index) => (
            <Link key={product.id} to={`/producto/${product.id}`} className={`collage-foto collage-${index + 1}`}>
              <img src={product.images[0]} alt={product.name} fetchpriority={index === 0 ? 'high' : 'auto'} />
              <span className="chip-precio">
                <small>{nombreCorto(product.name)}</small>
                {formatoPrecio(product.price)}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="portada-carrusel" aria-label="Productos destacados">
        {cargando && [1, 2, 3].map((n) => (
          <div key={n} className="carrusel-item" aria-hidden="true">
            <div className="esqueleto esqueleto-foto" />
            <div className="esqueleto esqueleto-linea" />
          </div>
        ))}
        {carrusel.map((product) => (
          <Link key={product.id} to={`/producto/${product.id}`} className="carrusel-item">
            <img src={product.images[0]} alt="" loading="lazy" />
            <span className="carrusel-nombre">{product.name}</span>
            <span className="carrusel-precio">{formatoPrecio(product.price)}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Banner;
