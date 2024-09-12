import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.page.html',
  styleUrls: ['./confirm-code.page.scss'],
})
export class ConfirmCodePage implements OnInit {

  codigo: string = '';
  password: string = '';
  password2: string = '';

  constructor(
    private router: Router,
    public navCtrl: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  async EnviarCodigo() {
    if (this.password !== this.password2) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      console.log('Contraseña cambiada correctamente');
      const successAlert = await this.alertController.create({
        header: 'Éxito',
        message: 'La contraseña se ha cambiado correctamente',
        buttons: ['OK']
      });
      await successAlert.present();
      this.router.navigate(['/login']);
    }
    localStorage.setItem('cambio-contraseña', JSON.stringify({
      password: this.password2,
    }));
  }

  goBack() {
    this.navCtrl.back();
  }
}
