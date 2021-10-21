import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.scss']
})
export class RegistrosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  paciente(){
    this.router.navigate(['registro-paciente']);
  }

  especialista(){
    this.router.navigate(['registro-especialista']);
  }
}
