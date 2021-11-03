import { Component, EventEmitter, Input, OnInit, Output, SimpleChange,OnChanges, SimpleChanges } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { Administradores } from 'src/app/classes/Administradores';
import { Especialidad } from 'src/app/classes/especialidades';
import { Especialistas } from 'src/app/classes/especialistas';
import { Pacientes } from 'src/app/classes/pasientes';
import { Turno } from 'src/app/classes/turnos';
import { AuthService } from 'src/app/service/auth.service';
import { TurnosService } from 'src/app/service/turnos.service';
import { ListaEspecialistasComponent } from '../lista-especialistas/lista-especialistas.component';

@Component({
  selector: 'app-filtro-doctor',
  templateUrl: './filtro-doctor.component.html',
  styleUrls: ['./filtro-doctor.component.scss']
})
export class FiltroDoctorComponent implements OnInit,OnChanges {
  @Input() tipo:string='';
  @Input() Especialidad:any=null;
  @Input() usuarioEntregado:any=null;
  @Output() usuarioSeleccionado:EventEmitter<Pacientes|Especialistas|null>;
  @Output() MisTurnos:EventEmitter<Turno[]|null>
  listaCopiada:Array<Pacientes|Especialistas> | null=null;
  listUsuarios:Array<Pacientes|Especialistas> | null=null;
  listaEspecialistas:any[]=[];
  listaPaciente:any[]=[];
  busqueda:any;
  usuario:any;
  existeEspecialistasPorEspecialidad:any;
  constructor( private authService :AuthService , private turnosService:TurnosService) {
    this.usuarioSeleccionado=new EventEmitter<Pacientes|Especialistas|null>();
    this.MisTurnos=new EventEmitter<Turno[]|null>();
    this.busqueda='';
   }

   ngOnChanges(changes:SimpleChanges){
     if(!this.usuarioEntregado){
      if(this.Especialidad){
        this.filtroUsuarioEspecialidad(changes.Especialidad.currentValue);
      }
     }else{
       if(this.Especialidad){
        this.obtenerUsuariosPorTurnoFiltro(this.tipo,changes.Especialidad.currentValue);
       }

     }

   }


  optenerFiltro(tipo:string){
    switch (tipo) {
      case 'pacientes':
          this.authService.traerTodoPacientes().subscribe(pacientes=>{
            this.listUsuarios=pacientes;
            this.listaCopiada=pacientes;
          });
        break;
      case'especialistas':
      this.authService.traerTodoEspecialista().subscribe(pacientes=>{
        this.listUsuarios=pacientes;
        this.listaCopiada=pacientes;
      });
      break;
    }
  }

  async obtenerUsuariosPorTurnoFiltro(tipo:string,especialidad:any){
    this.listaEspecialistas=[];
    this.listaPaciente=[];
    let resultado;
    if(tipo!=='admin'){
      resultado =await this.turnosService.traerTurnosPorEmail({
        email:this.usuarioEntregado?.mail,
        role:tipo
      });
    }else{
      resultado=this.turnosService.traerTodoTurno()
    }
    const misTurnos:Turno[]=[]
    switch (tipo) {
      case 'paciente':
        resultado.subscribe((turnos:Turno[])=>{
          turnos.forEach((turno:Turno)=>{
            if(especialidad.nombre===turno.especialidad){
              let flag:boolean=false;
              misTurnos.push(turno);
              if(this.listaEspecialistas.length!==0){
                this.listaEspecialistas.forEach((especi:any)=>{
                  if(especi.dni===turno.especialista?.dni){
                    flag=true;
                  }
                })
                if(!flag){
                  this.listaEspecialistas.push(turno.especialista);
                }
              }else{
                this.listaEspecialistas.push(turno.especialista);
              }
            }
          });
        });
        break;
      case 'especialista':
        resultado.subscribe((turnos:Turno[])=>{
          turnos.forEach((turno:Turno)=>{
            if(especialidad.toString()===turno.especialidad){
              misTurnos.push(turno);
              let flag:boolean=false;
              if(turno.paciente){
                if(this.listaPaciente.length!==0){
                  this.listaPaciente.forEach((pacien:any)=>{
                    if(pacien.dni===turno.paciente?.dni){
                      flag=true;
                    }
                  })
                  if(!flag){
                    this.listaPaciente.push(turno.paciente);
                  }
                }else{
                  this.listaPaciente.push(turno.paciente);
                }
              }

            }
          });
        });
        break;
      case 'admin':
        resultado.subscribe((turnos:Turno[])=>{
          console.log(turnos);
          turnos.forEach((turno:Turno)=>{
            if(especialidad.nombre===turno.especialidad){
              let flag:boolean=false;
              misTurnos.push(turno);
              if(this.listaEspecialistas.length!==0){
                this.listaEspecialistas.forEach((especi:any)=>{
                  if(especi.dni===turno.especialista?.dni){
                    flag=true;
                  }
                })
                if(!flag){
                  this.listaEspecialistas.push(turno.especialista);

                 }
              }else{
                this.listaEspecialistas.push(turno.especialista);
              }
            }
          })
        })
        break;

    }

    this.MisTurnos.emit(misTurnos);
    if(this.tipo==='paciente' || tipo==='admin'){
      this.listaCopiada=this.listaEspecialistas;
      this.listUsuarios=this.listaEspecialistas;
    }else{
      this.listaCopiada=this.listaPaciente;
      this.listUsuarios=this.listaPaciente;
    }
  }

  ngOnInit(): void {
    if(this.usuarioEntregado===null){
      if(this.Especialidad){
        this.filtroUsuarioEspecialidad(this.Especialidad);
        }else{
          this.optenerFiltro(this.tipo);
        }
    }else{
      if(this.Especialidad){
        this.obtenerUsuariosPorTurnoFiltro(this.tipo,this.Especialidad);
      }

    }


  }

  filtrarUsuario(){
    this.listaCopiada=this.listUsuarios;
    if(this.listaCopiada){
      const listaFiltrada=this.listaCopiada.filter(
        (usuario:Pacientes|Especialistas)=>{
          return(
            usuario.nombre
            .toLowerCase()
            .includes(this.busqueda.toLowerCase()) ||
            usuario.apellido
            .toLocaleLowerCase()
            .includes(this.busqueda.toLowerCase()) ||
            usuario.mail.toLowerCase().includes(this.busqueda.toLowerCase())
            );
        }
      );
      this.listaCopiada=listaFiltrada;
    }
  }

  SeleccionarUsuario(usuarioSeleccionado:Pacientes|Especialistas){
    if(this.usuario && usuarioSeleccionado.dni===this.usuario.dni){
      this.usuarioSeleccionado.emit(null);
      this.usuario = null;
    }else{
      this.usuarioSeleccionado.emit(usuarioSeleccionado);
      this.usuario=usuarioSeleccionado;
    }

  }

  async filtroUsuarioEspecialidad(especialidad:Especialidad):Promise<any> {
    const result =await this.authService.getEspecialistaPorEspecialidad(especialidad);

    result.subscribe((EspecialistaporEspecialidad)=>{

      if(EspecialistaporEspecialidad.length===0){
        this.existeEspecialistasPorEspecialidad=true;
        this.listUsuarios=[];
        this.listaCopiada=[];
      }else{
        this.existeEspecialistasPorEspecialidad=false;
        this.listaCopiada=EspecialistaporEspecialidad;
        this.listUsuarios=EspecialistaporEspecialidad;
      }
    })
  }

}
