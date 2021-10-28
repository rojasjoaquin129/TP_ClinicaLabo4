import { Especialistas } from "./especialistas";
import { Pacientes } from "./pasientes";

export class Turno{
  id?:string;
  dia?:string;
  especialidad?:string;
  estado?:string;
  especialista?:Especialistas;
  paciente?:Pacientes;
  razonCancelacion?:string;
  razonRechazar?:string;
  Terminado?:string|Date;
  diagnostico?:string;

}
