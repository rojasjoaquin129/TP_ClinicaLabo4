import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentesModule } from '../components/componentes.module';
import { RegistrosModule } from './registros/registros.module';



@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    ErrorComponent,
    BienvenidoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ComponentesModule,
    RegistrosModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
