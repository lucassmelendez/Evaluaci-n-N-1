import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  nombre: string = '';
  apellido: string = '';
  edad: number;
  correo: string = '';
  password: string = '';
  password2: string = '';

  constructor(private router: Router,
              public navCtrl: NavController,
              private alertController: AlertController) { }

  ngOnInit() {}

  async registrar() {
    // Validaciones de negocio
    if (!this.nombre.trim()||this.nombre.length<=3) {
      await this.showAlert('Error', 'El nombre no es valido (3 caracteres o más)');
      return;
    }

    if (!this.apellido.trim()||this.apellido.length<=3) {
      await this.showAlert('Error', 'El apellido no es valido (3 caracteres o más)');
      return;
    }

    if (!this.edad || this.edad < 16) {
      await this.showAlert('Error', 'La edad igresada debe ser de +17');
      return;
    }

    if (!this.correo || !this.validarCorreo(this.correo)) {
      await this.showAlert('Error', 'Debes ingresar un correo válido con un dominio de DuocUC');
      return;
    }

    if (!this.password || this.password.length <= 3) {
      await this.showAlert('Error', 'La contraseña debe tener al menos 3 caracteres');
      return;
    }

    if (this.password !== this.password2) {
      await this.showAlert('Error', 'Las contraseñas no coinciden');
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

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  validarCorreo(correo: string): boolean {
  
    const formatoCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formatoCorreo.test(correo)) {
      return false; 
    }

    const dominioValido = correo.endsWith('@duocuc.cl') || correo.endsWith('@profesor.duoc.cl');
    return dominioValido;
  }
}