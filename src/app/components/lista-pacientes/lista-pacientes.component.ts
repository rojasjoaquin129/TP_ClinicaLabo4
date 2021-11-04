import { Component, OnInit } from '@angular/core';
import { Pacientes } from 'src/app/classes/pasientes';
import {Especialistas} from 'src/app/classes/especialistas'
import {Administradores} from 'src/app/classes/Administradores'
import { AuthService } from 'src/app/service/auth.service';
import * as XLSX from 'xlsx'
import { timer } from 'rxjs';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent implements OnInit {
  pacientesLista:Pacientes[]=[];
  especialistas:Especialistas[]=[];
  admins:Administradores[]=[];
  listaPacientes:Pacientes[]=[];
  fileName='ExcelUsuarios.xlsx';
  exportar:boolean=false;
  listaExel:Administradores[] | Pacientes[] |Especialistas []=[]
  constructor(private authService :AuthService) { }

  ngOnInit(): void {
    //asi no va pero sirve no es perfecto  y puede fallar
    //this.listaPacientes=this.authService.traerTodoPaciente();

    //  asi si

    this.authService.traerTodoPacientes().subscribe((listadePacientes)=>{
      this.pacientesLista=listadePacientes;
      this.listaPacientes=listadePacientes;
    });

    this.authService.traerTodoEspecialista().subscribe((listadeEspecialistas)=>{
      this.especialistas=listadeEspecialistas;
    })
    this.authService.traerTodoAdmin().subscribe((listaDeAdministradores)=>{
      this.admins=listaDeAdministradores;
    })

  }

  exportExcel(){
     /* pass here the table id */
       this.exportar=true;
       timer(10).subscribe(()=>{
        if(this.exportar){
          let element = document.getElementById('excel-table');
          console.log(element);
          const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

          /* generate workbook and add the worksheet */
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

          /* save to file */
          XLSX.writeFile(wb, this.fileName);
        }
        if(this.exportar){
          this.exportar=false;
        }
       });
  }

}
