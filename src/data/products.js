// Catálogo de la tienda.
// Si configuras una hoja de Google Sheets (hojaProductos en src/config.js),
// los productos salen de la hoja y esta lista solo se usa como respaldo.
// OJO: estos son PRODUCTOS DE DEMOSTRACIÓN para ver cómo se ve la tienda.
// Cámbialos por tus productos reales de Dropi antes de publicar.
//
// Para agregar un producto copia uno de los bloques y cambia los datos.
// - id: palabra única sin espacios (se usa en el enlace del producto)
// - price: precio de venta en pesos, sin puntos
// - oldPrice: precio "antes" para mostrar descuento (opcional)
// - images: pon las fotos en la carpeta public/productos y escribe la ruta,
//   o pega el enlace de la foto de Dropi
// - category: la categoría del producto (Tecnología, Hogar, Belleza, Bienestar,
//   Herramientas o una nueva)
// - active: false para ocultarlo sin borrarlo
const foto = (id) => [`productos/demo/${id}-1.jpg`, `productos/demo/${id}-2.jpg`];

const products = [
  {
    id: 'reloj-inteligente',
    category: 'Tecnología',
    name: 'Reloj inteligente deportivo',
    price: 119900,
    oldPrice: 189900,
    description: 'Mide pasos, ritmo cardíaco, sueño y calorías.\nRecibe notificaciones de WhatsApp y llamadas en tu muñeca.\nBatería de hasta 7 días y resistente a salpicaduras.\nIncluye cargador magnético.',
    images: foto('reloj-inteligente'),
    active: true,
  },
  {
    id: 'audifonos-inalambricos',
    category: 'Tecnología',
    name: 'Audífonos inalámbricos con estuche de carga',
    price: 69900,
    oldPrice: 119900,
    description: 'Conexión Bluetooth 5.3 estable y sin cables.\nHasta 5 horas de música y 20 horas más con el estuche.\nControl táctil y micrófono para llamadas.\nCompatibles con Android y iPhone.',
    images: foto('audifonos-inalambricos'),
    active: true,
  },
  {
    id: 'freidora-de-aire',
    category: 'Hogar',
    name: 'Freidora de aire 5 litros',
    price: 239900,
    oldPrice: 329900,
    description: 'Cocina papas, pollo y carnes con hasta 85% menos aceite.\nCapacidad de 5 litros, ideal para 4 a 6 personas.\nPanel digital con 8 programas y temporizador.\nCanasta antiadherente fácil de lavar.',
    images: foto('freidora-de-aire'),
    active: true,
  },
  {
    id: 'lampara-luna',
    category: 'Hogar',
    name: 'Lámpara de luna 3D recargable',
    price: 59900,
    oldPrice: 89900,
    description: 'Luz cálida y blanca con 16 colores y control remoto.\nRecargable por USB, sin cables mientras la usas.\nIncluye base de madera.\nPerfecta para regalar o decorar la habitación.',
    images: foto('lampara-luna'),
    active: true,
  },
  {
    id: 'masajeador-cuello',
    category: 'Bienestar',
    name: 'Masajeador de cuello y hombros',
    price: 99900,
    oldPrice: 149900,
    description: 'Masaje tipo amasado con calor relajante.\nAlivia la tensión después del trabajo o el gimnasio.\n3 niveles de intensidad.\nFunciona en casa, en la oficina y en el carro.',
    images: foto('masajeador-cuello'),
    active: true,
  },
  {
    id: 'cepillo-alisador',
    category: 'Belleza',
    name: 'Cepillo alisador eléctrico',
    price: 79900,
    oldPrice: 129900,
    description: 'Alisa y da brillo en minutos mientras peinas.\nCerámica con iones que reduce el frizz.\nTemperatura regulable de 150 °C a 230 °C.\nSe calienta en 60 segundos.',
    images: foto('cepillo-alisador'),
    active: true,
  },
  {
    id: 'mini-proyector',
    category: 'Tecnología',
    name: 'Mini proyector HD portátil',
    price: 289900,
    oldPrice: 399900,
    description: 'Imagen de hasta 120 pulgadas en cualquier pared.\nConéctalo al celular, USB o HDMI.\nParlante incorporado.\nIdeal para películas y partidos en casa.',
    images: foto('mini-proyector'),
    active: true,
  },
  {
    id: 'humidificador-aromas',
    category: 'Hogar',
    name: 'Humidificador y difusor de aromas',
    price: 54900,
    description: 'Humedece el ambiente y perfuma con aceites esenciales.\nLuz LED de 7 colores.\nSilencioso, ideal para dormir.\nSe apaga solo cuando se acaba el agua.',
    images: foto('humidificador-aromas'),
    active: true,
  },
  {
    id: 'camara-seguridad',
    category: 'Tecnología',
    name: 'Cámara de seguridad WiFi 360°',
    price: 109900,
    oldPrice: 159900,
    description: 'Mira tu casa o negocio desde el celular en tiempo real.\nGira 360° y tiene visión nocturna.\nDetecta movimiento y te envía alertas.\nHabla y escucha desde la app.',
    images: foto('camara-seguridad'),
    active: true,
  },
  {
    id: 'botella-termica',
    category: 'Bienestar',
    name: 'Botella térmica con indicador de temperatura',
    price: 44900,
    oldPrice: 69900,
    description: 'Mantiene bebidas frías 24 horas y calientes 12 horas.\nTapa con pantalla LED que muestra la temperatura.\nAcero inoxidable, 500 ml.\nNo gotea en el bolso.',
    images: foto('botella-termica'),
    active: true,
  },
  {
    id: 'organizador-maquillaje',
    category: 'Belleza',
    name: 'Organizador de maquillaje giratorio',
    price: 64900,
    description: 'Gira 360° para encontrar todo rápido.\nCapacidad para bases, labiales, brochas y cremas.\nAltura ajustable en varios niveles.\nFácil de armar y limpiar.',
    images: foto('organizador-maquillaje'),
    active: true,
  },
  {
    id: 'kit-herramientas',
    category: 'Herramientas',
    name: 'Kit de herramientas 46 piezas',
    price: 89900,
    oldPrice: 139900,
    description: 'Llaves, copas, destornilladores y puntas en un solo maletín.\nAcero al cromo vanadio resistente.\nIdeal para la casa, la moto y el carro.\nMaletín organizado para no perder piezas.',
    images: foto('kit-herramientas'),
    active: true,
  },
];

// Convierte "Tecnología" en "tecnologia" para usarlo en el enlace
export const slug = (texto) =>
  String(texto).normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// Orden preferido de las categorías. Las que vengan de la hoja y no estén
// en esta lista se muestran después, en el orden en que aparecen.
const ordenCategorias = ['Tecnología', 'Hogar', 'Belleza', 'Bienestar', 'Herramientas'];

// Arma la lista de categorías a partir de los productos.
// La foto de cada categoría es la del primer producto que tenga.
export const armarCategorias = (lista) => {
  const nombres = [...new Set(lista.map((product) => product.category).filter(Boolean))];
  nombres.sort((a, b) => {
    const ia = ordenCategorias.indexOf(a);
    const ib = ordenCategorias.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
  return nombres.map((nombre) => {
    const productos = lista.filter((product) => product.category === nombre);
    return { id: slug(nombre), nombre, cantidad: productos.length, foto: productos[0]?.images[0] };
  });
};

export default products;
