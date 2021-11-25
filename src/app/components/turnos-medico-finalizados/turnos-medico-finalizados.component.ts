import { Component, OnInit } from '@angular/core';
import * as Chartist from "chartist";
import { IChartistData, IPieChartOptions } from "chartist";
import html2canvas from "html2canvas";
import jspdf from "jspdf";
import { ChartEvent, ChartType } from "ng-chartist";
import { TurnosService } from 'src/app/service/turnos.service';

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-turnos-medico-finalizados',
  templateUrl: './turnos-medico-finalizados.component.html',
  styleUrls: ['./turnos-medico-finalizados.component.scss']
})
export class TurnosMedicoFinalizadosComponent implements OnInit {

  title:string='';
  labels:any[]=[]
  series:any[]=[];
  type: ChartType;
  data!: IChartistData;
  options: IPieChartOptions;

  constructor(private dataServ:TurnosService) {
    this.type = 'Pie';

    this.options = {
      donut: false,
      showLabel: true,
      width:400,
      height:400
    };
    this.title="Cantidad de turnos finalizados según profesional los ultimos 30 días"
    this.haceroperativo(30);
  }

  mes(){
    this.labels=[];
    this.series=[];
    this.title="Cantidad de turnos finalizados según profesional los ultimos 30 días"
    this.haceroperativo(30);
  }
  semana(){
    this.labels=[];
    this.series=[];
    this.title="Cantidad de turnos finalizados según profesional los ultima semana"
    this.haceroperativo(7);
  }

  quincena(){
    this.labels=[];
    this.series=[];
    this.title="Cantidad de turnos finalizados según profesional Ultima dos semanas"
    this.haceroperativo(14);
  }

  haceroperativo(tiemp:number){
    let dia=new Date();
    const hoy=dia.getTime();


    let elMesPasado = new Date(dia.setDate(dia.getDate()-tiemp));
    let mesPasado=elMesPasado.getTime()


    this.dataServ.getTurnosByEstadoYPeriodo('finalizado').then(async res =>{
      let profesionalEncontrada=false;
      console.log(res);
      res.forEach(item =>{
        const tiempo=new Date(item.dia).getTime();
        if(tiempo<=hoy && tiempo>=mesPasado){
          profesionalEncontrada=false;
          for(let i=0;i<this.labels.length;i++){
            if(this.labels[i]===item.especialista.apellido){
              profesionalEncontrada=true;
              this.series[i]=Number(this.series[i]+1);
            }
          }
          if(profesionalEncontrada===false)
          {
            this.labels.push(item.especialista.apellido);
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


  }
  exportAsPDF(div_id: string){
    let data = document.getElementById(div_id);
    if(data){

    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
      pdf.save('TurnosFinalizadosPorProfesional.pdf');
    });
  }
  }

  ngOnInit(){
  }

}
