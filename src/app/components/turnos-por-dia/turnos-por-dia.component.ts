import { Component, OnInit } from "@angular/core";
import * as Chartist from "chartist";
import { IChartistData, IPieChartOptions } from "chartist";
import html2canvas from "html2canvas";
import jspdf from "jspdf";
import { ChartEvent, ChartType } from "ng-chartist";
import { Turno } from "src/app/classes/turnos";
import { TurnosService } from "src/app/service/turnos.service";

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}
@Component({
  selector: 'app-turnos-por-dia',
  templateUrl: './turnos-por-dia.component.html',
  styleUrls: ['./turnos-por-dia.component.scss']
})
export class TurnosPorDiaComponent implements OnInit {

  labels:any[]=[]
  series:any[]=[];
  type: ChartType;
  data!: IChartistData;
  options: IPieChartOptions;

  constructor(private dataServ:TurnosService) {

  this.dataServ.traerTodoTurno().subscribe((turnos:Turno[]) =>{
    let fechaEncontrada=false;

    turnos.forEach((turno:Turno) =>{

      if(turno.estado==="pendiente" || turno.estado==="aceptado" || turno.estado==="finalizado" ){

        const tiempo=new Date(turno.dia).toLocaleDateString();
        console.log(tiempo)
        fechaEncontrada=false;
        for(let i=0;i<this.labels.length;i++){
          if(this.labels[i]===tiempo){
            fechaEncontrada=true;
            this.series[i]=Number(this.series[i]+1);
          }
        }
        if(fechaEncontrada===false)
        {
          this.labels.push(tiempo);
          this.series.push(1);
        }
      }



      //this.labels.push(item.nombre);
    });

    this.data = {
      labels: this.labels,
      "series": this.series
    };
  });

  this.type = 'Pie';

  this.options = {
    donut: false,
    showLabel: true,
    width:400,
    height:400
  };
}

exportAsPDF(div_id: string){
  let data = document.getElementById(div_id);
  if(data){
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
      pdf.save('TurnosPorDias.pdf');
    });
  }

}

  ngOnInit(){

  }

}
