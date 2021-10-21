import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-registro-especialista',
  templateUrl: './registro-especialista.component.html',
  styleUrls: ['./registro-especialista.component.scss']
})
export class RegistroEspecialistaComponent implements OnInit {
  public formulario!: FormGroup;
  constructor(private frB:FormBuilder) { }
  especialidades:string[]=[];
  ngOnInit(): void {

    this.formulario = this.frB.group( {
      'nombre': ['', [Validators.required]],
      'apellido': ['', Validators.required],
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'telefono': ['', [Validators.required,  Validators.pattern("^[0-9]*$"), Validators.maxLength(10) ]],
      'juego': ['', [Validators.required]],
      'puntuacion': ['', [Validators.required]],
      'opinion': ['', [Validators.required]],
      'terminos': ['', Validators.required],
    });
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

      this.especialidades.push(result.value);
      console.log(this.especialidades);
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url
        })
      }
    })



  }

  aceptar(): void {}
}
