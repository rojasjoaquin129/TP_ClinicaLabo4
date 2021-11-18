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
import { TurnosService } from 'src/app/service/turnos.service';
import { Turno } from 'src/app/classes/turnos';
import {PdfMakeWrapper, Txt, Img,Table} from 'pdfmake-wrapper'
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
    ]),
    trigger('enterState',[
      state('void',style({
        transform:'translateY(400%)',
        opacity:0
      })),
      transition(':enter',[
        animate(1000,style({
          transform:'translateY(0)',
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
  turnos:Turno[]=[];
  fileName='ExcelUsuarios.xlsx';
  constructor(private authService :AuthService ,
    private turnosService : TurnosService) {
      this.turnos=[];
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

  verificarTurnos(listaDeTurnos:Turno[],turno:Turno){
    let flag=false
    if(listaDeTurnos.length===0){
      flag=false;
    }else{
      listaDeTurnos.forEach((turnillo:Turno)=>{
        if(turnillo.id===turno.id){
          flag=true;
        }
      })
    }
    return flag;

  }
  async obtenerTurnos(email:string){
    const turnos:Turno[]=[];
    let resultado =await this.turnosService.traerTurnosPorEmail({
      email:email,
      role:'especialista'
    });
    resultado.subscribe((Turnitos:Turno[])=>{
      Turnitos.forEach((turno:Turno)=>{
        if(turno.estado==='finalizado'){
          if(!this.verificarTurnos(turnos,turno)){
            turnos.push(turno);
          }
        }
      });
    });
    this.turnos=turnos;
  }

  llevarPaciente(especialista:Especialistas){
    this.obtenerTurnos(especialista.mail).then(()=>{
      console.log(this.turnos);

    })
    timer(500).subscribe(()=>{
      this.VerHistoriaClinica(especialista);
    })

  }


  async VerHistoriaClinica(especialsta:Especialistas){
    let hoy=new Date();
    let fecha= hoy.getDate()+"/"+ Number(hoy.getMonth()+1)+"/"+hoy.getFullYear();

    if(this.turnos){
        const miPdf= new PdfMakeWrapper();

        miPdf.add( await new Img('../../../assets/reporte.png').width(100).height(100).margin([200,20]).build() );
        miPdf.add( new Txt('Turnos del Especialista  '+ especialsta.nombre + " " + especialsta.apellido+" en La Clínica").bold().fontSize(15).alignment("center").margin(15).end);
        miPdf.add( new Txt('Fecha de emisión: ' + fecha).margin(20).alignment("center").end);

        if(this.turnos && this.turnos.length>0)
        {
          let i=0;
          this.turnos?.forEach(element => {
            i++;
            const diaputo=element.Terminado?.toString();
            const evento=new Date(diaputo);
            miPdf.add( new Txt('Turno: '+i ).margin(10).bold().end);
            miPdf.add(new Table([
              [ new Txt('Paciente : ').bold().end, element.paciente?.nombre + " "+ element.paciente?.apellido],
              [ new Txt('Especialidad: ').bold().end, element.especialidad],
              [ new Txt('Fecha de atención: ').bold().end, evento.toLocaleDateString()],
              [ new Txt('Hora de atención: ').bold().end, evento.toLocaleTimeString()],
              [ new Txt('Diagnóstico: ').bold().end,element.diagnostico],
              [ new Txt('Comentarios: ').bold().end, element.comentarioCompleto],
              [ new Txt('Presión Arterial Alta : ').bold().end, element.pasienteInfo?.presion.precionAlta],
              [ new Txt('Presión Arterial Baja : ').bold().end, element.pasienteInfo?.presion.precionBaja],
              [ new Txt('Temperatura: ').bold().end, element.pasienteInfo?.temperatura],
              [ new Txt('Altura: ').bold().end, element.pasienteInfo?.altura],
              [ new Txt('Peso: ').bold().end, element.pasienteInfo?.peso],
              //[ new Txt('Otras métricas').bold().end, ''],
              //[ new Txt(element.datosAdicionales[0].propiedad).bold().end, element.datosAdicionales[0].valor],
              //[ new Txt(element.datosAdicionales[1].propiedad).bold().end, element.datosAdicionales[1].valor],
              //[ new Txt(element.datosAdicionales[2].propiedad).bold().end, element.datosAdicionales[2].valor],
              ]).layout('noBorders').widths([ 200, 200 ]).margin(10).end
          );
          });

          miPdf.create().open();
          //miPdf.create().download();
        }
        else{
          miPdf.add( new Txt('El usuario no cuenta con turnos. Para esto es necesario haberse atendido al menos una vez algun  paciente' ).margin(30).end);
          miPdf.create().open();
          //miPdf.create().download();
        }


    }
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





