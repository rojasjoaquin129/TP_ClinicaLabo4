import { Component, OnInit } from '@angular/core';
import{trigger,style,transition,animate, state} from'@angular/animations'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
    ]),
    trigger('enterState',[
      state('void',style({
        transform:'translateY(400%)',
        opacity:0
      })),
      transition(':enter',[
        animate(1000,style({
          transform:'translateY(0)',
          opacity:1
        }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  usuario:any;
  tipo:any;
  constructor() { }

  ngOnInit(): void {
    this.usuario=JSON.parse(localStorage.getItem('usuario') as string) ;
    this.tipo=localStorage.getItem('tipo');
  }

}
