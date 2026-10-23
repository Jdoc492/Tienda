import React, { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { FaWhatsapp, FaBars } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/imgBanner/er.png';
import TextCarousel from './TextCarousel';
import config, { enlaceWhatsApp } from '../config';
import { useProductos } from '../data/ProductsContext';

const promotions = [
  'Paga contra entrega: no pagas nada por adelantado',
  'Envío gratis a toda Colombia',
  'Atención por WhatsApp todos los días',
  'Garantía por defectos de fábrica',
];

const links = [
  { path: '/', label: 'Inicio' },
  { path: '/catalogo', label: 'Catálogo' },
  { path: '/politicas/envios', label: 'Envíos' },
];

const NavBar = () => {
  const [show, setShow] = useState(false);
  const [compacto, setCompacto] = useState(false);
  const { categorias } = useProductos();

  // Al bajar, el encabezado se hace más bajo y gana sombra
  useEffect(() => {
    let pendiente = false;
    const revisar = () => {
      pendiente = false;
      setCompacto(window.scrollY > 24);
    };
    const alDesplazar = () => {
      if (!pendiente) {
        pendiente = true;
        window.requestAnimationFrame(revisar);
      }
    };
    revisar();
    window.addEventListener('scroll', alDesplazar, { passive: true });
    return () => window.removeEventListener('scroll', alDesplazar);
  }, []);

  const cerrar = () => setShow(false);
  const whatsapp = enlaceWhatsApp('Hola, quiero más información');

  return (
    <>
      <TextCarousel promotions={promotions} />

      <header className={`encabezado ${compacto ? 'compacto' : ''}`}>
        <div className="envoltura encabezado-fila">
          <button className="icono-boton boton-hamburguesa" onClick={() => setShow(true)} aria-label="Abrir menú">
            <FaBars size={20} />
          </button>

          <Link to="/" className="encabezado-logo" aria-label={`${config.nombreTienda}, ir al inicio`}>
            <img src={logo} alt={config.nombreTienda} />
          </Link>

          <nav className="encabezado-menu" aria-label="Menú principal">
            {links.map((link) => (
              <NavLink key={link.path} to={link.path} end className={({ isActive }) => (isActive ? 'activo' : '')}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="encabezado-acciones">
            <a className="boton-whatsapp-encabezado" href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Escríbenos por WhatsApp">
              <FaWhatsapp size={22} />
              <span>Escríbenos</span>
            </a>
          </div>
        </div>
      </header>

      <Offcanvas show={show} onHide={cerrar} placement="start" className="menu-lateral">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><img src={logo} alt={config.nombreTienda} height="30" /></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <nav className="menu-movil" aria-label="Menú">
            {links.map((link) => (
              <Link key={link.path} to={link.path} onClick={cerrar}>{link.label}</Link>
            ))}
          </nav>
          {categorias.length > 0 && <h2 className="menu-subtitulo">Categorías</h2>}
          <nav className="menu-movil menu-categorias" aria-label="Categorías">
            {categorias.map((categoria) => (
              <Link key={categoria.id} to={`/catalogo?categoria=${categoria.id}`} onClick={cerrar}>
                {categoria.nombre}
              </Link>
            ))}
          </nav>
          <a className="boton boton-whatsapp boton-ancho mt-4" href={whatsapp} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp size={20} /> Escríbenos por WhatsApp
          </a>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavBar;
