import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
email: any;
  
  constructor(private alertController: AlertController,
    private navCtrl: NavController
  ) { }

  nombre:string=''
  password:string=''

  ngOnInit() {
    const tipoUsuario = localStorage.getItem('tipoUsuario');
  }

  validar() {
    if (this.nombre.includes('@duocuc.cl') && this.nombre === 'a@duocuc.cl' && this.password === '123') {
      console.log("Bienvenido Alumno");
      localStorage.setItem("usuario", this.nombre);
      localStorage.setItem("tipoUsuario", "alumno"); 
      this.navCtrl.navigateForward(['/home-alumno']); 
    } else if (this.nombre.includes('@profesor.duoc.cl') && this.nombre === 'p@profesor.duoc.cl' && this.password === '123') {
      console.log("Bienvenido Profesor");
      localStorage.setItem("usuario", this.nombre);
      localStorage.setItem("tipoUsuario", "profesor"); 
      this.navCtrl.navigateForward(['/home-profe']);
    } else {
      console.log("Usuario/Password Incorrecto");
      this.presentAlert();
    }
  }
  
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Login',
      subHeader: '',
      message: 'Usuario o password incorrecto',
      buttons: ['Action'],
    });

    await alert.present();
  }
}
