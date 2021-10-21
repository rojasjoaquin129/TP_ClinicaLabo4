import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroPacienteComponent } from './registro-paciente/registro-paciente.component';
import { RegistroEspecialistaComponent } from './registro-especialista/registro-especialista.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrosComponent } from './registros/registros.component';



@NgModule({
  declarations: [
    RegistroPacienteComponent,
    RegistroEspecialistaComponent,
    RegistrosComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RegistrosModule { }
