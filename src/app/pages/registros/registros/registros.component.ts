import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.scss']
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
