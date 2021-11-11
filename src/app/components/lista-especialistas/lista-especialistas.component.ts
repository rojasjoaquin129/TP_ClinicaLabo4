import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { Especialistas } from 'src/app/classes/especialistas';
import { AuthService } from 'src/app/service/auth.service';
import {Administradores} from 'src/app/classes/Administradores';
import { Pacientes } from 'src/app/classes/pasientes';
import Swal from 'sweetalert2'
import * as XLSX from 'xlsx'
import{trigger,style,transition,animate, state} from'@angular/animations'
@Component({
  selector: 'app-lista-especialistas',
  templateUrl: './lista-especialistas.component.html',
  styleUrls: ['./lista-especialistas.component.scss'],
  animations:[
    trigger('soso',[
      state('void',style({

        opacity:0
      })),
      transition(':enter',[
        animate(1000,style({

          opacity:1
        }))
      ])
    ])
  ]
})
export class ListaEspecialistasComponent implements OnInit {
  listaEspecialista:any[]=[];
  especialista:any;
  loading=false;
  pacientesLista:Pacientes[]=[];
  especialistas:Especialistas[]=[];
  admins:Administradores[]=[];
  exportar:boolean=false;
  fileName='ExcelUsuarios.xlsx';
  constructor(private authService :AuthService) {
    this.authService.traerTodoPacientes().subscribe((listadePacientes)=>{
      this.pacientesLista=listadePacientes;

    });

    this.authService.traerTodoEspecialista().subscribe((listadeEspecialistas)=>{
      this.especialistas=listadeEspecialistas;
    })
    this.authService.traerTodoAdmin().subscribe((listaDeAdministradores)=>{
      this.admins=listaDeAdministradores;
    })
   }

  ngOnInit(): void {
    this.getEspecialistas();
  }
  changeEstado(id:string,isEnabled:boolean){
    this.spinner();
    let seguimos=false;
    timer(3000).subscribe(()=>{
      for (let i = 0; i < this.listaEspecialista.length; i++) {
        if(id== this.listaEspecialista[i].id){
          this.especialista=[]
          seguimos=true
          this.authService.extraerUsuario(this.listaEspecialista[i].mail);
          this.especialista=this.authService.usuario;
          this.especialista.enabled=isEnabled;
          console.log()
        }
      }
      if(seguimos){
        this.authService.actualizarEspecialista(id,this.especialista)
      }
      });
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

  getEspecialistas(){
    this.authService.getEspecialistas().subscribe(data=>{
      this.listaEspecialista=[];
      data.forEach(element => {

        this.listaEspecialista.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        });

      });
    })
  }


  spinner(){
    let timerInterval:any
    Swal.fire({
      title: 'Auto close alert!',
      html: 'I will close in <b></b> milliseconds.',
      timer: 3000,
      timerProgressBar: true,

      didOpen: () => {
        Swal.showLoading()
        let b = Swal.getHtmlContainer()?.querySelector('b')

      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result:any) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
    }


}





