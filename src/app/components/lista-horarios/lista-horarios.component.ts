import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Turno } from 'src/app/classes/turnos';
import { groupShiftsByDates ,formatShift, profesorDates} from 'src/app/fechas/fechasTurnos';

@Component({
  selector: 'app-lista-horarios',
  templateUrl: './lista-horarios.component.html',
  styleUrls: ['./lista-horarios.component.scss']
})
export class ListaHorariosComponent implements OnInit ,OnChanges{
  @Input() turnos:Turno[] |null =null;
  @Input() titulo:string='horarios';
  @Input() tipo:string ='todos';
  @Output() seleccionarHorarioTurno:EventEmitter<Turno|null>;
  subida=false;
  public busqueda:string;
  public listaCopiada:any[]|null= null;
  public turnoSeleccionado:Turno|null =null;


  constructor() {
    this.busqueda='';
    this.seleccionarHorarioTurno=new EventEmitter<Turno|null>();
   }

  ngOnInit(): void {

  }
  ngOnChanges(changes:SimpleChanges){
    if(changes.turnos.currentValue){
      this.listaCopiada=profesorDates(changes.turnos.currentValue);

    }
  }
  dato(){
    if(this.subida){
      this.subida=false;
    }else{
      this.subida=true;
    }
  }

  originalOrder = (a: KeyValue<any, any>, b: KeyValue<any, any>): any => {
    return 0;
  };

  async selectShift(turnoSelec: Turno) {
    this.turnoSeleccionado = turnoSelec;
    this.seleccionarHorarioTurno.emit(this.turnoSeleccionado);
  }
   formatoTurno(turno: Turno | any): string {
    return formatShift(turno);
  }
}
