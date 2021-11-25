import { Component, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/service/turnos.service';
import * as Chartist from "chartist";
import { IChartistData, IPieChartOptions } from "chartist";

import html2canvas from "html2canvas";
import jspdf from "jspdf";

import { ChartEvent, ChartType } from "ng-chartist";


export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-turnos-por-especialidad',
  templateUrl: './turnos-por-especialidad.component.html',
  styleUrls: ['./turnos-por-especialidad.component.scss']
})
export class TurnosPorEspecialidadComponent implements OnInit {

  labels:any[]=[]
  series:any[]=[];
  type: ChartType;
  data!: IChartistData;
  options: IPieChartOptions;

  constructor(private dataServ: TurnosService) {
    this.dataServ.traerTodoTurno().subscribe(turnos =>{
      let especialidadEncontrada=false;
      turnos.forEach(turno =>{
        if(turno.estado!="disponible" && turno.estado!='cancelado'){
          especialidadEncontrada=false;
          for(let i=0;i<this.labels.length;i++){
            if(this.labels[i]===turno.especialidad){
              especialidadEncontrada=true;
              this.series[i]=Number(this.series[i]+1);
            }
          }
          if(especialidadEncontrada===false)
          {
            this.labels.push(turno.especialidad);
            this.series.push(1);
          }
        }

      });
      console.log(this.labels);
      console.log(this.series);
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

  ngOnInit(){
  }

  exportAsPDF(div_id: string){
    let data = document.getElementById(div_id);
    if(data){
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 11.0);
      pdf.save('TurnosPorEspecialidad.pdf');
    });
    }
  }
}
