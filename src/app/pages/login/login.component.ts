import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { AuthService } from 'src/app/service/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { toRelativeImport } from '@angular/compiler-cli/src/ngtsc/file_system';
import{trigger,style,transition,animate, state} from'@angular/animations'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations:[
    trigger('yendo',[
      state('void',style({
        transform:'translateY(-100%)',
        opacity:0
      })),
      transition(':enter',[
        animate(1500,style({
          transform:'translateY(0)',
          opacity:1
        }))
      ])
    ]),
    trigger('viniendo',[
      state('void',style({
        transform:'translateX(200%)',
        opacity:0
      })),
      transition(':enter',[
        animate(1500,style({
          transform:'translateY(0)',
          opacity:1
        }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  loginFrom:FormGroup;
  public email=new FormControl('',[Validators.required,Validators.email]);
  public password=new FormControl('',[Validators.required,Validators.minLength(6)]);
  public usuario = new Usuario();
  public mostrarError = false;

  constructor(private router: Router,
    private fb:FormBuilder,
    private authService: AuthService,
    private db: AngularFirestore
   ) {

     this.loginFrom=this.fb.group({
       email:this.email,
       password:this.password
     });
     this.loginFrom.reset();
    }

  ngOnInit(): void {

  }
  /*
  especialistaUno@especialista.com
  EspecilistaDos@especialista.com
  pacienteTres@paciente.com
  pacienteDos@paciente.com
  pacienteUno@paciente.com
  */



  verificarEmail(email:string){
  let flag=false;
  if(email==='pacienteUno@paciente.com' ||email==='pacienteDos@paciente.com' || email==='pacienteTres@paciente.com'
  ||email==='especilistaDos@especialista.com'||email==='especilistaUno@especialista.com'||email==='admin@admin.com' ){
    flag =true;

  }
  return flag
  }

  acceder(usuario:string){
    let email;
    switch (usuario) {
      case 'pacienteUno' :
        email="pacienteUno@paciente.com";
        break;
      case 'pacienteDos' :
        email="pacienteDos@paciente.com";
      break;
      case 'pacienteTres' :
        email="pacienteTres@paciente.com";
      break;
      case 'especialistaUno' :
        email="especilistaUno@especialista.com";
      break;
      case 'especialistaDos' :
        email="especilistaDos@especialista.com";
      break;
      case 'admin':
        email="admin@admin.com"
      break;
    }
    this.loginFrom.setValue({
      email:email?.toString(),
      password:"vagovago"
    });
  }

  async  ingresar() {
   let flag=false;


    const{email,password}=this.loginFrom.value;
    let usuario=this.authService.extraerUsuario(email);
    localStorage.setItem('usuario',JSON.stringify(usuario));
    localStorage.setItem('tipo',this.authService.tipo);
    if(!this.verificarEmail(email)){
      this.authService.singIn(email,password).then(user=>{
        if(localStorage.getItem('tipo')==='especialista'){
          if(user.user?.emailVerified && usuario.enabled){

            this.router.navigate(['home']);

          }else{
            this.mensajeError('Especialista no  valido su email o no lo verifico el administrador');
            this.loginFrom.reset();
          }
        }else{
          if(user.user?.emailVerified){

            this.router.navigate(['home']);
          }else{
            this.mensajeError('no valido su email');
            this.loginFrom.reset();
          }
        }
      }).catch(
        error=>{
          this.mostrarError=true;
          if(error.code==='auth/wrong-password'){
            this.mensajeError('La contraseña es incorrecta con ese correo');
            this.loginFrom.reset();
          }else if(error.code==='auth/user-not-found'){
            this.mensajeError('El usuario no esta Autenticado ni en la base de datos ');
            this.loginFrom.reset();
          }
        }
      );
    }else {
        if(localStorage.getItem('tipo')==='especialista'){
            if(usuario.enabled){
              flag=true;
            }else{
              this.mensajeError('no tiene la verificacion del administrador');
              }
        }else{
          flag=true;
          }
    }
    if(flag){
      this.authService.singIn(email,password);
      this.router.navigate(['home']);
    }


  }

  mensajeError(texto: string){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text:texto,
    });
  }
  limpiar() {
    this.loginFrom.setValue({
      email:'',
      password:''
    });

  }



    // this.authService.singIn(this.usuario).then(
    //   usuario=>{
    //     this.authService.estaLogeado=true;
    //   console.log(usuario);
    //   this.router.navigate(['home']);
    //   }
    // ).catch(
    //   error=>{
    //     this.mostrarError=true;
    //     console.log(error);
    //   }

    // )



}
