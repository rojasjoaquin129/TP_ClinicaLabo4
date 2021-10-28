import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {  RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListaEspecialistasComponent } from './lista-especialistas/lista-especialistas.component';
import { ListaPacientesComponent } from './lista-pacientes/lista-pacientes.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HorariosComponent } from './horarios/horarios.component';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { FiltroDoctorComponent } from './filtro-doctor/filtro-doctor.component';
import { SpinnerComponent } from './spinner/spinner.component';




@NgModule({
  declarations: [
    NavbarComponent,
    ListaEspecialistasComponent,
    ListaPacientesComponent,
    MiPerfilComponent,
    PerfilComponent,
    HorariosComponent,
    EspecialidadesComponent,
    FiltroDoctorComponent,
    SpinnerComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    EspecialidadesComponent,
    SpinnerComponent,
    FiltroDoctorComponent
  ]
})
export class ComponentesModule { }
