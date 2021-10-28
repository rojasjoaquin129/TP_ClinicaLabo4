import { Component, EventEmitter, Input, OnInit, Output, SimpleChange,OnChanges, SimpleChanges } from '@angular/core';
import { timer } from 'rxjs';
import { Administradores } from 'src/app/classes/Administradores';
import { Especialidad } from 'src/app/classes/especialidades';
import { Especialistas } from 'src/app/classes/especialistas';
import { Pacientes } from 'src/app/classes/pasientes';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-filtro-doctor',
  templateUrl: './filtro-doctor.component.html',
  styleUrls: ['./filtro-doctor.component.scss']
})
export class FiltroDoctorComponent implements OnInit,OnChanges {
  @Input() tipo:string='';
  @Input() Especialidad:any=null;
  @Output() usuarioSeleccionado:EventEmitter<Pacientes|Especialistas|null>;
  listaCopiada:Array<Pacientes|Especialistas> | null=null;
  listUsuarios:Array<Pacientes|Especialistas> | null=null;
  busqueda:any;
  usuario:any;
  existeEspecialistasPorEspecialidad:any;
  constructor( private authService :AuthService) {
    this.usuarioSeleccionado=new EventEmitter<Pacientes|Especialistas|null>();
    this.busqueda='';
   }

   ngOnChanges(changes:SimpleChanges){
     if(this.Especialidad){
       this.filtroUsuarioEspecialidad(changes.Especialidad.currentValue);
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

  ngOnInit(): void {
    if(this.Especialidad){
    this.filtroUsuarioEspecialidad(this.Especialidad);
    }else{
      this.optenerFiltro(this.tipo);
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
    console.log(result);
    result.subscribe((EspecialistaporEspecialidad)=>{
      console.log('usuarios',EspecialistaporEspecialidad);
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
