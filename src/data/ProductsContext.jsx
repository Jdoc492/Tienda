import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import config from '../config';
import productosLocales, { armarCategorias } from './products';
import { productosDesdeCSV } from '../utils/hojaProductos';

// Carga los productos de la tienda.
// - Si hay una hoja de Google Sheets en config.hojaProductos, los descarga de ahí.
// - Guarda la última lista buena en el navegador para que la próxima visita cargue al instante.
// - Si no hay hoja, falla o viene vacía, usa la lista de src/data/products.js.
const CLAVE_GUARDADO = 'todoshop-productos';
const hoja = (config.hojaProductos || '').trim();

const leerGuardados = () => {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_GUARDADO));
    if (guardado?.fuente === hoja && Array.isArray(guardado.productos) && guardado.productos.length > 0) {
      return guardado.productos;
    }
  } catch {
    // Sin acceso al almacenamiento: se carga normal desde la hoja
  }
  return null;
};

const guardar = (productos) => {
  try {
    localStorage.setItem(CLAVE_GUARDADO, JSON.stringify({ fuente: hoja, productos }));
  } catch {
    // Si no se puede guardar, la próxima visita simplemente vuelve a descargar
  }
};

const ProductsContext = createContext(null);

export const ProductsProvider = ({ children }) => {
  const [estado, setEstado] = useState(() => {
    if (!hoja) return { lista: productosLocales, cargando: false };
    const guardados = leerGuardados();
    return guardados ? { lista: guardados, cargando: false } : { lista: [], cargando: true };
  });

  useEffect(() => {
    if (!hoja) return undefined;
    let cancelado = false;
    const separador = hoja.includes('?') ? '&' : '?';

    fetch(`${hoja}${separador}nocache=${Date.now()}`, { cache: 'no-store' })
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error(`La hoja respondió ${respuesta.status}`);
        return respuesta.text();
      })
      .then((texto) => {
        const lista = productosDesdeCSV(texto);
        if (lista.filter((product) => product.active).length === 0) throw new Error('La hoja no tiene productos activos');
        if (cancelado) return;
        guardar(lista);
        setEstado({ lista, cargando: false });
      })
      .catch((error) => {
        console.error('No se pudieron cargar los productos de la hoja:', error);
        if (cancelado) return;
        // Si ya teníamos una lista guardada se mantiene; si no, la de respaldo
        setEstado((actual) => (actual.lista.length > 0 ? { ...actual, cargando: false } : { lista: productosLocales, cargando: false }));
      });

    return () => {
      cancelado = true;
    };
  }, []);

  const valor = useMemo(() => {
    const productos = estado.lista.filter((product) => product.active);
    return {
      productos,
      categorias: armarCategorias(productos),
      cargando: estado.cargando,
      buscarProducto: (id) => productos.find((product) => product.id === id),
    };
  }, [estado]);

  return <ProductsContext.Provider value={valor}>{children}</ProductsContext.Provider>;
};

export const useProductos = () => useContext(ProductsContext);
