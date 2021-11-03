import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { timer } from 'rxjs';
import { Administradores } from 'src/app/classes/Administradores';
import { Especialidad } from 'src/app/classes/especialidades';
import { Especialistas } from 'src/app/classes/especialistas';
import { Pacientes } from 'src/app/classes/pasientes';
import { AuthService } from 'src/app/service/auth.service';
import { EspecialistasService } from 'src/app/service/especialistas.service';


@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.scss']
})
export class EspecialidadesComponent implements OnInit {
  @Input() tipo:string='paciente';
  @Input() usuario:Especialistas|null=null;
  @Output() espSelec:EventEmitter<Especialidad>;
  busqueda:string;
  listaEspecialidades:any;
  listacopiada:any;
  especialidades:Especialidad[] =[]
  especialidadSeleccionada:any
  especialidadDos:any;
  constructor(private authService:AuthService ,private service:EspecialistasService) {
    this.busqueda='';
    //this.listaEspecialidades=this.authService.getTodasEspecialidades();
    this.espSelec=new EventEmitter<Especialidad>();
   }


  ngOnInit(): void {
    if(this.tipo==='paciente' || this.tipo==='admin'){
      this.service.getEspecialidades().subscribe((especialidad:Especialidad[])=>{
        this.especialidades=especialidad;
        this.listacopiada=especialidad;
      });
    }else{
      this.especialidadDos=this.usuario?.especialidad;
      this.listacopiada=this.usuario?.especialidad;
      this.especialidades=this.listacopiada;
    }



  }

  SelecEspecialidad(item:Especialidad){
    this.espSelec.emit(item);
    this.especialidadSeleccionada=item;

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
