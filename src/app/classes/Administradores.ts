export class Administradores {
  public nombre ;
  public apellido;
  public edad;
  public dni;
  public fotoUno;
  public mail;
  public pass;


  constructor(n:string,ln:string,a:string,d:string,po:string,m:string,p:string){
      this.nombre = n;
      this.apellido = ln;
      this.edad = a;
      this.dni = d;
      this.fotoUno = po;
      this.mail = m;
      this.pass = p;

  }
}
