import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


 public usuario = new Usuario();
  public mostrarError = false;

  constructor(private router: Router,
   // private authService:AuthService
   ) { }

  ngOnInit(): void {
  }

  public ingresar() {
    Swal.fire({
      icon: 'error',
      title: 'no tengo la instalacion echa de firebase',
      text: 'solo esta maquetado , perdon pero me lastime la mano hace dos dias :(',
      footer: '<a href="">Why do I have this issue?</a>'
    })
    this.mostrarError=true;
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
