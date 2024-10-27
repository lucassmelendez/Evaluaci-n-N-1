import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-chek-qr-alumno',
  templateUrl: './chek-qr-alumno.page.html',
  styleUrls: ['./chek-qr-alumno.page.scss'],
})
export class ChekQRAlumnoPage implements OnInit {
  
  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(private AlertController:AlertController) { }

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }
  
  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.AlertController.create({
      header: 'Permiso Denegado',
      message: 'Por favor establezca permisos para el uso de barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
