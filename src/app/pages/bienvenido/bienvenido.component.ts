import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{trigger,style,transition,animate, state} from'@angular/animations'
@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.scss'],
  animations:[
    trigger('enterState',[
      state('void',style({
        transform:'translateX(-100%)',
        opacity:0
      })),
      transition(':enter',[
        animate(1000,style({
          transform:'translateX(0)',
          opacity:1
        }))
      ])
    ]),
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
export class BienvenidoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  ingresar(){
    this.router.navigate(['login']);
  }
  registrarse(){
    this.router.navigate(['registro']);
  }

}
