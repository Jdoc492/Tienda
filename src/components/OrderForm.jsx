import React, { useEffect, useRef, useState } from 'react';
import { Modal, Form, Spinner } from 'react-bootstrap';
import { FaTruck, FaWhatsapp, FaLock, FaMoneyBillWave } from 'react-icons/fa';
import config, { formatoPrecio, enlaceWhatsApp } from '../config';

const formularioVacio = { nombre: '', celular: '', departamento: '', ciudad: '', direccion: '', barrio: '', cantidad: 1, notas: '' };

// Reglas de cada campo: devuelven el mensaje de error o '' si está bien
const reglas = {
  nombre: (v) => {
    if (!v.trim()) return 'Escribe tu nombre y apellido.';
    if (!/\S+\s+\S+/.test(v.trim())) return 'Escribe también tu apellido para la guía de envío.';
    return '';
  },
  celular: (v) => {
    if (!v) return 'Escribe tu número de celular.';
    if (!/^3\d{9}$/.test(v)) return 'Debe tener 10 dígitos y empezar por 3 (ej. 3001234567).';
    return '';
  },
  departamento: (v) => (v.trim() ? '' : 'Escribe tu departamento.'),
  ciudad: (v) => (v.trim() ? '' : 'Escribe tu ciudad o municipio.'),
  direccion: (v) => {
    if (!v.trim()) return 'Escribe la dirección donde recibes.';
    if (v.trim().length < 6) return 'Escribe la dirección completa: calle, número y apto o casa.';
    return '';
  },
  barrio: (v) => (v.trim() ? '' : 'Escribe tu barrio.'),
};

const validar = (datos) =>
  Object.fromEntries(Object.entries(reglas).map(([campo, regla]) => [campo, regla(datos[campo])]));

const ESPERA_WHATSAPP = 1800;

// Formulario de pedido contra entrega.
// Al enviarlo: avisa por correo (FormSubmit) y abre WhatsApp con el pedido completo.
const OrderForm = ({ product, show, onHide, cantidadInicial = 1 }) => {
  const [datos, setDatos] = useState(formularioVacio);
  const [tocados, setTocados] = useState({});
  const [intento, setIntento] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [pedido, setPedido] = useState(null);
  const [autoriza, setAutoriza] = useState(false);
  const formRef = useRef(null);
  const temporizador = useRef(null);

  // Al abrir, usar la cantidad que la persona eligió en la página del producto
  useEffect(() => {
    if (show) setDatos((actuales) => ({ ...actuales, cantidad: cantidadInicial }));
  }, [show, cantidadInicial]);

  useEffect(() => () => clearTimeout(temporizador.current), []);

  const errores = {
    ...validar(datos),
    // Ley 1581 de 2012: el pedido solo se envía con la autorización expresa del cliente
    autorizacion: autoriza ? '' : 'Debes autorizar el tratamiento de tus datos para poder enviar el pedido.',
  };
  const mostrarError = (campo) => (tocados[campo] || intento) && errores[campo];

  const cambiar = (campo) => (e) => {
    const valor = campo === 'celular' ? e.target.value.replace(/\D/g, '').slice(0, 10) : e.target.value;
    setDatos({ ...datos, [campo]: valor });
  };
  const salir = (campo) => () => setTocados({ ...tocados, [campo]: true });

  const total = product.price * Number(datos.cantidad || 1);

  const cerrar = () => {
    clearTimeout(temporizador.current);
    setPedido(null);
    setIntento(false);
    setTocados({});
    onHide();
  };

  const mensajePedido = (numero) => [
    `¡Hola! Quiero confirmar mi pedido #${numero} de ${config.nombreTienda}`,
    '',
    `Producto: ${product.name}`,
    `Cantidad: ${datos.cantidad}`,
    `Total a pagar al recibir: ${formatoPrecio(total)}`,
    '',
    `Nombre: ${datos.nombre}`,
    `Celular: ${datos.celular}`,
    `Departamento: ${datos.departamento}`,
    `Ciudad: ${datos.ciudad}`,
    `Dirección: ${datos.direccion}`,
    `Barrio: ${datos.barrio}`,
    datos.notas ? `Notas: ${datos.notas}` : '',
  ].filter((linea, i, lista) => linea !== '' || lista[i - 1] !== '').join('\n');

  const enviarPedido = async (e) => {
    e.preventDefault();
    setIntento(true);
    const primerError = Object.keys(errores).find((campo) => errores[campo]);
    if (primerError) {
      formRef.current?.elements[primerError]?.focus();
      return;
    }

    setEnviando(true);
    const numero = Date.now().toString().slice(-6);

    // Aviso por correo. Si falla, el pedido igual sale por WhatsApp.
    try {
      await fetch(`https://formsubmit.co/ajax/${config.correoPedidos}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Pedido nuevo #${numero} - ${product.name}`,
          _template: 'table',
          pedido: numero,
          producto: product.name,
          cantidad: datos.cantidad,
          total: formatoPrecio(total),
          ...datos,
          // Prueba de la autorización de tratamiento de datos
          autorizacion_datos: 'Sí',
          fecha_autorizacion: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }),
        }),
      });
    } catch (error) {
      console.error('No se pudo enviar el aviso por correo:', error);
    }

    const enlace = enlaceWhatsApp(mensajePedido(numero));
    setEnviando(false);
    setPedido({ numero, enlace });
    setDatos(formularioVacio);
    setAutoriza(false);
    setTocados({});
    setIntento(false);
    // Primero se muestra la confirmación y luego se abre WhatsApp con el pedido
    temporizador.current = setTimeout(() => {
      window.location.href = enlace;
    }, ESPERA_WHATSAPP);
  };

  const campo = (nombre, etiqueta, props = {}, clase = '') => (
    <Form.Group className={`campo ${clase}`} controlId={`pedido-${nombre}`}>
      <Form.Label>{etiqueta}</Form.Label>
      <Form.Control
        name={nombre}
        value={datos[nombre]}
        onChange={cambiar(nombre)}
        onBlur={salir(nombre)}
        isInvalid={Boolean(mostrarError(nombre))}
        aria-describedby={mostrarError(nombre) ? `error-${nombre}` : undefined}
        {...props}
      />
      <Form.Control.Feedback type="invalid" id={`error-${nombre}`}>{mostrarError(nombre)}</Form.Control.Feedback>
    </Form.Group>
  );

  return (
    <Modal show={show} onHide={cerrar} centered fullscreen="sm-down" className="modal-pedido" scrollable>
      <Modal.Header closeButton>
        <Modal.Title>{pedido ? 'Pedido recibido' : 'Pide ahora y paga al recibir'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {pedido ? (
          <div className="pedido-exito" role="status">
            <svg className="check-animado" viewBox="0 0 52 52" aria-hidden="true">
              <circle cx="26" cy="26" r="24" fill="none" />
              <path fill="none" d="M15 27l7 7 15-15" />
            </svg>
            <h3>¡Listo! Tu pedido #{pedido.numero} quedó registrado</h3>
            <p>Te llevamos a WhatsApp para enviarnos el pedido. Te respondemos para confirmarlo antes de despacharlo.</p>
            <div className="barra-progreso" style={{ '--espera': `${ESPERA_WHATSAPP}ms` }}><span /></div>
            <p className="pedido-nota">Si WhatsApp no se abre solo, toca el botón:</p>
            <a className="boton boton-whatsapp-lleno boton-ancho" href={pedido.enlace}>
              <FaWhatsapp size={20} /> Abrir WhatsApp
            </a>
          </div>
        ) : (
          <Form id="form-pedido" onSubmit={enviarPedido} noValidate ref={formRef}>
            <div className="pedido-resumen">
              <img src={product.images[0]} alt="" />
              <div className="pedido-resumen-texto">
                <strong>{product.name}</strong>
                <span>{formatoPrecio(product.price)} c/u</span>
              </div>
              <Form.Group controlId="pedido-cantidad" className="pedido-cantidad">
                <Form.Label className="visually-hidden">Cantidad</Form.Label>
                <Form.Select name="cantidad" value={datos.cantidad} onChange={cambiar('cantidad')} aria-label="Cantidad">
                  {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} und.</option>)}
                </Form.Select>
              </Form.Group>
            </div>

            <fieldset className="pedido-bloque">
              <legend><span>1</span> Tus datos</legend>
              {campo('nombre', 'Nombre y apellido', { autoComplete: 'name', placeholder: 'Ej. María Pérez' })}
              {campo('celular', 'Celular (WhatsApp)', { type: 'tel', inputMode: 'numeric', autoComplete: 'tel-national', placeholder: '3001234567' })}
            </fieldset>

            <fieldset className="pedido-bloque">
              <legend><span>2</span> ¿Dónde lo recibes?</legend>
              <div className="campos-dobles">
                {campo('departamento', 'Departamento', { autoComplete: 'address-level1', placeholder: 'Ej. Atlántico' })}
                {campo('ciudad', 'Ciudad', { autoComplete: 'address-level2', placeholder: 'Ej. Barranquilla' })}
              </div>
              {campo('direccion', 'Dirección completa', { autoComplete: 'street-address', placeholder: 'Calle 00 # 00-00, apto o casa' })}
              {campo('barrio', 'Barrio', { placeholder: 'Ej. El Prado' })}
              <Form.Group className="campo" controlId="pedido-notas">
                <Form.Label>Notas para la entrega <span className="opcional">(opcional)</span></Form.Label>
                <Form.Control as="textarea" rows={2} name="notas" value={datos.notas} onChange={cambiar('notas')} placeholder="Ej. Portería, casa esquinera, horario" />
              </Form.Group>
            </fieldset>

            <Form.Group className="campo autorizacion" controlId="pedido-autorizacion">
              <Form.Check
                type="checkbox"
                name="autorizacion"
                checked={autoriza}
                onChange={(e) => setAutoriza(e.target.checked)}
                isInvalid={Boolean(mostrarError('autorizacion'))}
                aria-describedby={mostrarError('autorizacion') ? 'error-autorizacion' : undefined}
                label={
                  <>
                    Autorizo el tratamiento de mis datos personales para gestionar mi pedido, según la{' '}
                    <a href="#/politicas/privacidad" target="_blank" rel="noopener noreferrer">Política de privacidad</a>.
                  </>
                }
              />
              {mostrarError('autorizacion') && (
                <div className="invalid-feedback d-block" id="error-autorizacion">{mostrarError('autorizacion')}</div>
              )}
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      {!pedido && (
        <Modal.Footer className="pedido-pie">
          <div className="pedido-total">
            <div>
              <span>Total a pagar al recibir</span>
              <small><FaTruck /> Envío gratis incluido</small>
            </div>
            <strong>{formatoPrecio(total)}</strong>
          </div>

          {intento && Object.values(errores).some(Boolean) && (
            <p className="pedido-aviso" role="alert">Revisa los campos marcados en rojo.</p>
          )}

          <button type="submit" form="form-pedido" className="boton boton-sol boton-ancho boton-grande" disabled={enviando}>
            {enviando ? <><Spinner size="sm" /> Enviando…</> : <><FaMoneyBillWave /> Confirmar pedido</>}
          </button>
          <p className="pedido-nota"><FaLock /> No pedimos datos de tarjeta ni pagos por adelantado.</p>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default OrderForm;
