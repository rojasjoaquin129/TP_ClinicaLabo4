import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.scss']
})
export class RegistroPacienteComponent implements OnInit {
  public formulario!: FormGroup;
  constructor(private frB :FormBuilder) { }

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
  aceptar(){

  }
}
