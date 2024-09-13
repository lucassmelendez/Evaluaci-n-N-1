import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';  // Adaptado al HTML para usar "email" en lugar de "nombre"
  password: string = '';

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

  async validar() {
    // Verificar credenciales de la cuenta específica del profesor
    if (this.email === 'p@profesor.duoc.cl' && this.password === '123') {
      localStorage.setItem("tipoUsuario", 'profesor');
      await this.showAlert('Bienvenido Profesor', 'Has ingresado correctamente');
      this.navCtrl.navigateForward(['/home-profe']);
      return;  // Salir del método para evitar verificaciones adicionales
    }

    // Obtener el valor de 'usuario' de localStorage
    const usuarioData = localStorage.getItem('usuario');

    // Verificar si 'usuarioData' es nulo o vacío antes de hacer JSON.parse
    if (usuarioData) {
      const usuario = JSON.parse(usuarioData);

      // Verificar el correo y la contraseña
      if (this.email === usuario.correo && this.password === usuario.password) {
        let tipoUsuario = '';

        // Identificar si es alumno o profesor (solo verificamos dominios de correo específicos)
        if (this.email.includes('@duocuc.cl')) {
          tipoUsuario = 'alumno';
          localStorage.setItem("tipoUsuario", tipoUsuario);
          await this.showAlert('Bienvenido Alumno', 'Has ingresado correctamente');
          this.navCtrl.navigateForward(['/home-alumno']);
        } else if (this.email.includes('@profesor.duoc.cl')) {
          tipoUsuario = 'profesor';
          localStorage.setItem("tipoUsuario", tipoUsuario);
          await this.showAlert('Bienvenido Profesor', 'Has ingresado correctamente');
          this.navCtrl.navigateForward(['/home-profe']);
        }

        // Guardar el correo del usuario en localStorage
        localStorage.setItem("usuario", usuario.correo);
      } else {
        await this.presentAlert('Usuario o password incorrecto');
      }
    } else {
      // Si no hay datos en localStorage, mostrar un mensaje de error
      await this.presentAlert('No hay registros de usuario. Regístrate primero.');
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
      subHeader: '',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
