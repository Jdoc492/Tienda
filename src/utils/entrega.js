// Calcula la fecha estimada de entrega contando solo días hábiles (lunes a viernes).
const dias = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

export const sumarDiasHabiles = (desde, cantidad) => {
  const fecha = new Date(desde);
  let sumados = 0;
  while (sumados < cantidad) {
    fecha.setDate(fecha.getDate() + 1);
    const dia = fecha.getDay();
    if (dia !== 0 && dia !== 6) sumados += 1;
  }
  return fecha;
};

// "entre el lun 26 y el vie 30 de oct" o "entre el lun 26 de oct y el lun 2 de nov"
export const rangoEntrega = (minimo = 2, maximo = 7, hoy = new Date()) => {
  const inicio = sumarDiasHabiles(hoy, minimo);
  const fin = sumarDiasHabiles(hoy, maximo);
  const corto = (fecha) => `${dias[fecha.getDay()]} ${fecha.getDate()}`;
  const mes = (fecha) => meses[fecha.getMonth()];

  if (inicio.getMonth() === fin.getMonth()) {
    return `entre el ${corto(inicio)} y el ${corto(fin)} de ${mes(fin)}`;
  }
  return `entre el ${corto(inicio)} de ${mes(inicio)} y el ${corto(fin)} de ${mes(fin)}`;
};
