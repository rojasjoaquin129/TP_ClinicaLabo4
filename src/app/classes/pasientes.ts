export class Pacientes {
  public nombre;
  public apellido;
  public edad;
  public dni;
  public fotoUno;
  public fotoDos;
  public obraSocial;
  public mail;
  public pass;




  constructor(n:string,ln:string,a:number,d:string,po:string,pt:string,os:string,m:string,p:string){
      this.nombre = n;
      this.apellido = ln;
      this.edad = a;
      this.dni = d;
      this.fotoUno = po;
      this.fotoDos = pt;
      this.obraSocial = os;
      this.mail = m;
      this.pass = p;
  }
}
