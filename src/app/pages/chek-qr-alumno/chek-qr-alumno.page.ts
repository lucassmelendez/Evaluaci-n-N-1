import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { CrudAPIService } from 'src/app/servicios/crud-api.service';
import { AsistenciaAlumnPage } from '../asistencia-alumn/asistencia-alumn.page'; // Asegúrate de importar la página

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
    private crudAPIService: CrudAPIService,
    private asistenciaAlumnPage: AsistenciaAlumnPage // Inyecta la página de asistencia
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
    
    const correosEscaneados = this.barcodes.map(barcode => barcode.displayValue); // Extrae los correos
    this.asistenciaAlumnPage.marcarPresentes(correosEscaneados); // Marca como presentes

    for (const barcode of this.barcodes) {
      const correo = barcode.displayValue; 
      this.incrementarAsistencia(correo);
    }
  }

  async incrementarAsistencia(correo: string) {
    try {
      const response = await this.crudAPIService.incrementarAsistencia({ correo }).toPromise();

      if (response.success) {
        console.log(`Asistencia incrementada. Nueva asistencia: ${response.asistencia}`);
      } else {
        console.error('Error al incrementar la asistencia', response);
        this.presentAlert('Error', 'No se pudo incrementar la asistencia.');
      }
    } catch (error) {
      console.error('Error en la solicitud', error);
      this.presentAlert('Error', 'Ocurrió un error en la solicitud.');
    }
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
