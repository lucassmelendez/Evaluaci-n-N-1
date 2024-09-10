import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.page.html',
  styleUrls: ['./informe.page.scss'],
})
export class InformePage implements OnInit {

  students = [
    { name: 'Juan Pérez', attendance: 0 },
    { name: 'María García', attendance: 0 },
    { name: 'Pedro López', attendance: 78 },
    { name: 'Ana Martínez', attendance: 95 },
    { name: 'Luis Hernández', attendance: 80 },
    { name: 'Fransicso Silva', attendance: 30 },
    { name: 'Hector Alveal', attendance: 90 },
    { name: 'Omar Alveal', attendance: 78 },
    { name: 'Benjamin Alveak', attendance: 95 },
    { name: 'Pedro Ahumada', attendance: 80 },
    { name: 'Benjamin Bahamondes', attendance: 100 },
    { name: 'Ignacio Urrutia', attendance: 90 },
    { name: 'Kristal Huribe', attendance: 78 },
    { name: 'Alan gajardo', attendance: 95 },
    { name: 'Diego Plaza', attendance: 40 },
    { name: 'Matias Recabarren', attendance: 85 },
    { name: 'Alonso Gonzales', attendance: 10 },
    { name: 'Sebastian Piñera', attendance: 78 },
    { name: 'Maria Jose', attendance: 95 },
    { name: 'Jose Maria', attendance: 80 },
  ];

  constructor(private alertCtrl:AlertController) {}

  ngOnInit() {   
  }
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'A Short Title Is Best',
      subHeader: 'A Sub Header Is Optional',
      message: 'A message should be a short, complete sentence.',
      buttons: ['Action'],
    });

    await alert.present();
  }
}

