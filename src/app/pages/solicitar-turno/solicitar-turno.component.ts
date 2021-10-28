import { Component, OnInit} from '@angular/core';
import { Especialidad } from 'src/app/classes/especialidades';
import { Especialistas } from 'src/app/classes/especialistas';
import { Pacientes } from 'src/app/classes/pasientes';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {
  public usuario: any ;
  public tipo:any;
  especialidad:any;
  seleccionoEspecialidad=false;
  constructor() { }

  ngOnInit(): void {
    this.usuario=JSON.parse(localStorage.getItem('usuario') as string) ;
  this.tipo=localStorage.getItem('tipo');

  }



  selecEspecialidad(especialidad:Especialidad){
    this.especialidad=especialidad;
    console.log(especialidad);
    this.seleccionoEspecialidad=true;
  }
  SelecEspecialista(Especialsita:Especialistas|Pacientes|null){
    console.log(Especialsita);
  }

  SeleccionarPaciente(paciente:Especialistas |Pacientes |null){
    console.log(paciente);
  }
}
