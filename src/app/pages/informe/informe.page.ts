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

  constructor(private alertController: AlertController) {}

  ngOnInit() {   
  }
  public alertButtons = [
    {
      text: 'PDF',
      role: 'pdf',
      handler: () => {
        this.mostrarPDF('Has seleccionado PDF');
      },
    },
    {
      text: 'XLS',
      role: 'xls',
      handler: () => {
        this.mostrarXLS('Has seleccionado XLS');
      },
    },
    {
      text: 'CANCELAR',
      role: 'cancel',
      handler: () => {
        console.log('cancelar')
      },
    },
  ];

  async alertaPDF() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Descarga en formato PDF exitosa',
      buttons: ['OK'],
    });
    await alert.present();
  }

  mostrarPDF(message: string) {
    this.alertaPDF();
  }

  async alertaXLS() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Descarga en formato XLS exitosa',
      buttons: ['OK'],
    });
    await alert.present();
  }

  mostrarXLS(message: string) {
    this.alertaXLS();
  }

}



