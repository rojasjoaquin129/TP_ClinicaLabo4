import { Component, OnInit } from '@angular/core';
import { Ingreso } from 'src/app/classes/Ingresos';
import { AuthService } from 'src/app/service/auth.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.scss']
})
export class EntradasComponent implements OnInit {
  listaIngresos:Ingreso[]=[];
  fileName='ExcelIngresos.xlsx';
  constructor( private authService:AuthService) {
    this.listaIngresos=[];
    this.authService.traerIngresos().subscribe((ingresos:Ingreso[])=>{
      this.listaIngresos=ingresos;
    })
   }

  ngOnInit(): void {
  }

  exportExcel(){
    /* pass here the table id */


          let element = document.getElementById('excel-table');
          console.log(element);
          const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

          /* generate workbook and add the worksheet */
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

          /* save to file */
          XLSX.writeFile(wb, this.fileName);


 }
}
