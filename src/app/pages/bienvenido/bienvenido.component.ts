import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.scss']
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
