import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {  RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaEspecialistasComponent } from './lista-especialistas/lista-especialistas.component';
import { ListaPacientesComponent } from './lista-pacientes/lista-pacientes.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HorariosComponent } from './horarios/horarios.component';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { FiltroDoctorComponent } from './filtro-doctor/filtro-doctor.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ListaHorariosComponent } from './lista-horarios/lista-horarios.component';
import { EmptyCardComponent } from './empty-card/empty-card.component';
import { TablaTurnosComponent } from './tabla-turnos/tabla-turnos.component';
import { ProfecionalesComponent } from './profecionales/profecionales.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardsListaComponent } from './cards-lista/cards-lista.component';
import { TurnosMedicoFinalizadosComponent } from './turnos-medico-finalizados/turnos-medico-finalizados.component';
import { TurnosPorDiaComponent } from './turnos-por-dia/turnos-por-dia.component';
import { TurnosPorEspecialidadComponent } from './turnos-por-especialidad/turnos-por-especialidad.component';
import { ChartistModule } from 'ng-chartist';
import { TurnosMedicoSolicitadosComponent } from './turnos-medico-solicitados/turnos-medico-solicitados.component';
import { EntradasComponent } from './entradas/entradas.component';
import { EstadoTurnoPipe } from '../pipes/estado-turno.pipe';
import { FechaPipe } from '../pipes/fecha.pipe';
import { AgrandarDirective } from '../directives/agrandar.directive';
import { PasarCursorDirective } from '../directives/pasar-cursor.directive';





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
    ListaHorariosComponent,
    EmptyCardComponent,
    TablaTurnosComponent,
    ProfecionalesComponent,
    CardsListaComponent,
    TurnosMedicoFinalizadosComponent,
    TurnosPorDiaComponent,
    TurnosPorEspecialidadComponent,
    TurnosMedicoSolicitadosComponent,
    EntradasComponent,
    EstadoTurnoPipe,
    FechaPipe,
    AgrandarDirective,
    PasarCursorDirective,
     ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ChartistModule,

  ],
  exports: [
    NavbarComponent,
    EspecialidadesComponent,
    SpinnerComponent,
    FiltroDoctorComponent,
    ListaHorariosComponent,
    TablaTurnosComponent,
    CardsListaComponent,
    TurnosPorEspecialidadComponent,
    TurnosMedicoFinalizadosComponent,
    TurnosMedicoSolicitadosComponent,
    TurnosPorDiaComponent,
    EntradasComponent

  ]
})
export class ComponentesModule { }
