import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { enlaceWhatsApp } from '../config';

// Botón flotante de WhatsApp, visible en todas las páginas.
// "elevado" lo sube en celular para no tapar la barra de compra del producto.
const WhatsAppButton = ({ elevado }) => (
  <a
    className={`whatsapp-flotante ${elevado ? 'elevado' : ''}`}
    href={enlaceWhatsApp('Hola, vengo de la tienda y quiero más información')}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Escríbenos por WhatsApp"
  >
    <FaWhatsapp size={32} />
  </a>
);

export default WhatsAppButton;
