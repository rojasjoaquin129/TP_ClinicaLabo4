import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { Especialidad } from 'src/app/classes/especialidades';
import { Especialistas } from 'src/app/classes/especialistas';
import { AuthService } from 'src/app/service/auth.service';
import { EspecialistasService } from 'src/app/service/especialistas.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-registro-especialista',
  templateUrl: './registro-especialista.component.html',
  styleUrls: ['./registro-especialista.component.scss']
})
export class RegistroEspecialistaComponent implements OnInit {
  public formulario!: FormGroup;
  imagenUno:any;
  tipo:any
  admin=false;
  constructor(private frB:FormBuilder,
              private service :EspecialistasService,
              private authServese:AuthService
    ) { }
  especialidades!: Especialidad[];
  checkArray:any = [];
    foto='';

  ngOnInit(): void {
 this.tipo=localStorage.getItem('tipo');
    if(this.tipo==='admin'){
      this.admin=true;
    }else{
      this.admin=false;
    }
    this.service.getEspecialidades().subscribe((especialidad:Especialidad[])=>{
      this.especialidades=especialidad;
    })




    this.formulario = this.frB.group( {
      'nombre': ['', [Validators.required]],
      'apellido': ['', Validators.required],
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'dni': ['', [Validators.required,  Validators.pattern("^[0-9]*$"), Validators.maxLength(9),Validators.minLength(8) ]],
      'foto': ['', [Validators.required]],
      'password': ['', [Validators.required,Validators.minLength(6)]],
      'email': ['', [Validators.required,Validators.email]],
      'especialidades':['', [Validators.required]],
    });
  }


  caputurarRadioEspecialidad(event: any){
      if(event.target.checked){
        this.checkArray.push(event.target.value);
        this.formulario.get('especialidades')?.setValue(JSON.parse(JSON.stringify(this.checkArray)));
        console.log(this.checkArray)
      }else{
        for (let i = 0; i < this.checkArray.length; i++) {
            if(event.target.value===this.checkArray[i]){
              this.checkArray.splice(i);
              break;
            }else{
              console.log("no lo es");
            }

        }
        console.log(this.checkArray);
      }
  }






  cargarEspecialidad(){
    Swal.fire({
      title: 'Ingrese la nueva especialidad',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'aceptar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if(result.value!=='' && result.isConfirmed){
        const especi=new Especialidad();
        especi.nombre=result.value;
        this.especialidades.push(especi);
        Swal.fire({
          title: "agregado perfecto",
          icon:'success'

        })
        console.log(this.especialidades);
        //this.service.AddEspecialidades(especi);
      }
      else {
        Swal.fire({
          title:"No se pudo agregar",
          icon:'error'
        })
      }
    })



  }

  subirArchivo(event:any){
    const path ="Pacientes/"+this.formulario.value.email + "_Uno";
    this.service.subirArchivo(event.target.value,path)
    timer(3000).subscribe(()=>{
      this.service.traerArchivo(path).subscribe(url=>{
        this.imagenUno=url;
        console.log(url);
      });
    });
}


  crearEspecialista(){
    const especial= new Especialistas(
      this.formulario.value.nombre,
      this.formulario.value.apellido,
      this.formulario.value.edad,
      this.formulario.value.dni,
      this.imagenUno, //archivo
      this.checkArray,
      this.formulario.value.email,
      this.formulario.value.password,
      false);

    return especial

  }
  aceptar(): void {
    const especialista=this.crearEspecialista();
    this.authServese.register(especialista).catch(error=>{
      if(error.code==='auth/email-already-in-use'){
        this.mensajeError("El email con el que quiere ingresar ya esta en la base de datos");
        this.formulario.reset();
      }
    });
  }

  mensajeError(texto: string){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text:texto,
    });
  }

}
