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
import { NavbarComponent } from '../components/navbar/navbar.component';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
import { PdfComponent } from './pdf/pdf.component';
import { HistorialClinicoComponent } from './historial-clinico/historial-clinico.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartistModule } from 'ng-chartist';
PdfMakeWrapper.setFonts(pdfFonts);
@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    ErrorComponent,
    BienvenidoComponent,
    MisTurnosComponent,
    SolicitarTurnoComponent,
    PdfComponent,
    HistorialClinicoComponent,

  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ComponentesModule,
    RegistrosModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ChartistModule
  ]
})
export class PagesModule { }
