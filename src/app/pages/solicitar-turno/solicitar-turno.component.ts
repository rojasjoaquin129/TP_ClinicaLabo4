import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Especialidad } from 'src/app/classes/especialidades';
import { Especialistas } from 'src/app/classes/especialistas';
import { Pacientes } from 'src/app/classes/pasientes';
import { Turno } from 'src/app/classes/turnos';
import { TurnosService } from 'src/app/service/turnos.service';
import { addDays } from 'date-fns';
import { formatConfirmShift } from 'src/app/fechas/fechasTurnos';
import Swal from 'sweetalert2';
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
  pacienteSeleccionado:Especialistas|null|Pacientes=null;
  public turnoFrom:FormGroup;
  EspecialistaSeleccionado:Especialistas|null|Pacientes=null;
  public turnos:Turno[]|null =null;
  public turnosSinFiltrar:Turno[]|null =null;
  public turnoSeleccionado:Turno|null=null;

  constructor(private turnoService:TurnosService, private fb:FormBuilder) {
    this.turnoFrom=this.fb.group({
      especialidad:new FormControl(null,[Validators.required]),
      especialista:new FormControl(null,[Validators.required]),
      paciente:new FormControl(null,[Validators.required]),
      turno:new FormControl(null,[Validators.required]),
    });
   }

  ngOnInit(): void {
    //this.turnoService.CargaTurnosAuto();
    this.usuario=JSON.parse(localStorage.getItem('usuario') as string) ;
  this.tipo=localStorage.getItem('tipo');
  if(this.tipo==='paciente' ){
    this.SeleccionarPaciente(this.usuario);
    this.turnoFrom.patchValue({
      paciente:this.pacienteSeleccionado?.nombre
    });
  }


  }

  setSeleccionarTurno(turno:Turno|null){
    if(this.turnoSeleccionado){
      this.turnoSeleccionado=null;
    }
    this.turnoSeleccionado=turno;
    this.turnoFrom.patchValue({turno:this.turnoSeleccionado?.dia});

  }


  async selecEspecialidad(especialidad:Especialidad |null){
    this.especialidad=especialidad;
    this.turnos=[];
    this.turnosSinFiltrar=[];
    this.turnoFrom.patchValue({
      especialidad:this.especialidad
    });
    if(this.seleccionoEspecialidad){
      this.seleccionoEspecialidad=false;;
    }else{
      this.seleccionoEspecialidad=true;
    }

    if(this.seleccionoEspecialidad && this.EspecialistaSeleccionado && this.pacienteSeleccionado){
      this.turnoFrom.patchValue({
        especialista:this.EspecialistaSeleccionado.nombre
      });
      const resutlado = await this.turnoService.traerTurnosPorEmail({
        email:this.EspecialistaSeleccionado.mail,
        role:'especialista'
      });

      const turnosa:Turno[]=[];
      resutlado.subscribe((turnos:Turno[])=>{
        this.turnosSinFiltrar=turnos;
        const dia=new Date();
        const dateEn15Dias=addDays(dia,15).getTime();
        const hoy=dia.getTime()
        this.turnosSinFiltrar?.forEach((turno:Turno)=>{
        const tiempo=new Date(turno.dia).getTime();
          if(turno.estado==='disponible' && tiempo < dateEn15Dias && tiempo>=hoy){
            if(turno.especialidad===this.especialidad){
              turnosa.push(turno);
            }
          }
        });

        turnosa.sort((a:Turno,b:Turno)=>{
          const dateA= new Date(a.dia).getTime();
          const dateB= new Date(b.dia).getTime();
          return dateA-dateB;
        });
        this.turnos=turnosa;
        console.log(this.turnos);
      });




    }else{
      this.turnoFrom.patchValue({especialista:null});
      this.turnoSeleccionado=null;
      this.turnoFrom.patchValue({turno:null})
    }
  }



   SelecEspecialista(Especialsita:Especialistas|Pacientes|null){

    this.EspecialistaSeleccionado=Especialsita;
  }




  SeleccionarPaciente(paciente:Especialistas |Pacientes |null){

    this.pacienteSeleccionado=paciente;
    this.turnoFrom.patchValue({
      paciente:this.pacienteSeleccionado?.nombre
    })
  }

  seleccionarTurno(turno:Turno |null){
    this.turnoSeleccionado=turno;
    this.turnoFrom.patchValue({turno:this.turnoSeleccionado?.dia});
  }

  formatoConfirmacionTurno(turno:Turno){
    return formatConfirmShift(turno);
  }

  confirmarTurno(){
    const cargarTurno:Turno={
      ...this.turnoSeleccionado!,
      estado:'pendiente',
      paciente:this.pacienteSeleccionado,
    };
    this.turnoService.subirTurno(cargarTurno);
    this.mensaje('Estado del turno','El turno fue solicitado con éxito!');
  }

  mensaje( titulo:string, texto:string )  {
    Swal.fire({
      icon: 'success',
      title:titulo,
      text:texto });
  };

  mensajeError(text:string){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: text,
    })
  }
}
