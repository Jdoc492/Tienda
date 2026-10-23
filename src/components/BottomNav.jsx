import React, { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { FaHome, FaThLarge, FaShapes, FaWhatsapp } from 'react-icons/fa';
import { useProductos } from '../data/ProductsContext';
import { enlaceWhatsApp } from '../config';

// Barra de navegación inferior tipo app, solo en celular.
// "Categorías" abre una hoja desde abajo con las categorías y sus fotos.
const BottomNav = () => {
  const [verCategorias, setVerCategorias] = useState(false);
  const { categorias } = useProductos();
  const cerrar = () => setVerCategorias(false);

  return (
    <>
      <nav className="nav-inferior" aria-label="Navegación rápida">
        <NavLink to="/" end>
          <FaHome size={20} />
          <span>Inicio</span>
        </NavLink>
        <NavLink to="/catalogo">
          <FaThLarge size={19} />
          <span>Catálogo</span>
        </NavLink>
        <button type="button" onClick={() => setVerCategorias(true)} className={verCategorias ? 'active' : ''}>
          <FaShapes size={19} />
          <span>Categorías</span>
        </button>
        <a href={enlaceWhatsApp('Hola, vengo de la tienda y quiero más información')} target="_blank" rel="noopener noreferrer" className="nav-inferior-whatsapp">
          <FaWhatsapp size={21} />
          <span>WhatsApp</span>
        </a>
      </nav>

      <Offcanvas show={verCategorias} onHide={cerrar} placement="bottom" className="hoja-categorias">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Categorías</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="hoja-categorias-lista">
            {categorias.map((categoria) => (
              <Link key={categoria.id} to={`/catalogo?categoria=${categoria.id}`} onClick={cerrar} className="hoja-categoria">
                <img src={categoria.foto} alt="" loading="lazy" />
                <span>
                  <strong>{categoria.nombre}</strong>
                  <small>{categoria.cantidad} {categoria.cantidad === 1 ? 'producto' : 'productos'}</small>
                </span>
              </Link>
            ))}
          </div>
          <Link to="/catalogo" onClick={cerrar} className="boton boton-oscuro boton-ancho mt-3">Ver todo el catálogo</Link>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default BottomNav;
