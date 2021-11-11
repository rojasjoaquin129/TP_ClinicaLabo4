import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroPacienteComponent } from './registro-paciente/registro-paciente.component';
import { RegistroEspecialistaComponent } from './registro-especialista/registro-especialista.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrosComponent } from './registros/registros.component';
import { ComponentesModule } from 'src/app/components/componentes.module';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { RegistroAdminComponent } from './registro-admin/registro-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    RegistroPacienteComponent,
    RegistroEspecialistaComponent,
    RegistrosComponent,
    RegistroAdminComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentesModule,
    RecaptchaFormsModule,
    RecaptchaModule,
  ]
})
export class RegistrosModule { }
