import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { timer } from 'rxjs';
import { Especialidad } from 'src/app/classes/especialidades';
import { Especialistas } from 'src/app/classes/especialistas';
import { Pacientes } from 'src/app/classes/pasientes';
import { Turno } from 'src/app/classes/turnos';
import { ExportarPdfService } from 'src/app/service/exportar-pdf.service';
import { TurnosService } from 'src/app/service/turnos.service';

import {PdfMakeWrapper, Txt, Img,Table} from 'pdfmake-wrapper'


@Component({
  selector: 'app-historial-clinico',
  templateUrl: './historial-clinico.component.html',
  styleUrls: ['./historial-clinico.component.scss']
})
export class HistorialClinicoComponent implements OnInit {
  usuario:any;
  tipo:any;
  activarModal=false;
  esEspecialsita:boolean=false;
  especialidadSeleccionada:any;
  especialistaSeleccionado:Pacientes | Especialistas | null = null;;
  pacienteSeleccionado: Pacientes | Especialistas | null = null;
  turnos:Turno[]|null=null;
  elSupremoTurno:Turno|null=null;
  public  modalRef:BsModalRef|null=null;
  constructor(
    private modalService:BsModalService,
    private turnosService:TurnosService,
    private pdf: ExportarPdfService) { }

  ngOnInit(): void {
    this.usuario=JSON.parse(localStorage.getItem('usuario') as string) ;
    this.tipo=localStorage.getItem('tipo');
    if(this.turnos){
      this.turnos=[];
    }else{
      this.obtenerTurnos(this.tipo);
    }

    if(this.tipo==='especialista'){
      this.esEspecialsita=true;
    }else{
      this.esEspecialsita=false;
    }
  }

  abrirModal(template:TemplateRef<any>){
    console.log('entraaca');
    this.modalRef=this.modalService.show(template);
  }
  turnosDelUsuario(turnos:Turno[]|null){
    console.log(turnos);
    const turnetes:Turno[]=[];
    timer(10).subscribe(()=>{
      if(turnos){
        for(let turno of turnos){
          if(turno.estado==='finalizado'){
            turnetes.push(turno);
          }
        }
        this.turnos=turnetes;
      }
    })



  }

  async VerHistoriaClinica(){
    let hoy=new Date();
    let fecha= hoy.getDate()+"/"+ Number(hoy.getMonth()+1)+"/"+hoy.getFullYear();

    if(this.turnos){
        const miPdf= new PdfMakeWrapper();

        miPdf.add( await new Img('../../../assets/reporte.png').width(100).height(100).margin([200,20]).build() );
        miPdf.add( new Txt('Historia clínica de '+ this.usuario.nombre + " " + this.usuario.apellido+" en Clínica").bold().fontSize(15).alignment("center").margin(15).end);
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




  async obtenerTurnos(tipo:string){
    this.turnos=[];
    let resultado;
    if(tipo!=='admin'){
      resultado =await this.turnosService.traerTurnosPorEmail({
        email:this.usuario?.mail,
        role:tipo
      });
    }else{
      resultado=this.turnosService.traerTodoTurno()
    }
    resultado.subscribe((Turnitos:Turno[])=>{
      Turnitos.forEach((turno:Turno)=>{
        if(turno.estado==='finalizado'){
          this.turnos?.push(turno);
        }
      });
    });
  }
  SeleccionoTurno(turno:Turno |null , template:TemplateRef<any>){
    console.log(turno);


    if(turno){
      this.modalRef=this.modalService.show(template);
      this.elSupremoTurno=turno;
    }

  }
  selecEspecialidad(especialidad:Especialidad |null){
    this.especialidadSeleccionada=especialidad;

  }

  setSeleccionEspecialista(Especialsita:Especialistas|Pacientes|null){
    this.especialistaSeleccionado=Especialsita;

  }

  setSeleccionPaciente(paciente:Especialistas|Pacientes|null){
    this.pacienteSeleccionado=paciente;
  }
  exportar(){
    if(this.turnos){
      this.pdf.exportarPdf(this.turnos);
    }
  }
}
