import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Administradores } from '../classes/Administradores';
import { Especialidad } from '../classes/especialidades';
import { Especialistas } from '../classes/especialistas';
import { Pacientes } from '../classes/pasientes';
import { Usuario } from '../classes/usuario';
import Swal from 'sweetalert2'
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public listaEspecialista:Especialistas[]=[];
  public listaPacientes:Pacientes[]=[];
  public listaAdministradores:Administradores[]=[];
  usuario:any;
  tipo:any;
  public usuarioEntero:any;
  PacientesRef:AngularFirestoreCollection<Pacientes>;
  EspecialistasRef:AngularFirestoreCollection<Especialidad>;
  AdministradoresRef:AngularFirestoreCollection<Administradores>;
  constructor(public afAuth: AngularFireAuth ,
              private router:Router,
              public db:AngularFirestore,
              public storange: AngularFireStorage) {


                this.AdministradoresRef=this.db.collection('administradores');
                this.EspecialistasRef=this.db.collection('especialistas');
                this.PacientesRef=this.db.collection('paciente');

                this.traerTodoEspecialista().subscribe( usuarios=>this.listaEspecialista=usuarios);
                this.traerTodoPacientes().subscribe(usuario=>this.listaPacientes=usuario);
                this.traerTodoAdmin().subscribe(usuario=>this.listaAdministradores=usuario);
                this.afAuth.authState.subscribe((user:any)=>{
                  if(user){
                    this.usuarioEntero=user._delegate.email;
                    console.log(this.usuarioEntero);
                  }
                });
   }

   public singIn(email:string,password:string){
    return this.afAuth.signInWithEmailAndPassword(email,password);

  }


  extraerUsuario(email:string){
    if(this.SiEsUsuario(email,this.listaEspecialista)){
      this.usuario=this.chequearEspecialista(email);
      this.tipo='especialista';
    }else if(this.SiEsUsuario(email,this.listaPacientes)){
      this.usuario=this.TraerUsuario(email,this.listaPacientes);
      this.tipo='paciente';
    }else{
      this.usuario=this.TraerUsuario(email,this.listaAdministradores);
      this.tipo='admin';
    }
  }

  traerTodoPaciente(){
    return this.listaPacientes;
  }
  getEspecialistas(){
    return this.EspecialistasRef.snapshotChanges();
  }
  getEspecialista(id:string) : Observable<any>{
    return this.EspecialistasRef.doc(id).snapshotChanges();
  }
  actualizarEspecialista(id:string,data:Especialistas){
    return this.EspecialistasRef.doc(id).update(data);
  }
  TraerUsuario(email:string ,ListaUsuario:any){
    let usuario
    for (let i = 0; i < ListaUsuario.length; i++) {
      if(ListaUsuario[i].mail===email){
        usuario=ListaUsuario[i];
      }

    }
    return usuario;
  }

  SiEsUsuario(email:string,listaUsuario:any){
    let estaEnLista=false;
    for (let i = 0; i < listaUsuario.length; i++) {
      if(listaUsuario[i].mail===email){
        estaEnLista=true;
      }

    }
    return estaEnLista;
  }


   async register(nuevoUsuario:Especialistas| Pacientes|Administradores){
    return this.afAuth.createUserWithEmailAndPassword(nuevoUsuario.mail,nuevoUsuario.pass).then(userRef=>{
        if('especialidad' in nuevoUsuario){
          this.addEspecialista(nuevoUsuario);
        }else if('obraSocial' in nuevoUsuario){
          this.addPaciente(nuevoUsuario);
        }else{
          this.addAdministrador(nuevoUsuario);
        }
        userRef.user?.sendEmailVerification().then(()=>{
          let tipo=localStorage.getItem('tipo');
          if(tipo==='admin'){
            this.mensajeAprobado('ya cargo el usaurio ');
            this.router.navigate(['registro']);
          }else{
            this.mensajeAprobado('verificar email y si usted es especialsita esperar la aprobacion del Administrador');
            this.router.navigate(['']);
          }
        });


      }
    )


  }

  async sendVerificationEmail() :Promise<void>{
    return (await this.afAuth.currentUser)?.sendEmailVerification();
  }
  SiEsEspecialista(email:string){
    let flag=false;
    for (let i = 0; i < this.listaEspecialista.length; i++) {
      if(this.listaEspecialista[i].mail===email){
        flag=true;
      }
    }
    return flag;
  }

  traerTodoAdmin(){
    return this.AdministradoresRef.valueChanges() as Observable<Administradores[]>
  }
  traerTodoPacientes(){
    return this.PacientesRef.valueChanges() as Observable<Pacientes[]>;
  }
  traerTodoEspecialista(){
    return this.EspecialistasRef.valueChanges()as Observable<Especialistas[]>;
    }

   chequearEspecialista(email:string , bandera?:string){
    let especialista
     for (let i = 0; i < this.listaEspecialista.length; i++) {
       if(this.listaEspecialista[i].mail===email){
        especialista=this.listaEspecialista[i];
       }
     }
     return especialista;
   }


  addEspecialista(especialista:Especialistas){
    this.EspecialistasRef.add({...especialista});
  }

  addPaciente(paciente:Pacientes){
    this.PacientesRef.add({...paciente});
  }

  addAdministrador(administrador:Administradores){
    this.AdministradoresRef.add({...administrador});
  }

  mensajeAprobado(text:string){
    Swal.fire({
      title: "Usuario Registrado",
      icon:'success',
      titleText:text

    });
  }

  public singOut(){
    return this.afAuth.signOut();
  }


  subirImagen(ruta: string, data: any){
    return this.storange.ref(ruta).putString(data,'data_url').then(datas =>{
       datas.ref.getDownloadURL().then(x => x);
    });
  }

}
