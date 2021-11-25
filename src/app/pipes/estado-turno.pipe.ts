import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoTurno'
})
export class EstadoTurnoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    let text='';
    switch (value) {
      case 'disponible':
        text='Disponible';
      break;
      case 'pendiente':
        text='Pendiente';
        break;
      case 'aceptado':
        text='Aceptado'
        break;
      case 'rechazado':
        text='Rechazado'
        break;
      case 'cancelado':
        text='Cancelado'
        break;
      case 'finalizado':
        text='Completado'
        break;
    }
    return text;
  }

}
