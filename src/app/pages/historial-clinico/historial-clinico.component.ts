import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Especialidad } from 'src/app/classes/especialidades';
import { Especialistas } from 'src/app/classes/especialistas';
import { Pacientes } from 'src/app/classes/pasientes';
import { Turno } from 'src/app/classes/turnos';
@Component({
  selector: 'app-historial-clinico',
  templateUrl: './historial-clinico.component.html',
  styleUrls: ['./historial-clinico.component.scss']
})
export class HistorialClinicoComponent implements OnInit {
  usuario:any;
  tipo:any;
  activarModal=false;
  esEspecialsita:boolean=false;
  especialidadSeleccionada:any;
  especialistaSeleccionado:Pacientes | Especialistas | null = null;;
  pacienteSeleccionado: Pacientes | Especialistas | null = null;
  turnos:Turno[]|null=null;
  elSupremoTurno:Turno|null=null;
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
    console.log(turnos);
    const turnetes:Turno[]=[];
    timer(10).subscribe(()=>{
      if(turnos){
        for(let turno of turnos){
          if(turno.estado==='finalizado'){
            turnetes.push(turno);
          }
        }
        this.turnos=turnetes;
      }
    })


  }
  SeleccionoTurno(turno:Turno |null){
    console.log(turno);
    this.activarModal=true;
    if(turno){

      this.elSupremoTurno=turno;
    }

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
