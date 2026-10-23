import React from 'react';

// Tarjetas grises con brillo que se muestran mientras cargan los productos
export const TarjetaEsqueleto = () => (
  <div className="tarjeta tarjeta-esqueleto" aria-hidden="true">
    <div className="esqueleto esqueleto-foto" />
    <div className="esqueleto esqueleto-linea" />
    <div className="esqueleto esqueleto-linea corta" />
  </div>
);

export const RejillaEsqueleto = ({ cantidad = 4 }) => (
  <div className="rejilla" role="status" aria-label="Cargando productos">
    {Array.from({ length: cantidad }, (_, i) => <TarjetaEsqueleto key={i} />)}
  </div>
);
