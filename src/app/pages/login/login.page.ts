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
  }

  validar() {
    if (this.nombre.includes('@duocuc.cl') && this.nombre === 'a@duocuc.cl' && this.password === '123') {
      console.log("Bienvenido");
      localStorage.setItem("usuario", this.nombre);
      this.navCtrl.navigateForward(['/home']);
    } else {
      console.log("Usuario/Password Incorrecto");
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Login',
      subHeader: 'Acceso al sistema agenda',
      message: 'Usuario o password incorrecto',
      buttons: ['Action'],
    });

    await alert.present();
  }
}
