import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{trigger,style,transition,animate, state} from'@angular/animations'

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss'],
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
