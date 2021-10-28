import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { timer } from 'rxjs';
import { Especialidad } from 'src/app/classes/especialidades';
import { AuthService } from 'src/app/service/auth.service';
import { EspecialistasService } from 'src/app/service/especialistas.service';


@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.scss']
})
export class EspecialidadesComponent implements OnInit {
  @Output() espSelec:EventEmitter<Especialidad>;
  busqueda:string;
  listaEspecialidades:any;
  listacopiada:any;
  especialidades:Especialidad[]=[]
  especialidadSeleccionada:any
  constructor(private authService:AuthService ,private service:EspecialistasService) {
    this.busqueda='';
    //this.listaEspecialidades=this.authService.getTodasEspecialidades();
    this.espSelec=new EventEmitter<Especialidad>();
   }


  ngOnInit(): void {
    this.service.getEspecialidades().subscribe((especialidad:Especialidad[])=>{
      this.especialidades=especialidad;
      this.listacopiada=especialidad;
    })


  }

  SelecEspecialidad(item:Especialidad){
    this.espSelec.emit(item);
    this.especialidadSeleccionada=item;

  }

  filtarLista(){
    this.listacopiada=this.especialidades
    if(this.listacopiada){
      const listaFiltrada=this.listacopiada.filter((especialidad:Especialidad)=>{
        return especialidad.nombre?.toLowerCase().includes(this.busqueda.toLowerCase());
      });
      this.listacopiada=listaFiltrada;
    }
  }
}
