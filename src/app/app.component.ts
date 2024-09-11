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

  async salir(){
    const alert = await this.alertController.create({
      header: 'Salir',
      message: 'Quieres salir?',
      buttons: [
        {
          text: 'No',
          handler: () => {

          }
        },{
          text: 'Si',
          handler: () =>{
            this.navCtrl.navigateRoot('login');
            this.menu.close()
          }
        }
      ]
    });

    await alert.present();

  }

  goBack() {
    if (this.router.url == '/home') {
      this.menu.close()
    }else{
      this.navCtrl.back();
      this.menu.close();
  }                                                                                                                                                 
}                                                                                                                                                 

  navigateAndClose(route: string) {
    this.menu.close('main').then(() => {
      this.router.navigate([route]);
      this.menu.close()
    });
  }
}