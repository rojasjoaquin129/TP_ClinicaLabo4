import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaEspecialistasComponent } from './components/lista-especialistas/lista-especialistas.component';
import { ListaPacientesComponent } from './components/lista-pacientes/lista-pacientes.component';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroAdminComponent } from './pages/registros/registro-admin/registro-admin.component';
import { RegistroEspecialistaComponent } from './pages/registros/registro-especialista/registro-especialista.component';
import { RegistroPacienteComponent } from './pages/registros/registro-paciente/registro-paciente.component';
import { RegistrosComponent } from './pages/registros/registros/registros.component';

const routes: Routes = [
  {path:'',component:BienvenidoComponent},
  {path:'login',component: LoginComponent},
  {path:'home', component:HomeComponent},
  {path:'lista-pacientes',component:ListaPacientesComponent},
  {path:'lista-especialistas',component:ListaEspecialistasComponent},
  {path:'registro',component:RegistrosComponent},
  {path:'registro-paciente',component:RegistroPacienteComponent},
  {path:'registro-especialista',component:RegistroEspecialistaComponent},
  {path:'registro-admin',component:RegistroAdminComponent},
  {path:'**',component:ErrorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
