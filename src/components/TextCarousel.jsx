import React from 'react';

// Barra de anuncios: una cinta que se desplaza sin parar arriba de la página.
// Los mensajes van dos veces para que la vuelta sea continua; la segunda copia
// se oculta a los lectores de pantalla. Se detiene si se pide menos movimiento.
const TextCarousel = ({ promotions }) => {
  const grupo = (copia) => (
    <ul className="cinta-grupo" aria-hidden={copia ? 'true' : undefined}>
      {promotions.map((texto) => (
        <li key={texto}>{texto}</li>
      ))}
    </ul>
  );

  return (
    <div className="barra-anuncio">
      <div className="cinta">
        {grupo(false)}
        {grupo(true)}
      </div>
    </div>
  );
};

export default TextCarousel;
