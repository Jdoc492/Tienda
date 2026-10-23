import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../assets/imgBanner/er.png';
import config, { enlaceWhatsApp } from '../config';

const Footer = () => {
  const telefono = config.whatsapp.slice(2).replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');

  return (
    <footer className="pie">
      <div className="envoltura pie-columnas">
        <div>
          <div className="pie-logo"><img src={logo} alt={config.nombreTienda} /></div>
          <p>Tu tienda de confianza en productos de calidad. Despachamos desde Barranquilla a toda Colombia y pagas al recibir.</p>
          {(config.facebook || config.instagram) && (
            <div className="pie-redes">
              {config.facebook && (
                <a href={config.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook size={24} /></a>
              )}
              {config.instagram && (
                <a href={config.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram size={24} /></a>
              )}
            </div>
          )}
        </div>
        <div>
          <h4>Tienda</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/catalogo">Catálogo</Link></li>
          </ul>
        </div>
        <div>
          <h4>Ayuda</h4>
          <ul>
            <li><Link to="/politicas/envios">Política de envío</Link></li>
            <li><Link to="/politicas/garantia">Cambios y garantía</Link></li>
            <li><Link to="/politicas/privacidad">Tratamiento de datos</Link></li>
            <li><Link to="/politicas/terminos">Términos de servicio</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contáctanos</h4>
          <ul className="pie-contacto">
            <li>
              <FaWhatsapp />
              <a href={enlaceWhatsApp('Hola, quiero más información')} target="_blank" rel="noopener noreferrer">{telefono}</a>
            </li>
            <li><FaEnvelope /> <a href={`mailto:${config.correoPedidos}`}>{config.correoPedidos}</a></li>
            {config.correoContacto && config.correoContacto !== config.correoPedidos && (
              <li><FaEnvelope /> <a href={`mailto:${config.correoContacto}`}>{config.correoContacto}</a></li>
            )}
            <li><FaMapMarkerAlt /> Barranquilla, Colombia</li>
          </ul>
        </div>
      </div>
      <div className="envoltura pie-final">
        <span>&copy; {new Date().getFullYear()} {config.nombreTienda}. Todos los derechos reservados.</span>
        <span className="sello-pago">Pago contra entrega</span>
      </div>
    </footer>
  );
};

export default Footer;
