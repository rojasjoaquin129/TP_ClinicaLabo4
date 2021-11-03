import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TurnosService } from 'src/app/service/turnos.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosComponent implements OnInit {
  @Input() Especialista:any;
  public semana = [
    { id: 1, value: 'Lunes' },
    { id: 2, value: 'Martes' },
    { id: 3, value: 'Miércoles' },
    { id: 4, value: 'Jueves' },
    { id: 5, value: 'Viernes' },
    { id: 6, value: 'Sábado' },
  ];
  public clinicaHoras = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  horarioForm:FormGroup;
  public especialidad =new FormControl('',[Validators.required]);
  public dias=new FormArray([],[Validators.required]);
  public from =new FormControl('',[Validators.required]);
  public to =new FormControl('',[Validators.required]);
  public duracion=new FormControl('',[Validators.required]);
  constructor(
    private formB:FormBuilder ,
    private turnoService:TurnosService ) {
    this.horarioForm=this.formB.group({
      especialidad:this.especialidad,
      dias:this.dias,
      from:this.from,
      to:this.to,
      duracion:this.duracion
    })
   }
   get days(){
     return this.horarioForm.get('dias') as FormArray;
   }
  ngOnInit(): void {
  }

  capturarDias(event:any){
    const dia=parseInt(event.target.value);
    if(event.target.checked){
      this.days.push(new FormControl(dia));
    }else{
      this.days.controls.forEach((control,index)=>{
        if(control.value===dia){
          return this.days.removeAt(index);
        }
      });
    }
  }

  enviarHorarios(){
    const resultado=this.horarioForm.getRawValue();

    const resultadoparaGuardar={
      ...resultado,
      from:parseInt(resultado.from),
      to:parseInt(resultado.to),
      duration:parseInt(resultado.duracion),
    };
    try {
      this.turnoService.generaHorariosParaLosTurnos(this.semana,resultadoparaGuardar,this.Especialista);
      this.horarioForm.reset();
      this.horarioForm.get('especialidad')?.setValue('');
      this.horarioForm.get('from')?.setValue('');
      this.horarioForm.get('to')?.setValue('');
      this.horarioForm.get('duracion')?.setValue('');
      this.mensaje('La disponibilidad fue seteada con éxito!',
      'Se han generaron turnos de hoy a 29 días');
    } catch (error:any) {
      this.mensajeError(error.message);
    }
  }



  mensaje( titulo:string, texto:string )  {
    Swal.fire({
      icon: 'success',
      title:titulo,
      text:texto });
  };

  mensajeError(text:string){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: text,
    })
  }

}
