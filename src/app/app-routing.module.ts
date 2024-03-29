import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaEspecialistasComponent } from './components/lista-especialistas/lista-especialistas.component';
import { ListaPacientesComponent } from './components/lista-pacientes/lista-pacientes.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { ErrorComponent } from './pages/error/error.component';
import { HistorialClinicoComponent } from './pages/historial-clinico/historial-clinico.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
import { RegistroAdminComponent } from './pages/registros/registro-admin/registro-admin.component';
import { RegistroEspecialistaComponent } from './pages/registros/registro-especialista/registro-especialista.component';
import { RegistroPacienteComponent } from './pages/registros/registro-paciente/registro-paciente.component';
import { RegistrosComponent } from './pages/registros/registros/registros.component';
import { SolicitarTurnoComponent } from './pages/solicitar-turno/solicitar-turno.component';


const routes: Routes = [
  {path:'',component:BienvenidoComponent},
  {path:'login',component: LoginComponent},
  {path:'home', component:HomeComponent},
  {path:'lista-pacientes',component:ListaPacientesComponent},
  {path:'lista-especialistas',component:ListaEspecialistasComponent},
  {path:'mis-turnos',component:MisTurnosComponent},
  {path:'mi-perfil',component:MiPerfilComponent},
  {path:'solicitar-turno',component:SolicitarTurnoComponent},
  {path:'registro',component:RegistrosComponent},
  {path:'registro-paciente',component:RegistroPacienteComponent},
  {path:'registro-especialista',component:RegistroEspecialistaComponent},
  {path:'registro-admin',component:RegistroAdminComponent},
  {path:'historial-clinico',component:HistorialClinicoComponent},
  {path:'**',component:ErrorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
