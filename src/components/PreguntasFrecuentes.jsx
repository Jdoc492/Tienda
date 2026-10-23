import Accordion from 'react-bootstrap/Accordion';

function PreguntasFrecuentes() {
  return (
    <Accordion defaultActiveKey="00">
      <Accordion.Item eventKey="00">
        <Accordion.Header><b>¿Cómo hago un pedido?</b></Accordion.Header>
        <Accordion.Body>
        Escoge tu producto, toca "Pedir ahora" y llena tus datos de entrega. Te escribiremos por WhatsApp para confirmar tu pedido y lo despachamos. Pagas cuando lo recibes.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="0">
        <Accordion.Header><b>¿Qué métodos de pago aceptan?</b></Accordion.Header>
        <Accordion.Body>
        Solo aceptamos pago en efectivo al momento de recibir tu pedido.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header><b>¿Puedo pagar con tarjeta de crédito o débito?</b></Accordion.Header>
        <Accordion.Body>
        Lamentablemente por el momento no contamos con esos métodos de pago, pero pronto tendremos más actualizaciones para ti.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header><b>¿Hay algún costo adicional por el servicio de contra entrega?</b></Accordion.Header>
        <Accordion.Body>
        No existe ningún costo adicional, el envío es completamente gratis.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header><b>¿Qué debo hacer si no estoy en casa cuando se entrega el producto?</b></Accordion.Header>
        <Accordion.Body>
        No se preocupe, el día en que se realizará la entrega, recibirá una llamada o mensaje por parte del repartidor que llevará a cabo la entrega. Si no puede recibir ese día, se realizará otro intento.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5">
        <Accordion.Header><b>¿Todos los productos vienen con garantía?</b></Accordion.Header>
        <Accordion.Body>
        Sí, todos nuestros productos tienen garantía de satisfacción por defectos de fábrica.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="6">
        <Accordion.Header><b>Si no estoy satisfecho con mi compra, ¿puedo devolverla?</b></Accordion.Header>
        <Accordion.Body>
        Sí, escríbenos por WhatsApp dentro de los 5 días siguientes a la entrega y te ayudamos a gestionar el cambio o la garantía.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="7">
        <Accordion.Header><b>¿Cuánto tiempo tarda generalmente la entrega?</b></Accordion.Header>
        <Accordion.Body>
        El tiempo de entrega promedio es de 2 a 7 días útiles, dependiendo de la ciudad de la que nos haces tu pedido.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="8">
        <Accordion.Header><b>¿Puedo rastrear mi pedido en tiempo real?</b></Accordion.Header>
        <Accordion.Body>
        Sí, cuando despachamos tu pedido te enviamos por WhatsApp el número de guía para que lo sigas con la transportadora.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="9">
        <Accordion.Header><b>¿Qué pasa si mi pedido llega fuera del plazo estipulado?</b></Accordion.Header>
        <Accordion.Body>
        Escríbenos por WhatsApp con tu número de pedido y revisamos con la transportadora qué pasó para darte una solución.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default PreguntasFrecuentes;