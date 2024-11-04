// chek-qr-alumno.page.ts
import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { AsistenciaService } from 'src/app/servicios/asistencia.service';

@Component({
  selector: 'app-chek-qr-alumno',
  templateUrl: './chek-qr-alumno.page.html',
  styleUrls: ['./chek-qr-alumno.page.scss'],
})
export class ChekQRAlumnoPage implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(
    private alertController: AlertController,
    private asistenciaService: AsistenciaService
  ) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert('Permiso Denegado', 'Por favor establezca permisos para el uso de barcode scanner.');
      return;
    }

    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);

    const correosEscaneados = this.barcodes.map((barcode) => barcode.displayValue);
    this.asistenciaService.actualizarCorreosEscaneados(correosEscaneados);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
