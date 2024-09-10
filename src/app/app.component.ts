import { Component } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  login:boolean=false;

  constructor(private modalController: ModalController,
    public alertController: AlertController,
    public navCtrl: NavController,) {
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
          }
        }
      ]
    });

    await alert.present();
  
  }

  goBack() {
    this.navCtrl.back();
  }

}