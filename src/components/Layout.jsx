import React, { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaHandPointer, FaClipboardList, FaMoneyBillWave } from 'react-icons/fa';
import Catalog from './Catalog';
import Categorias from './Categorias';
import PreguntasFrecuentes from './PreguntasFrecuentes';
import Footer from './Footer';
import FullCatalog from './pages/FullCatalog';
import ProductDetail from './pages/ProductDetail';
import Politicas from './pages/Politicas';
import Anuncio from './Anuncio';
import Banner from './Banner';
import NavBar from './NavBar';
import BottomNav from './BottomNav';
import WhatsAppButton from './WhatsAppButton';
import Revelar from './Revelar';

const pasos = [
  { icono: FaHandPointer, titulo: 'Elige tu producto', texto: 'Mira las fotos, el precio final y los detalles. El envío ya está incluido.' },
  { icono: FaClipboardList, titulo: 'Pide sin pagar', texto: 'Llena tus datos de entrega en un minuto. Te escribimos por WhatsApp para confirmar.' },
  { icono: FaMoneyBillWave, titulo: 'Paga al recibir', texto: 'Recibes en tu casa en 2 a 7 días hábiles y pagas en efectivo al repartidor.' },
];

function Inicio() {
  return (
    <>
      <Banner />
      <Anuncio />
      <Categorias />
      <Catalog />

      <section className="seccion como-comprar" id="como-funciona">
        <div className="envoltura">
          <Revelar className="seccion-titulo">
            <h2>Así de fácil es comprar</h2>
          </Revelar>
          <ol className="pasos">
            {pasos.map(({ icono: Icono, titulo, texto }, index) => (
              <Revelar as="li" key={titulo} retraso={index * 90}>
                <span className="paso-icono"><Icono size={20} /></span>
                <h3>{titulo}</h3>
                <p>{texto}</p>
              </Revelar>
            ))}
          </ol>
        </div>
      </section>

      <section className="seccion banda-oferta">
        <Revelar className="envoltura">
          <h2>Descuentos en productos seleccionados</h2>
          <p>Pídelos hoy sin pagar nada por adelantado y paga cuando te lleguen a la casa.</p>
          <Link to="/catalogo?orden=mayor-descuento" className="boton boton-sol">Ver ofertas</Link>
        </Revelar>
      </section>

      <section className="seccion">
        <Revelar className="envoltura preguntas">
          <h2>Preguntas frecuentes</h2>
          <PreguntasFrecuentes />
        </Revelar>
      </section>
    </>
  );
}

function Layout() {
  const location = useLocation();
  const isProduct = location.pathname.startsWith('/producto/');

  // Al cambiar de página, volver arriba
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className={isProduct ? 'sitio' : 'sitio con-nav-inferior'}>
      <NavBar />
      <main>
        {/* La clave hace que cada página entre con una transición suave */}
        <div key={location.pathname} className="transicion-pagina">
          <Routes location={location}>
            <Route path="/" element={<Inicio />} />
            <Route path="/catalogo" element={<FullCatalog />} />
            <Route path="/producto/:productId" element={<ProductDetail />} />
            <Route path="/politicas/:tipo" element={<Politicas />} />
            <Route path="*" element={<FullCatalog />} />
          </Routes>
        </div>
      </main>
      <Footer />
      {!isProduct && <BottomNav />}
      <WhatsAppButton elevado={isProduct} />
    </div>
  );
}

export default Layout;
