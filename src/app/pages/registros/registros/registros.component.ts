import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{trigger,style,transition,animate, state} from'@angular/animations'
@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.scss'],
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
export class RegistrosComponent implements OnInit {
  tipo:any;
  admin=false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.tipo=localStorage.getItem('tipo');
    if(this.tipo==='admin'){
      this.admin=true;
    }else{
      this.admin=false;
    }
  }
  paciente(){
    this.router.navigate(['registro-paciente']);
  }

  especialista(){
    this.router.navigate(['registro-especialista']);
  }
  admistrador(){
    this.router.navigate(['registro-admin']);
  }
}
