import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { slug } from '../../data/products';
import { useProductos } from '../../data/ProductsContext';
import { RejillaEsqueleto } from '../Esqueleto';
import ProductCard, { descuento } from '../ProductCard';

const ordenes = [
  { id: 'destacados', label: 'Destacados' },
  { id: 'menor-precio', label: 'Menor precio' },
  { id: 'mayor-descuento', label: 'Mayor descuento' },
];

// Quita tildes y mayúsculas para que "camara" encuentre "Cámara"
const normalizar = (texto) => texto.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

const FullCatalog = () => {
  // Los filtros viven en el enlace (#/catalogo?categoria=hogar) para poder compartirlos
  const [params, setParams] = useSearchParams();
  const { productos: activeProducts, categorias, cargando } = useProductos();
  const categoria = params.get('categoria') || '';
  const busqueda = params.get('q') || '';
  const orden = params.get('orden') || 'destacados';

  const cambiar = (campo, valor) => {
    const nuevos = new URLSearchParams(params);
    if (valor) nuevos.set(campo, valor);
    else nuevos.delete(campo);
    setParams(nuevos, { replace: true });
  };

  const resultados = useMemo(() => {
    const texto = normalizar(busqueda.trim());
    const lista = activeProducts.filter(
      (product) =>
        (!categoria || slug(product.category || '') === categoria) &&
        (!texto || normalizar(product.name).includes(texto)),
    );
    if (orden === 'menor-precio') return [...lista].sort((a, b) => a.price - b.price);
    if (orden === 'mayor-descuento') return [...lista].sort((a, b) => descuento(b) - descuento(a));
    return lista;
  }, [activeProducts, categoria, busqueda, orden]);

  const nombreCategoria = categorias.find((c) => c.id === categoria)?.nombre;
  const hayFiltros = Boolean(categoria || busqueda);

  return (
    <>
      <div className="envoltura pagina-titulo">
        <h1>{nombreCategoria || 'Catálogo'}</h1>
        <p>Envío gratis y pago contra entrega en todos los productos</p>
      </div>

      <div className="envoltura filtros">
        <div className="filtros-fila">
          <label className="buscador">
            <FaSearch aria-hidden="true" />
            <span className="visually-hidden">Buscar producto</span>
            <input
              type="search"
              placeholder="Buscar producto"
              value={busqueda}
              onChange={(e) => cambiar('q', e.target.value)}
              enterKeyHint="search"
            />
            {busqueda && (
              <button type="button" onClick={() => cambiar('q', '')} aria-label="Borrar búsqueda">
                <FaTimes />
              </button>
            )}
          </label>
          <label className="ordenar">
            <span>Ordenar</span>
            <select value={orden} onChange={(e) => cambiar('orden', e.target.value === 'destacados' ? '' : e.target.value)}>
              {ordenes.map((o) => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="chips" role="group" aria-label="Filtrar por categoría">
          <button type="button" className={`chip ${!categoria ? 'activo' : ''}`} aria-pressed={!categoria} onClick={() => cambiar('categoria', '')}>
            Todos
          </button>
          {categorias.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`chip ${categoria === c.id ? 'activo' : ''}`}
              aria-pressed={categoria === c.id}
              onClick={() => cambiar('categoria', categoria === c.id ? '' : c.id)}
            >
              {c.nombre}
            </button>
          ))}
        </div>

        <p className="resultados-conteo" aria-live="polite">
          {cargando
            ? 'Cargando productos…'
            : resultados.length === activeProducts.length
            ? `${resultados.length} productos`
            : `${resultados.length} de ${activeProducts.length} productos`}
        </p>
      </div>

      <section className="seccion seccion-catalogo">
        <div className="envoltura">
          {cargando ? (
            <RejillaEsqueleto cantidad={8} />
          ) : resultados.length > 0 ? (
            <div className="rejilla" key={`${categoria}-${orden}`}>
              {resultados.map((product, index) => (
                <ProductCard key={product.id} product={product} indice={index} />
              ))}
            </div>
          ) : (
            <div className="vacio">
              <FaSearch size={28} />
              <h2>No encontramos productos</h2>
              <p>
                {busqueda ? `No hay resultados para "${busqueda}"` : 'No hay productos en esta categoría todavía'}
                {nombreCategoria && busqueda ? ` en ${nombreCategoria}.` : '.'} Prueba con otra palabra o mira todo el catálogo.
              </p>
              {hayFiltros && (
                <button type="button" className="boton boton-oscuro" onClick={() => setParams({}, { replace: true })}>
                  Ver todos los productos
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default FullCatalog;
