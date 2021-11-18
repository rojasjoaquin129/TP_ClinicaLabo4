import { Component, Input, OnInit, Output ,EventEmitter} from '@angular/core';
import { Especialistas } from 'src/app/classes/especialistas';
import { Pacientes } from 'src/app/classes/pasientes';
import { Turno } from 'src/app/classes/turnos';

@Component({
  selector: 'app-cards-lista',
  templateUrl: './cards-lista.component.html',
  styleUrls: ['./cards-lista.component.scss']
})
export class CardsListaComponent implements OnInit {
  @Input() ListaUsuarios:any=null;
  @Input() listaTurno:Turno[]|null=null;
  @Output() TurnosFiltrados:EventEmitter<Turno[] |null>;
  turnosPorEspecialista:Turno[]|null=null;
  listaDos:Turno[]|null=null;
  constructor() {
    this.TurnosFiltrados=new EventEmitter<Turno[]|null>();
    if(this.listaTurno!==null){
      this.turnosPorEspecialista=this.listaTurno;
      this.filtrarLista(this.listaTurno)
    }
  }

  llevarPaciente(turno:Turno){
    const turnosPorPaciente:Turno[]=[];
    if(this.listaTurno){
      this.listaTurno.forEach((turnoPaciente:Turno) => {
        if(turno.paciente?.dni===turnoPaciente.paciente?.dni){
          turnosPorPaciente.push(turnoPaciente);
        }
      });
      this.TurnosFiltrados.emit(turnosPorPaciente);
    }
    console.log(turnosPorPaciente);

  }
  ngOnInit(): void {
    if(this.listaTurno!==null){
      this.turnosPorEspecialista=this.listaTurno;
      this.filtrarLista(this.listaTurno)
    }
  }

  comprobarlista(lista:Pacientes[] , paciente:Pacientes){
    lista.forEach((paci:Pacientes)=>{
        if(paci.dni===paciente.dni ){

        }
    })
  }
  filtrarLista(lista:Turno[]|null){

    let listaTurnoPacientes:Turno[]=[];
    lista?.forEach((turno:Turno)=>{
      let flag=false;
      if(listaTurnoPacientes.length===0){
        listaTurnoPacientes.push(turno);
      }
      listaTurnoPacientes.forEach((TurnoPaciente:Turno)=>{
        if(TurnoPaciente.paciente?.dni===turno.paciente?.dni){
          flag=true;
        }
      })
      if(!flag){
        listaTurnoPacientes.push(turno);
      }


    });
    this.listaDos=listaTurnoPacientes;
  }
}
