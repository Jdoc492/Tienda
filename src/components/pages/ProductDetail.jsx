import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { FaTruck, FaMoneyBillWave, FaShieldAlt, FaWhatsapp, FaLock, FaMinus, FaPlus, FaCalendarCheck } from 'react-icons/fa';
import { useProductos } from '../../data/ProductsContext';
import config, { enlaceWhatsApp, formatoPrecio } from '../../config';
import { rangoEntrega } from '../../utils/entrega';
import Catalog from '../Catalog';
import OrderForm from '../OrderForm';
import { Precio, descuento } from '../ProductCard';

const CANTIDAD_MAXIMA = 5;

const ProductDetail = () => {
  const { productId } = useParams(); // Obtener el productId de los parámetros de la URL
  const { buscarProducto, cargando } = useProductos();
  const product = buscarProducto(productId);
  const hayProducto = Boolean(product);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Estado para la imagen actual
  const [showOrder, setShowOrder] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [zoom, setZoom] = useState(null);
  const carrilRef = useRef(null);
  const botonRef = useRef(null);

  useEffect(() => {
    setCurrentImageIndex(0);
    setCantidad(1);
    carrilRef.current?.scrollTo({ left: 0 });
  }, [productId]);

  // En celular, mostrar la barra de compra fija cuando el botón principal sale de la pantalla
  useEffect(() => {
    if (!botonRef.current) return undefined;
    const observer = new IntersectionObserver(([entry]) => setShowBar(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    observer.observe(botonRef.current);
    return () => observer.disconnect();
  }, [productId, hayProducto]);

  // Mientras llegan los productos de la hoja, mostrar la página en gris
  if (!product && cargando) {
    return (
      <div className="envoltura" role="status" aria-label="Cargando producto">
        <div className="producto producto-esqueleto">
          <div className="esqueleto galeria-principal" />
          <div>
            <div className="esqueleto esqueleto-linea corta" />
            <div className="esqueleto esqueleto-titulo" />
            <div className="esqueleto esqueleto-linea corta" />
            <div className="esqueleto esqueleto-bloque" />
            <div className="esqueleto esqueleto-boton" />
            <div className="esqueleto esqueleto-boton" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="envoltura texto-politica">
        <h1>No encontramos este producto</h1>
        <Link to="/catalogo" className="boton boton-sol">Ver el catálogo</Link>
      </div>
    );
  }

  // Al deslizar las fotos, actualizar la miniatura activa
  const handleScroll = (e) => {
    const index = Math.round(e.target.scrollLeft / e.target.clientWidth);
    if (index !== currentImageIndex) setCurrentImageIndex(index);
  };

  // Manejar la selección de miniaturas
  const handleThumbnailClick = (index) => {
    const carril = carrilRef.current;
    carril?.scrollTo({ left: carril.clientWidth * index, behavior: 'smooth' });
  };

  // Zoom de la foto siguiendo el mouse (solo en computador, ver CSS)
  const moverZoom = (e) => {
    if (e.pointerType !== 'mouse') return;
    const caja = e.currentTarget.getBoundingClientRect();
    setZoom({
      x: `${((e.clientX - caja.left) / caja.width) * 100}%`,
      y: `${((e.clientY - caja.top) / caja.height) * 100}%`,
    });
  };

  // Función para formatear la descripción
  const formatDescription = (description) => {
    return description.split('\n').map((item, index) => (
      <p key={index}>{item}</p>
    ));
  };

  const ahorro = descuento(product);
  const pedir = () => setShowOrder(true);
  const entrega = rangoEntrega(2, 7);

  return (
    <>
      <div className="envoltura">
        <nav className="migas" aria-label="Estás en">
          <Link to="/">Inicio</Link> / <Link to="/catalogo">Catálogo</Link> / <span>{product.name}</span>
        </nav>

        <div className="producto">
          <div className="producto-galeria">
            <div
              className={`galeria-principal ${zoom ? 'con-zoom' : ''}`}
              onPointerMove={moverZoom}
              onPointerLeave={() => setZoom(null)}
              style={zoom ? { '--zoom-x': zoom.x, '--zoom-y': zoom.y } : undefined}
            >
              {ahorro > 0 && <span className="etiqueta-oferta">-{ahorro}%</span>}
              <div className="galeria-carril" ref={carrilRef} onScroll={handleScroll}>
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className={currentImageIndex === index ? 'actual' : ''}
                  />
                ))}
              </div>
            </div>
            {product.images.length > 1 && (
              <>
                <div className="galeria-miniaturas">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={currentImageIndex === index ? 'activa' : ''}
                      onClick={() => handleThumbnailClick(index)}
                      aria-label={`Ver foto ${index + 1}`}
                    >
                      <img src={image} alt="" />
                    </button>
                  ))}
                </div>
                <div className="galeria-puntos">
                  {product.images.map((image, index) => (
                    <span key={index} className={currentImageIndex === index ? 'activa' : ''} />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="producto-info">
            <div className="producto-marca">{product.category || config.nombreTienda}</div>
            <h1>{product.name}</h1>
            <div className="precio">
              <Precio product={product} />
              {ahorro > 0 && <span className="ahorro">Ahorras {formatoPrecio(product.oldPrice - product.price)}</span>}
            </div>
            <p className="producto-nota">Envío incluido. Pagas en efectivo al recibir.</p>

            <div className="entrega-estimada">
              <FaCalendarCheck size={20} />
              <span>
                <strong>Recíbelo {entrega}</strong>
                <small>Envío gratis · {config.tiempoEntrega} según tu ciudad</small>
              </span>
            </div>

            <div className="cantidad-fila">
              <span id="cantidad-etiqueta">Cantidad</span>
              <div className="cantidad" role="group" aria-labelledby="cantidad-etiqueta">
                <button type="button" onClick={() => setCantidad((c) => Math.max(1, c - 1))} disabled={cantidad <= 1} aria-label="Quitar uno">
                  <FaMinus size={12} />
                </button>
                <output aria-live="polite">{cantidad}</output>
                <button type="button" onClick={() => setCantidad((c) => Math.min(CANTIDAD_MAXIMA, c + 1))} disabled={cantidad >= CANTIDAD_MAXIMA} aria-label="Agregar uno">
                  <FaPlus size={12} />
                </button>
              </div>
              {cantidad > 1 && <span className="cantidad-total">Total {formatoPrecio(product.price * cantidad)}</span>}
            </div>

            <div className="producto-botones" ref={botonRef}>
              <button className="boton boton-sol boton-ancho boton-grande" onClick={pedir}>
                <FaTruck /> Pedir ahora, pago contra entrega
              </button>
              <a className="boton boton-whatsapp boton-ancho" href={enlaceWhatsApp(`Hola, tengo una pregunta sobre ${product.name}`)} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp size={20} /> Preguntar por WhatsApp
              </a>
            </div>

            <div className="compra-segura">
              <h2><FaLock size={14} /> Compra segura</h2>
              <ul>
                <li>
                  <FaMoneyBillWave size={20} />
                  <span><strong>Pagas al recibir</strong> No pagas nada por adelantado</span>
                </li>
                <li>
                  <FaTruck size={20} />
                  <span><strong>Envío gratis</strong> A toda Colombia</span>
                </li>
                <li>
                  <FaShieldAlt size={20} />
                  <span><strong>Garantía</strong> Por defectos de fábrica</span>
                </li>
              </ul>
            </div>

            <div className="detalle-pestanas">
              <Accordion defaultActiveKey="descripcion">
                <Accordion.Item eventKey="descripcion">
                  <Accordion.Header>Descripción</Accordion.Header>
                  <Accordion.Body>{formatDescription(product.description)}</Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="envio">
                  <Accordion.Header>Envío y pago</Accordion.Header>
                  <Accordion.Body>
                    <p>Te escribimos por WhatsApp para confirmar tu pedido y lo despachamos. Llega en {config.tiempoEntrega} según tu ciudad y pagas en efectivo al repartidor.</p>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="garantia">
                  <Accordion.Header>Cambios y garantía</Accordion.Header>
                  <Accordion.Body>
                    <p>Si llega con defectos de fábrica, escríbenos dentro de los 5 días siguientes a la entrega y te ayudamos con el cambio. <Link to="/politicas/garantia">Ver política completa</Link>.</p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      <Catalog excludeId={product.id} title="También te puede gustar" />

      <div className={`barra-compra ${showBar ? 'visible' : ''}`}>
        <Precio product={product} />
        <button className="boton boton-sol" onClick={pedir}>Pedir ahora</button>
      </div>

      <OrderForm product={product} show={showOrder} onHide={() => setShowOrder(false)} cantidadInicial={cantidad} />
    </>
  );
};

export default ProductDetail;
