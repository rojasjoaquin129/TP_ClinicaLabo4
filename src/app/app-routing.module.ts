import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroEspecialistaComponent } from './pages/registros/registro-especialista/registro-especialista.component';
import { RegistroPacienteComponent } from './pages/registros/registro-paciente/registro-paciente.component';
import { RegistrosComponent } from './pages/registros/registros/registros.component';

const routes: Routes = [
  {path:'',component:BienvenidoComponent},
  {path:'login',component: LoginComponent},
  {path:'home', component:HomeComponent},
  {path:'registro',component:RegistrosComponent},
  {path:'registro-paciente',component:RegistroPacienteComponent},
  {path:'registro-especialista',component:RegistroEspecialistaComponent},
  {path:'**',component:ErrorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
