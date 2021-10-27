import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {  RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListaEspecialistasComponent } from './lista-especialistas/lista-especialistas.component';
import { ListaPacientesComponent } from './lista-pacientes/lista-pacientes.component';



@NgModule({
  declarations: [
    NavbarComponent,
    ListaEspecialistasComponent,
    ListaPacientesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class ComponentesModule { }
