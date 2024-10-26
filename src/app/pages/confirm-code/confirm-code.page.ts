import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { PersonasService } from 'src/app/servicios/personas.service'; 
@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.page.html',
  styleUrls: ['./confirm-code.page.scss'],
})
export class ConfirmCodePage implements OnInit {

  codigo: string = '123';
  password: string = '';
  password2: string = '';
  correo: string = ''; 

  constructor(
    private router: Router,
    public navCtrl: NavController,
    private alertController: AlertController,
    private personasService: PersonasService 
  ) {}

  ngOnInit() {
    
    const data = JSON.parse(localStorage.getItem('enviar-codigo') || '{}');
    this.correo = data.correo;
  }

  async EnviarCodigo() {
    if (!this.codigo || this.codigo.trim() === '') {
      await this.showAlert('Error', 'Ingrese un código');
      return;
    } else if (!this.password || this.password.trim() === '') {
      await this.showAlert('Error', 'Ingrese una nueva contraseña');
      return;
    } else if (!this.password2 || this.password2.trim() === '') {
      await this.showAlert('Error', 'Repite la nueva contraseña');
      return;
    } else if (this.password !== this.password2) {
      await this.showAlert('Error', 'Las contraseñas no coinciden');
      return;
    }

    

    
    const existeCorreo = await this.personasService.verificar_correo(this.correo);
    if (existeCorreo) {
      await this.personasService.modificarPassword(this.correo, this.password, this.password2);
      await this.showAlert('Éxito', 'La contraseña se ha cambiado correctamente');
      this.navCtrl.navigateForward(['/login']);
    } else {
      await this.showAlert('Error', 'El correo no está registrado.');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  goBack() {
    this.navCtrl.back();
  }
}
