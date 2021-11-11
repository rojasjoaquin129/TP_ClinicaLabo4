import { Component, OnInit ,TemplateRef} from '@angular/core';
import { Especialidad } from 'src/app/classes/especialidades';
import { Especialistas } from 'src/app/classes/especialistas';
import { Pacientes } from 'src/app/classes/pasientes';
import { Turno } from 'src/app/classes/turnos';
import { TurnosService } from 'src/app/service/turnos.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { formatConfirmShift, formatConfirmTurno } from 'src/app/fechas/fechasTurnos';
import { format } from 'date-fns';
import{trigger,style,transition,animate, state} from'@angular/animations'
@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss'],
  animations:[
    trigger('soso',[
      state('void',style({

        opacity:0
      })),
      transition(':enter',[
        animate(1000,style({

          opacity:1
        }))
      ])
    ])
  ]
})
export class MisTurnosComponent implements OnInit {
  usuario:any;
  tipo:any;
  busqueda:any;
  elSupremoTurno:Turno|null=null;
  esEspecialsita:boolean=false;
  especialidadSeleccionada:any;
  especialistaSeleccionado:Pacientes | Especialistas | null = null;;
  pacienteSeleccionado: Pacientes | Especialistas | null = null;
  turnos:Turno[]|null=null;
  public  modalRef:BsModalRef|null=null;
  constructor(
    private turnosService:TurnosService,
    private modalService:BsModalService) { }

  ngOnInit(): void {
    this.usuario=JSON.parse(localStorage.getItem('usuario') as string) ;
    this.tipo=localStorage.getItem('tipo');
    this.obtenerTurnos(this.tipo);
    if(this.tipo==='especialista'){
      this.esEspecialsita=true;
    }else{
      this.esEspecialsita=false;
    }
  }
  abrirModal(template:TemplateRef<any>){
    this.modalRef=this.modalService.show(template);
  }

  SeleccionoTurno(turno:Turno |null , template:TemplateRef<any>){
    console.log(turno);
    if(turno?.estado==='finalizado'){
      this.modalRef=this.modalService.show(template);
      this.elSupremoTurno=turno;
    }

  }
  cambiarEstilo(tiempo:any){
   return Date.parse(tiempo);
  }

  async obtenerTurnos(tipo:string){
    let resultado;
    if(tipo!=='admin'){
      resultado =await this.turnosService.traerTurnosPorEmail({
        email:this.usuario?.mail,
        role:tipo
      });
    }else{
      resultado=this.turnosService.traerTodoTurno()
    }
    resultado.subscribe((Turnitos:Turno[])=>{
      this.turnos=Turnitos;
    });
  }

  filtarLista(){

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
