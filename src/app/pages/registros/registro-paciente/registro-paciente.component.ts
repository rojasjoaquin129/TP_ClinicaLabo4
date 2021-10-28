import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { timer } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Pacientes } from 'src/app/classes/pasientes';
import { AuthService } from 'src/app/service/auth.service';
import { EspecialistasService } from 'src/app/service/especialistas.service';
import Swal from 'sweetalert2'
import { RecaptchaErrorParameters } from 'ng-recaptcha';
@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.scss']
})
export class RegistroPacienteComponent implements OnInit {
  public formulario!: FormGroup;
  imagenUno:any;
  imagenDos:any;
  tipo:any;
  admin=false;
  basePath = '/Pacientes';
  constructor(private frB :FormBuilder ,
     private storage : EspecialistasService,
     private authServis :AuthService) { }

  ngOnInit(): void {
    this.tipo=localStorage.getItem('tipo');
    if(this.tipo==='admin'){
      this.admin=true;
    }else{
      this.admin=false;
    }
    this.formulario = this.frB.group( {
      'nombre': ['', [Validators.required]],
      'apellido': ['', Validators.required],
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'dni': ['', [Validators.required,  Validators.pattern("^[0-9]*$"), Validators.maxLength(10) ]],
      'password': ['', [Validators.required,Validators.minLength(6)]],
      'email': ['', [Validators.required,Validators.email]],
      'foto': ['', Validators.required],
      'fotoDos': ['', Validators.required],
      'obraSocial': ['', Validators.required],
    });
  }

  subirArchivo(event:any){
    let file=event.target.files[0];
    let nombre=this.formulario.value.dni+'uno'+file.name;
    const filePath = `${this.basePath}/${nombre}`;
    this.storage.subirArchivo(file,filePath)
    timer(3000).subscribe(()=>{
      this.storage.traerArchivo(filePath).subscribe(url=>{
        this.imagenUno=url;
        console.log(url);
      });
    });
}
subirArchivoDos(event:any){
  let file=event.target.files[0];
  let nombre=this.formulario.value.dni+'dos'+file.name;
  const filePath = `${this.basePath}/${nombre}`;
  this.storage.subirArchivo(file,filePath)
  timer(3000).subscribe(()=>{
    this.storage.traerArchivo(filePath).subscribe(url=>{
      this.imagenDos=url;
      console.log(url);
    });
  })

}


  crearPaciente(){
    const paciente:any={
      nombre:this.formulario.value.nombre,
      apellido:this.formulario.value.apellido,
      edad:this.formulario.value.edad,
      dni:this.formulario.value.dni,
      fotoUno:this.imagenUno,
      fotoDos:this.imagenDos,
      obraSocial:this.formulario.value.obraSocial,
      mail:this.formulario.value.email,
      pass:this.formulario.value.password
    };
    console.log(paciente);
    return paciente;
  }

  public resolved(captchaResponse: any): void {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  public onError(errorDetails: any): void {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }
  aceptar(){
    const paciente=this.crearPaciente();
    console.log(paciente);
    this.authServis.register(paciente).catch(error=>{
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
