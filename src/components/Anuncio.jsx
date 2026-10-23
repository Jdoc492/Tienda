import React from 'react';
import { FaMoneyBillWave, FaTruck, FaShieldAlt, FaWhatsapp } from 'react-icons/fa';

// Franja con las garantías de la tienda
const Anuncio = () => {
  const features = [
    { title: 'Pago contra entrega', description: 'Pagas cuando lo recibes', icon: FaMoneyBillWave },
    { title: 'Envío gratis', description: 'A toda Colombia', icon: FaTruck },
    { title: 'Garantía', description: 'Por defectos de fábrica', icon: FaShieldAlt },
    { title: 'Atención por WhatsApp', description: 'Te respondemos rápido', icon: FaWhatsapp },
  ];

  return (
    <section className="confianza">
      <div className="envoltura">
        <ul className="confianza-lista">
          {features.map(({ title, description, icon: Icono }) => (
            <li key={title}>
              <Icono size={26} />
              <div>
                <strong>{title}</strong>
                <small>{description}</small>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Anuncio;
