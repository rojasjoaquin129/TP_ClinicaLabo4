import { Component, OnInit } from '@angular/core';
import { Pacientes } from 'src/app/classes/pasientes';
import {Especialistas} from 'src/app/classes/especialistas'
import {Administradores} from 'src/app/classes/Administradores'
import { AuthService } from 'src/app/service/auth.service';
import * as XLSX from 'xlsx'
import { timer } from 'rxjs';
import{trigger,style,transition,animate, state} from'@angular/animations'
import { Turno } from 'src/app/classes/turnos';
import { TurnosService } from 'src/app/service/turnos.service';
import {PdfMakeWrapper, Txt, Img,Table} from 'pdfmake-wrapper'
@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss'],
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
export class ListaPacientesComponent implements OnInit {
  pacientesLista:Pacientes[]=[];
  especialistas:Especialistas[]=[];
  admins:Administradores[]=[];
  listaPacientes:Pacientes[]=[];
  turnos:Turno[]=[];
  fileName='ExcelUsuarios.xlsx';
  exportar:boolean=false;
  listaExel:Administradores[] | Pacientes[] |Especialistas []=[]
  constructor(
    private authService :AuthService,
    private turnosService:TurnosService) {
      this.turnos=[];
    }

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
    let turnosSinRepetidos:Turno[]=[];
    const turnos:Turno[]=[];
    let resultado =await this.turnosService.traerTurnosPorEmail({
      email:email,
      role:'paciente'
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

  llevarPaciente(paciente:Pacientes){
    this.obtenerTurnos(paciente.mail).then(()=>{
      console.log(this.turnos);

    })
    timer(500).subscribe(()=>{
      this.VerHistoriaClinica(paciente);
    })
  }



  async VerHistoriaClinica(paciente:Pacientes){
    let hoy=new Date();
    let fecha= hoy.getDate()+"/"+ Number(hoy.getMonth()+1)+"/"+hoy.getFullYear();

    if(this.turnos){
        const miPdf= new PdfMakeWrapper();

        miPdf.add( await new Img('../../../assets/reporte.png').width(100).height(100).margin([200,20]).build() );
        miPdf.add( new Txt('Historia clínica de '+ paciente.nombre + " " + paciente.apellido+" en Clínica").bold().fontSize(15).alignment("center").margin(15).end);
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
              [ new Txt('Especialista : ').bold().end, element.especialista?.nombre + " "+ element.especialista?.apellido],
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
          miPdf.add( new Txt('El usuario no cuenta con historia clínica. Para esto es necesario haberse atendido al menos una vez con alguno de los profesionales' ).margin(30).end);
          miPdf.create().open();
          //miPdf.create().download();
        }


    }
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
