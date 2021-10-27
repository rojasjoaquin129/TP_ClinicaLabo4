import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Especialistas } from 'src/app/classes/especialistas';
import { Usuario } from 'src/app/classes/usuario';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public user:any;
  public usuario: any ;
  public tipo:any;
  public nombre:any
  constructor(
    private authServise:AuthService,
    private router:Router
  ) {

    }


  ngOnInit(): void {

  this.usuario=JSON.parse(localStorage.getItem('usuario') as string) ;
  this.tipo=localStorage.getItem('tipo');
  console.log(this.tipo);
  this.nombre= this.usuario.nombre+" "+this.usuario.apellido;
  }




  public logOut() {
    this.authServise.singOut().then(()=>{
      localStorage.clear();
      this.router.navigate(['']);
    })
  }
}
