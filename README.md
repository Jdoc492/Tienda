# TodoShop BQ

Tienda en línea con pago contra entrega. Los pedidos llegan por WhatsApp y por correo, sin costo.

## Cómo funciona un pedido

1. El cliente entra a un producto y toca **Pagar en Casa**.
2. Llena el formulario (nombre, celular, ciudad, dirección).
3. Te llega un correo con el pedido (servicio gratuito FormSubmit) y al cliente se le abre WhatsApp con el pedido listo para enviártelo.
4. Confirmas con el cliente por WhatsApp y creas el pedido en Dropi.

> La primera vez que alguien haga un pedido, FormSubmit te enviará un correo para **activar** el formulario. Ábrelo y confirma; desde ahí te llegan todos los pedidos.

## Cambiar datos de la tienda

Edita `src/config.js`: número de WhatsApp, correo, redes sociales y tiempo de entrega.

## Administrar productos desde Google Sheets (recomendado)

Puedes manejar todos los productos desde una hoja de cálculo, gratis y sin usuario ni contraseña. Los cambios aparecen en la tienda al recargar la página (Google tarda hasta 5 minutos en actualizar la hoja publicada).

1. **Crea la hoja:** entra a [sheets.google.com](https://sheets.google.com) y crea una hoja en blanco.
2. **Importa la plantilla:** Archivo > Importar > Subir > elige `plantilla-productos.csv` (está en esta carpeta) > "Reemplazar hoja actual" > Importar datos. Ya tienes los 12 productos de ejemplo para editar.
3. **Publica como CSV:** Archivo > Compartir > Publicar en la web. Elige la hoja, cambia "Página web" por **"Valores separados por comas (.csv)"** y toca Publicar. Copia el enlace.
4. **Pega el enlace** en `src/config.js`, en `hojaProductos: '...'`, y vuelve a publicar la tienda (`npm run build`).

Columnas de la hoja (no cambies los nombres de la primera fila):

| Columna | Qué poner |
|---|---|
| id | Palabra única sin espacios para el enlace del producto. Si la dejas vacía se crea con el nombre. |
| nombre | Nombre del producto (obligatorio). |
| precio | Precio de venta: `89900`, `89.900` o `$89.900` (obligatorio). |
| precio_antes | Precio anterior para mostrar el descuento (opcional). |
| categoria | Tecnología, Hogar, Belleza, Bienestar, Herramientas o una nueva: aparece sola en los filtros. |
| descripcion | Cada renglón (Alt+Enter en la celda) o cada ` \| ` es un punto aparte. |
| foto1 a foto4 | Enlaces de las fotos. Mínimo la foto1. |
| activo | `sí` o `no`. Vacío cuenta como sí. Pon `no` para ocultar un producto sin borrarlo. |

Las filas sin nombre o sin precio se ignoran. Si la hoja falla o está vacía, la tienda muestra los productos de `src/data/products.js`.

**Fotos:** usa enlaces directos de imagen. Los de **Dropi** sirven (clic derecho en la foto > "Copiar dirección de imagen"). Los enlaces de **Google Drive no funcionan directo**. Otra opción es subir la foto a la carpeta `public/productos/` y escribir la ruta, por ejemplo `productos/reloj-1.jpg`.

## Agregar o cambiar productos sin la hoja

Si no usas Google Sheets, edita `src/data/products.js`. Cada producto tiene nombre, precio, categoría, descripción y fotos.
Pon las fotos en `public/productos/` y escribe la ruta, por ejemplo `productos/reloj-1.jpg`.

## Probar en tu computador

```
npm install
npm run dev
```

## Publicar

```
npm run build
```

Sube el contenido de la carpeta `dist` a GitHub Pages, Netlify o cualquier hosting gratuito.
