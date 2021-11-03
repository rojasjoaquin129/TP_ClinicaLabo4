import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { Administradores } from 'src/app/classes/Administradores';
import { AuthService } from 'src/app/service/auth.service';
import { EspecialistasService } from 'src/app/service/especialistas.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.scss']
})
export class RegistroAdminComponent implements OnInit {
  public formulario!: FormGroup;
  imagenUno:any;
  basePath = '/Admin'
  constructor(
    private frB :FormBuilder,
    private service: EspecialistasService,
    private authServese:AuthService) { }

  ngOnInit(): void {
    this.formulario = this.frB.group( {
      'nombre': ['', [Validators.required]],
      'apellido': ['', Validators.required],
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'dni': ['', [Validators.required,  Validators.pattern("^[0-9]*$"), Validators.maxLength(9),Validators.minLength(8) ]],
      'foto': ['', [Validators.required]],
      'password': ['', [Validators.required,Validators.minLength(6)]],
      'email': ['', [Validators.required,Validators.email]]

    });
  }


subirArchivo(event:any){
  let file=event.target.files[0];
  let nombre=this.formulario.value.dni+file.name;
  const filePath = `${this.basePath}/${nombre}`;
  this.service.subirArchivo(file,filePath);
  timer(3000).subscribe(()=>{
    this.service.traerArchivo(filePath).subscribe(url=>{
      this.imagenUno=url;
      console.log(url);
    });
  });
}
/*
this.nombre = n;
      this.apellido = ln;
      this.edad = a;
      this.dni = d;
      this.fotoUno = po;
      this.mail = m;
      this.pass = p;
*/
  crearAdmin(){
    const admin= new Administradores(
      this.formulario.value.nombre,
      this.formulario.value.apellido,
      this.formulario.value.edad,
      this.formulario.value.dni,
      this.imagenUno, //archivo
      this.formulario.value.email,
      this.formulario.value.password);
      return admin;
  }


  aceptar( ){
    const admin=this.crearAdmin();
    this.authServese.register(admin).catch(error=>{
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
