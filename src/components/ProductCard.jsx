import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingBag } from 'react-icons/fa';
import { formatoPrecio } from '../config';
import OrderForm from './OrderForm';
import Revelar from './Revelar';

export const Precio = ({ product }) => {
  const enOferta = product.oldPrice > product.price;
  return (
    <div className={`precio ${enOferta ? 'en-oferta' : ''}`}>
      <span className="precio-actual">{formatoPrecio(product.price)}</span>
      {enOferta && <span className="precio-antes">{formatoPrecio(product.oldPrice)}</span>}
    </div>
  );
};

export const descuento = (product) =>
  product.oldPrice > product.price ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

// Foto con brillo animado mientras carga
const FotoCargando = ({ src, alt, className = '' }) => {
  const [cargada, setCargada] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) setCargada(true);
  }, [src]);

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`${className} ${cargada ? 'cargada' : ''}`}
      onLoad={() => setCargada(true)}
      onError={() => setCargada(true)}
    />
  );
};

const ProductCard = ({ product, indice = 0 }) => {
  const ahorro = descuento(product);
  const enlace = `/producto/${product.id}`;
  const [pedir, setPedir] = useState(false);
  const [formularioListo, setFormularioListo] = useState(false);

  const abrirPedido = () => {
    setFormularioListo(true);
    setPedir(true);
  };

  return (
    <Revelar as="article" className="tarjeta" retraso={(indice % 4) * 70}>
      <div className="tarjeta-foto">
        <Link to={enlace} tabIndex={-1} aria-hidden="true" className="tarjeta-foto-enlace">
          <FotoCargando src={product.images[0]} alt="" />
          {product.images[1] && <FotoCargando src={product.images[1]} alt="" className="foto-hover" />}
        </Link>
        {ahorro > 0 && <span className="etiqueta-oferta">-{ahorro}%</span>}
        <button type="button" className="tarjeta-pedir" onClick={abrirPedido} aria-label={`Pedir ${product.name}`}>
          <FaShoppingBag size={14} />
          <span className="tarjeta-pedir-largo">Pedir ahora</span>
          <span className="tarjeta-pedir-corto">Pedir</span>
        </button>
      </div>
      {/* El enlace del nombre cubre todo el bloque de texto (ver .tarjeta-nombre a::after) */}
      <div className="tarjeta-texto">
        <h3 className="tarjeta-nombre">
          <Link to={enlace}>{product.name}</Link>
        </h3>
        <Precio product={product} />
        <div className="tarjeta-pago">Paga al recibir · Envío gratis</div>
      </div>

      {formularioListo && <OrderForm product={product} show={pedir} onHide={() => setPedir(false)} />}
    </Revelar>
  );
};

export default ProductCard;
