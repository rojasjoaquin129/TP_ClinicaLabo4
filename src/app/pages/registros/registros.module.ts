import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroPacienteComponent } from './registro-paciente/registro-paciente.component';
import { RegistroEspecialistaComponent } from './registro-especialista/registro-especialista.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrosComponent } from './registros/registros.component';
import { ComponentesModule } from 'src/app/components/componentes.module';
import { RegistroAdminComponent } from './registro-admin/registro-admin.component';



@NgModule({
  declarations: [
    RegistroPacienteComponent,
    RegistroEspecialistaComponent,
    RegistrosComponent,
    RegistroAdminComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentesModule
  ]
})
export class RegistrosModule { }
