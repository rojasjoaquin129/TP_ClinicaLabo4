import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(value: string | undefined , ...args: unknown[]) {
    let dato:any;
    if(value){
     dato= new Date(value);
    }
    return dato;
  }

}
