// Datos generales de la tienda. Cambia aquí el número, el correo o el nombre
// y se actualizan en toda la página.
const config = {
  nombreTienda: 'TodoShop BQ',
  // Número de WhatsApp con indicativo de Colombia (57), sin espacios ni signos
  whatsapp: '573176392440',
  // Correo donde llegan los avisos de pedidos nuevos (FormSubmit, gratis)
  correoPedidos: 'jdocservicesmd@gmail.com',
  // Enlaces de redes sociales. Déjalos vacíos para ocultarlos.
  facebook: '',
  instagram: '',
  tiempoEntrega: '2 a 7 días hábiles',
  // Datos del responsable de la tienda (Ley 1581 de 2012 y Ley 1480 de 2011).
  // Se muestran en la política de datos y en los términos cuando están llenos.
  responsable: 'Jose Ochoa', // Nombre completo o razón social
  documento: '',        // Cédula o NIT, por ejemplo 'C.C. 1.234.567' o 'NIT 900.000.000-1'
  ciudad: 'Barranquilla, Atlántico', // Ciudad del domicilio, por ejemplo 'Barranquilla, Atlántico'
  correoContacto: 'joseochoacz@gmail.com', // Correo para consultas y reclamos sobre datos personales
  // Enlace CSV de tu hoja de Google Sheets con los productos.
  // En la hoja: Archivo > Compartir > Publicar en la web > elige "Valores separados
  // por comas (.csv)" > Publicar, y pega aquí el enlace que te da.
  // Si lo dejas vacío, se usan los productos de src/data/products.js.
  hojaProductos: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRXTADsWlODETv-l9VJKmGlVkALl_QoJWxU5LEMlkZGklnv1rOKLiHaKcmV6EFxGhzm7s2q_KHChrlU/pub?output=csv',
};

export const formatoPrecio = (valor) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(valor);

export const enlaceWhatsApp = (mensaje) =>
  `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(mensaje)}`;

export default config;
