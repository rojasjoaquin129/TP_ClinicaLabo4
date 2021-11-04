import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {
  public usuario: any ;
  public tipo:any;
  constructor(
    private router :Router
  ) { }

  ngOnInit(): void {
    this.usuario=JSON.parse(localStorage.getItem('usuario') as string) ;
  this.tipo=localStorage.getItem('tipo');
  }
  iraHistorial(){
    this.router.navigate(['historial-clinico']);
  }
}
