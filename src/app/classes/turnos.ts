import { StringMap } from "@angular/compiler/src/compiler_facade_interface";
import { Especialistas } from "./especialistas";
import { Pacientes } from "./pasientes";

export class Turno{
  id?:string;
  dia!:string;
  especialidad?:string;
  estado?:string;
  especialista?:Especialistas;
  paciente?:Pacientes|Especialistas| null;
  razonCancelacion?:string;
  razonRechazar?:string;
  comentarioCompleto?:string;
  encuestado?:boolean;
  calificado?:boolean;
  Terminado!:string|Date|number;
  diagnostico?:string;
  pasienteInfo?:{
    altura:number;
    peso:number;
    temperatura:number;
    presion:{
      precionAlta:number;
      precionBaja:number;

    }
  }
}
