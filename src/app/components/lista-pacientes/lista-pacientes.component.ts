import { Component, OnInit } from '@angular/core';
import { Pacientes } from 'src/app/classes/pasientes';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent implements OnInit {

  listaPacientes:Pacientes[]=[];
  constructor(private authService :AuthService) { }

  ngOnInit(): void {
    this.listaPacientes=this.authService.traerTodoPaciente();
  }

}
