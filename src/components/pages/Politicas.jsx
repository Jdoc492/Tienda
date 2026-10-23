import React from 'react';
import { useParams, Link } from 'react-router-dom';
import config from '../../config';

const telefono = `+57 ${config.whatsapp.slice(2).replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')}`;
const correoDatos = config.correoContacto || config.correoPedidos;

// Identificación del responsable o vendedor, tomada de src/config.js.
// Si esos datos aún no están llenos, no se muestra nada.
const identificacion = (rol = 'Responsable') => {
  if (!config.responsable) return null;
  const documento = config.documento ? `, identificado con ${config.documento}` : '';
  const domicilio = config.ciudad ? `, con domicilio en ${config.ciudad}` : '';
  return `${rol}: ${config.responsable}, persona natural (emprendimiento ${config.nombreTienda})${documento}${domicilio}. Correo: ${correoDatos}. WhatsApp: ${telefono}.`;
};

// Textos de las políticas de la tienda. Revísalos y ajústalos a tu operación.
const politicas = {
  envios: {
    titulo: 'Política de envío',
    parrafos: [
      `Enviamos a toda Colombia sin costo de envío. El tiempo de entrega promedio es de ${config.tiempoEntrega}, según la ciudad de destino.`,
      'Antes de despachar te contactamos por WhatsApp para confirmar tu pedido y tu dirección. Si no logramos confirmarlo, el pedido no se envía.',
      'Una vez despachado te compartimos el número de guía para que puedas seguir tu pedido con la transportadora.',
      'El día de la entrega el repartidor te llamará o escribirá. Si no puedes recibir, se programa un nuevo intento.',
    ],
  },
  garantia: {
    titulo: 'Cambios y garantía',
    parrafos: [
      'Todos nuestros productos tienen garantía por defectos de fábrica.',
      'Si tu producto llega con defectos o no corresponde a lo que pediste, escríbenos por WhatsApp dentro de los 5 días siguientes a la entrega con fotos o video del producto, y te ayudamos a gestionar el cambio.',
      'El producto debe estar completo, con sus accesorios y empaque original. La garantía no cubre daños por mal uso.',
      'Conforme al Estatuto del Consumidor (Ley 1480 de 2011), si compraste a distancia puedes ejercer el derecho de retracto dentro de los 5 días hábiles siguientes a la entrega.',
    ],
  },
  privacidad: {
    titulo: 'Política de tratamiento de datos personales',
    secciones: [
      {
        subtitulo: 'Responsable del tratamiento',
        parrafos: [identificacion(), `${config.nombreTienda} es responsable de los datos personales que nos entregas al hacer un pedido. Contacto: WhatsApp ${telefono} y correo ${correoDatos}.`],
      },
      {
        subtitulo: 'Qué datos recogemos y para qué',
        parrafos: [
          'Al hacer un pedido nos das tu nombre y apellido, celular, departamento, ciudad, dirección, barrio y, si quieres, notas para la entrega. No pedimos datos de tarjetas, cuentas bancarias ni datos sensibles.',
          'Usamos estos datos solo para confirmar tu pedido, despacharlo, coordinar la entrega, hacerle seguimiento, atender cambios y garantías y responder tus preguntas. No los usamos para publicidad ni los vendemos.',
        ],
      },
      {
        subtitulo: 'Con quién compartimos tus datos',
        parrafos: [
          'Solo compartimos lo necesario para entregarte el pedido:',
          '• La transportadora que lleva el pedido (nombre, dirección y celular).',
          '• Dropi, la plataforma de logística con la que gestionamos el despacho.',
          '• WhatsApp (Meta Platforms), por donde confirmamos el pedido y te atendemos.',
          '• FormSubmit, el servicio de correo que nos avisa de cada pedido nuevo.',
          '• Google (Google Sheets y Google Workspace), donde guardamos el registro de los pedidos para hacerles seguimiento.',
          'FormSubmit y Google pueden procesar y guardar los datos en servidores fuera de Colombia.',
        ],
      },
      {
        subtitulo: 'Tus derechos',
        parrafos: [
          'Como titular de tus datos, según la Ley 1581 de 2012, puedes en cualquier momento y sin costo:',
          '• Conocer, actualizar y rectificar tus datos.',
          '• Pedir prueba de la autorización que nos diste.',
          '• Saber qué uso le hemos dado a tus datos.',
          '• Revocar la autorización y pedir que suprimamos tus datos, cuando no exista un deber legal o contractual de conservarlos.',
          '• Presentar quejas ante la Superintendencia de Industria y Comercio (SIC).',
        ],
      },
      {
        subtitulo: 'Cómo ejercer tus derechos',
        parrafos: [
          `Escríbenos por WhatsApp al ${telefono} o al correo ${correoDatos}, con tu nombre, tu número de celular o de pedido y lo que necesitas.`,
          'Respondemos las consultas en máximo 10 días hábiles y los reclamos en máximo 15 días hábiles. Si necesitamos más tiempo te avisamos antes del vencimiento, dentro de los plazos de la ley.',
        ],
      },
      {
        subtitulo: 'Autorización y conservación',
        parrafos: [
          'Nos das tu autorización al marcar la casilla del formulario de pedido; guardamos la fecha y hora como constancia.',
          'Conservamos tus datos solo el tiempo necesario para gestionar tu pedido y la garantía, y para cumplir obligaciones legales. Después los eliminamos.',
        ],
      },
      {
        subtitulo: 'Vigencia',
        parrafos: ['Esta política rige desde el 23 de octubre de 2026. Si la cambiamos, publicaremos la nueva versión en esta página.'],
      },
    ],
  },
  terminos: {
    titulo: 'Términos de servicio',
    parrafos: [
      identificacion('Vendedor'),
      `Al hacer un pedido en ${config.nombreTienda} aceptas pagar el valor total en efectivo al momento de recibir el producto.`,
      'Los precios incluyen el envío y pueden cambiar sin previo aviso. El precio válido es el que aparece al momento de hacer tu pedido.',
      'Las imágenes son de referencia; hacemos lo posible para que correspondan exactamente al producto que recibes.',
      'Nos reservamos el derecho de no despachar pedidos con datos incompletos o que no puedan ser confirmados.',
    ],
  },
};

const Politicas = () => {
  const { tipo } = useParams();
  const politica = politicas[tipo] || politicas.terminos;

  return (
    <div className="envoltura texto-politica">
      <h1>{politica.titulo}</h1>
      {(politica.parrafos || []).filter(Boolean).map((parrafo, index) => (
        <p key={index}>{parrafo}</p>
      ))}
      {(politica.secciones || []).map((seccion) => (
        <section key={seccion.subtitulo}>
          <h2>{seccion.subtitulo}</h2>
          {seccion.parrafos.filter(Boolean).map((parrafo, index) => (
            <p key={index}>{parrafo}</p>
          ))}
        </section>
      ))}
      <Link to="/catalogo" className="boton boton-sol">Ver productos</Link>
    </div>
  );
};

export default Politicas;
