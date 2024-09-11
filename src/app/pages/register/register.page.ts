import { LoginPage } from './../login/login.page';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router,
    public navCtrl: NavController,) { }
  
  nombre:string=''
  apellido:String=''
  edad:number;
  correo:string=''
  password:string=''
  password2:string=''

  ngOnInit() {
  }

  registrar() {
    if (this.password !== this.password2) {
      console.error('Las contraseñas no coinciden');
      return;
    }
    localStorage.setItem('usuario', JSON.stringify({
      nombre: this.nombre,
      apellido: this.apellido,
      edad: this.edad,
      correo: this.correo,
      password: this.password
    }));
    console.log('Registro exitoso');
    this.navCtrl.navigateForward('/login'); 
  }

  volver() {
    this.navCtrl.navigateBack('/login');
  }
}
