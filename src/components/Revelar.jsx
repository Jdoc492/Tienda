import React, { useEffect, useRef, useState } from 'react';

// Hace aparecer suavemente su contenido cuando entra en pantalla.
// Si el navegador no anima (o la persona pidió menos movimiento), el contenido
// se ve completo desde el inicio: el estado oculto solo existe con html.anima.
export const useRevelar = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento || !('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    observer.observe(elemento);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

const Revelar = ({ as: Etiqueta = 'div', className = '', retraso = 0, style, children, ...resto }) => {
  const [ref, visible] = useRevelar();
  return (
    <Etiqueta
      ref={ref}
      className={`revelar ${visible ? 'visible' : ''} ${className}`}
      style={{ '--retraso': `${retraso}ms`, ...style }}
      {...resto}
    >
      {children}
    </Etiqueta>
  );
};

export default Revelar;
