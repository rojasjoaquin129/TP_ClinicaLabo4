import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { timer } from 'rxjs';
import { Administradores } from 'src/app/classes/Administradores';
import { Especialidad } from 'src/app/classes/especialidades';
import { Especialistas } from 'src/app/classes/especialistas';
import { Pacientes } from 'src/app/classes/pasientes';
import { Turno } from 'src/app/classes/turnos';
import { AuthService } from 'src/app/service/auth.service';
import { EspecialistasService } from 'src/app/service/especialistas.service';
import { TurnosService } from 'src/app/service/turnos.service';


@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.scss']
})
export class EspecialidadesComponent implements OnInit , OnChanges{
  @Input() tipo:string='paciente';
  @Input() usuario:Especialistas|Pacientes|null=null;
  @Output() espSelec:EventEmitter<Especialidad |null>;
  @Output() MisTurnos:EventEmitter<Turno[]|null>
  busqueda:string;
  listaEspecialidades:any;
  listacopiada:any;
  especialidades:Especialidad[] =[]
  especialidadSeleccionada:any
  especialidadDos:any;
  usuarioSeleccionado:Especialistas|Pacientes|null=null;
  constructor(private authService:AuthService
     ,private service:EspecialistasService,
     private turnosService:TurnosService) {
    this.busqueda='';
    //this.listaEspecialidades=this.authService.getTodasEspecialidades();
    this.espSelec=new EventEmitter<Especialidad|null>();
    this.MisTurnos=new EventEmitter<Turno[]|null>();
   }

   ngOnChanges(changes: SimpleChanges){


    this.rellenarLista(changes.usuario.currentValue);
   }
  ngOnInit(): void {
    this.usuarioSeleccionado=this.usuario;

  }





  rellenarLista(usuario:Especialistas|Pacientes|null){

    if(usuario){
    if(this.tipo==='paciente' || this.tipo==='admin'){
      if(usuario instanceof Pacientes){

      }else{
        this.especialidadDos=usuario.especialidad;
        this.listacopiada=usuario?.especialidad;
        this.especialidades=this.listacopiada;
      }
    }else{
      if(this.usuario instanceof Especialistas){
        this.especialidadDos=this.usuario?.especialidad;
        this.listacopiada=this.usuario?.especialidad;
        this.especialidades=this.listacopiada;
      }}
    }
  }


  SelecEspecialidad(item:Especialidad){
   if(this.especialidadSeleccionada && item.id===this.especialidadSeleccionada.id ){
    this.espSelec.emit(null);
    this.MisTurnos.emit(null);
    this.especialidadSeleccionada=null
   }else{
    this.espSelec.emit(item);
    this.buscarLista(item);
    this.especialidadSeleccionada=item;
    this.usuarioSeleccionado=this.usuario;
   }


  }

  async buscarLista(especialidad:any){
    const misTurnos:Turno[]=[];
    let resultado;
    if(this.usuario){
      resultado =await this.turnosService.traerTurnosPorEmail({
        email:this.usuario?.mail,
        role:this.tipo
      });
      resultado.subscribe((turnos:Turno[])=>{
        turnos.forEach((turno:Turno)=>{
          if(turno.especialidad===especialidad){
            misTurnos.push(turno);
          }
        })
      });
    }
    this.MisTurnos.emit(misTurnos);


  }

  filtarLista(){
    if(this.tipo==='paciente' || this.tipo==='admin'){
      this.listacopiada=this.especialidades
      if(this.listacopiada){
        const listaFiltrada=this.listacopiada.filter((especialidad:Especialidad)=>{
          return especialidad.nombre?.toLowerCase().includes(this.busqueda.toLowerCase());
        });
        this.listacopiada=listaFiltrada;
      }else{
        this.listacopiada=this.especialidadDos
        if(this.listacopiada){
          const listaFiltrada=this.listacopiada.filter((especialidad:any)=>{
            return especialidad.toLowerCase().includes(this.busqueda.toLowerCase());
          });
          this.listacopiada=listaFiltrada;
      }
    }
    }

  }
}
