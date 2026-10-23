import { slug } from '../data/products';

// Lee un texto CSV y devuelve una lista de filas (cada fila, una lista de celdas).
// Soporta comillas, comas y saltos de línea dentro de una celda ("" es una comilla).
export const leerCSV = (texto) => {
  const filas = [];
  let fila = [];
  let celda = '';
  let entreComillas = false;
  const contenido = texto.replace(/^﻿/, '');

  for (let i = 0; i < contenido.length; i += 1) {
    const letra = contenido[i];
    if (entreComillas) {
      if (letra === '"' && contenido[i + 1] === '"') {
        celda += '"';
        i += 1;
      } else if (letra === '"') {
        entreComillas = false;
      } else {
        celda += letra;
      }
    } else if (letra === '"') {
      entreComillas = true;
    } else if (letra === ',') {
      fila.push(celda);
      celda = '';
    } else if (letra === '\n' || letra === '\r') {
      if (letra === '\r' && contenido[i + 1] === '\n') i += 1;
      fila.push(celda);
      filas.push(fila);
      fila = [];
      celda = '';
    } else {
      celda += letra;
    }
  }
  if (celda !== '' || fila.length > 0) {
    fila.push(celda);
    filas.push(fila);
  }
  return filas.filter((f) => f.some((valor) => valor.trim() !== ''));
};

// "89.900", "$ 89.900", "89900" o "$89,900.00" -> 89900
export const leerPrecio = (valor) => {
  let texto = String(valor || '').trim();
  if (/[.,]\d{1,2}$/.test(texto)) texto = texto.replace(/[.,]\d{1,2}$/, ''); // centavos
  const numero = Number(texto.replace(/\D/g, ''));
  return numero > 0 ? numero : 0;
};

const leerActivo = (valor) => {
  const texto = slug(valor || '');
  return !['no', 'false', '0', 'inactivo', 'oculto'].includes(texto);
};

// Las fotos pueden ser enlaces completos o rutas dentro de public/
const leerFoto = (valor) => {
  const texto = String(valor || '').trim();
  if (!texto) return '';
  if (/^(https?:)?\/\//i.test(texto) || texto.startsWith('data:')) return texto;
  return texto.replace(/^\.?\/+/, '').replace(/^public\//, '');
};

// Encabezados como "Precio antes" o "Descripción" -> "precio_antes", "descripcion"
const nombreColumna = (texto) => slug(texto).replace(/-/g, '_');

// Convierte el CSV de la hoja en la misma forma que usan los productos de products.js
export const productosDesdeCSV = (texto) => {
  const [encabezado, ...filas] = leerCSV(texto);
  if (!encabezado) return [];
  const columnas = encabezado.map(nombreColumna);
  const usados = new Set();

  return filas
    .map((fila) => {
      const dato = (columna) => {
        const indice = columnas.indexOf(columna);
        return indice === -1 ? '' : (fila[indice] || '').trim();
      };

      const name = dato('nombre');
      const price = leerPrecio(dato('precio'));
      if (!name || !price) return null;

      let id = slug(dato('id') || name) || 'producto';
      const base = id;
      for (let n = 2; usados.has(id); n += 1) id = `${base}-${n}`;
      usados.add(id);

      const oldPrice = leerPrecio(dato('precio_antes'));
      const images = ['foto1', 'foto2', 'foto3', 'foto4'].map((c) => leerFoto(dato(c))).filter(Boolean);
      const description = dato('descripcion')
        .split(/\r?\n|\s\|\s/)
        .map((linea) => linea.trim())
        .filter(Boolean)
        .join('\n');

      return {
        id,
        name,
        price,
        ...(oldPrice > price ? { oldPrice } : {}),
        category: dato('categoria'),
        description,
        images: images.length > 0 ? images : ['productos/ejemplo.svg'],
        active: leerActivo(dato('activo')),
      };
    })
    .filter(Boolean);
};
