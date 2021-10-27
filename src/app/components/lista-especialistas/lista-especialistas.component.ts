import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { Especialistas } from 'src/app/classes/especialistas';
import { AuthService } from 'src/app/service/auth.service';

import Swal from 'sweetalert2'
@Component({
  selector: 'app-lista-especialistas',
  templateUrl: './lista-especialistas.component.html',
  styleUrls: ['./lista-especialistas.component.scss']
})
export class ListaEspecialistasComponent implements OnInit {
  listaEspecialista:any[]=[];
  especialista:any;
  loading=false;
  constructor(private authService :AuthService) {

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





