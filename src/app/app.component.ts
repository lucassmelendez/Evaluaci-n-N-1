import { Component } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  login:boolean=false;

  constructor(private modalController: ModalController,
    public alertController: AlertController,
    public navCtrl: NavController,
    private menu: MenuController,
    private router: Router) {
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
            // Acción en caso de que el usuario elija no salir
          }
        },
        {
          text: 'Sí',
          handler: () => {
            // Limpia los datos de autenticación en localStorage
            localStorage.removeItem('usuario');
            localStorage.removeItem('tipoUsuario');
            
            // Redirige al login y cierra el menú
            this.navCtrl.navigateRoot('/login');
            this.menu.close();  // Asegúrate de que `this.menu` está correctamente definido e inyectado
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

  navigateAndClose(route: string) {
    this.menu.close('main').then(() => {
      const tipoUsuario = localStorage.getItem('tipoUsuario');

      if (route === '/home') {
        if (tipoUsuario === 'alumno') {
          this.menu.close();
          this.router.navigate(['/home-alumno']);
        } else if (tipoUsuario === 'profesor') {
          this.menu.close();
          this.router.navigate(['/home-profe']);
        } else {
          console.error('Tipo de usuario no encontrado');
          this.router.navigate(['/login']);
       }
     } else {
        this.menu.close();
        this.router.navigate([route]);
     }
    });
  }
}