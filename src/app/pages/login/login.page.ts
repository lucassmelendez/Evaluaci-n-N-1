// login.page.ts
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, MenuController } from '@ionic/angular';
import { PersonasService } from 'src/app/servicios/personas.service';
import { Alumno } from 'src/app/model/alumno';
import { Profesor } from 'src/app/model/profesor';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  alumno: Alumno = { nombre: '', apellido: '', edad: 0, correo: '', password: '', password2: '' };
  profesor: Profesor = { nombre: '', apellido: '', edad: 0, correo: '', password: '', password2: '', curso: '' };

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private cp: PersonasService
  ) {}

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  async validar() {
    try {
      const usuario = await this.cp.login(this.alumno.correo || this.profesor.correo, 
                                           this.alumno.password || this.profesor.password);

      if (usuario) {
        if ('curso' in usuario) {
          await this.showAlert('Bienvenido Profesor', 'Has ingresado correctamente');
          this.navCtrl.navigateForward(['/home-profe']);
        } else {
          await this.showAlert('Bienvenido Alumno', 'Has ingresado correctamente');
          this.navCtrl.navigateForward(['/home-alumno']);
        }
        this.menuCtrl.enable(true);
      } else {
        await this.presentAlert('Usuario o contraseña incorrecto');
      }
    } catch (error) {
      console.error("Error en la validación:", error);
      await this.presentAlert('Ocurrió un error al iniciar sesión.');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Login',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
