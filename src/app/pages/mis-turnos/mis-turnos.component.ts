import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/classes/especialidades';
import { Especialistas } from 'src/app/classes/especialistas';
import { Pacientes } from 'src/app/classes/pasientes';
import { Turno } from 'src/app/classes/turnos';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent implements OnInit {
  usuario:any;
  tipo:any;
  esEspecialsita:boolean=false;
  especialidadSeleccionada:any;
  especialistaSeleccionado:Pacientes | Especialistas | null = null;;
  pacienteSeleccionado: Pacientes | Especialistas | null = null;
  turnos:Turno[]|null=null;
  constructor() { }

  ngOnInit(): void {
    this.usuario=JSON.parse(localStorage.getItem('usuario') as string) ;
    this.tipo=localStorage.getItem('tipo');
    if(this.tipo==='especialista'){
      this.esEspecialsita=true;
    }else{
      this.esEspecialsita=false;
    }
  }
  turnosDelUsuario(turnos:Turno[]|null){
    this.turnos=turnos;

  }
  selecEspecialidad(especialidad:Especialidad |null){
    this.especialidadSeleccionada=especialidad;

  }

  setSeleccionEspecialista(Especialsita:Especialistas|Pacientes|null){
    this.especialistaSeleccionado=Especialsita;

  }

  setSeleccionPaciente(paciente:Especialistas|Pacientes|null){
    this.pacienteSeleccionado=paciente;
  }
}
