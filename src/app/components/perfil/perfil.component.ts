import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  @Input()usuario:any=null;
  @Input() tipo:string='';
  constructor() { }

  ngOnInit(): void {
  }

}
