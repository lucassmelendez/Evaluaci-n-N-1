import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-env-correo',
  templateUrl: './env-correo.page.html',
  styleUrls: ['./env-correo.page.scss'],
})
export class EnvCorreoPage implements OnInit {

  correo: string = '';

  constructor(
    private router: Router,
    public navCtrl: NavController,
    private alertController: AlertController
  ) { }
  ngOnInit() {}


  validarCorreo(correo: string): boolean {
    const formatoCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formatoCorreo.test(correo)) {
      return false;
    }


    const dominioValido = correo.endsWith('@duocuc.cl') || correo.endsWith('@profesor.duoc.cl');
    return dominioValido;
  }

  async EnviarCodigo() {

    if (!this.correo || !this.validarCorreo(this.correo)) {
      await this.showAlert('Error', 'Debes ingresar un correo válido con un dominio de DuocUC o Profesor Duoc.');
      return;
    }

    localStorage.setItem('enviar-codigo', JSON.stringify({
      correo: this.correo,
    }));

    this.router.navigate(['/confirm-code']);
  }

  volver() {
    this.navCtrl.back();
  }


  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
