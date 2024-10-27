import { Component } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PersonasService } from './servicios/personas.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  login:boolean=false;

  constructor(
    private modalController: ModalController,
    public alertController: AlertController,
    public navCtrl: NavController,
    private menu: MenuController,
    private router: Router,
    private cp: PersonasService) {
  }

  async salir() {
    const alert = await this.alertController.create({
      header: 'Salir',
      message: '¿Quieres salir?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Sí',
          handler: () => {
            localStorage.removeItem('usuario');
            localStorage.removeItem('tipoUsuario');
            
            this.navCtrl.navigateRoot('/login');
            this.menu.enable(false);
            this.menu.close(); 
          }
        }
      ]
    });
  
    await alert.present();
  }

  volver() {
    if (this.router.url == '/home-profe' || this.router.url == '/home-alumno') {
      this.menu.close()
    }else{
      this.navCtrl.back();
      this.menu.close();
    }                                                                                                                                                 
  }                                                                                                                                                 

  async navigateAndClose(route: string) {
    this.menu.close('main').then(async () => {
      const email = localStorage.getItem('usuario'); // Obtiene el correo del usuario de localStorage
      let usuario = null;
  
      if (email) {
        usuario = await this.cp.getUsuarioActual(email); // Pasa el correo al método
      }
  
      if (route === '/home') {
        if (usuario) {
          if ('curso' in usuario) {
            this.router.navigate(['/home-profe']);
          } else {
            this.router.navigate(['/home-alumno']);
          }
        } else {
          console.error('Tipo de usuario no encontrado');
          this.router.navigate(['/login']);
        }
      } else {
        this.router.navigate([route]);
      }
    });
  }
}