import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-asistencia-alumn',
  templateUrl: './asistencia-alumn.page.html',
  styleUrls: ['./asistencia-alumn.page.scss'],
})
export class AsistenciaAlumnPage implements OnInit {

  students = [
    { name: 'Juan Pérez', attendance: 85, present: false },
    { name: 'María García', attendance: 0, present: false },
    { name: 'Pedro López', attendance: 78, present: false },
    { name: 'Ana Martínez', attendance: 95, present: false },
    { name: 'Luis Hernández', attendance: 80, present: false },
    { name: 'Francisco Silva', attendance: 30, present: false },
    { name: 'Hector Alveal', attendance: 90, present: false },
    { name: 'Omar Alveal', attendance: 78, present: false },
    { name: 'Benjamin Alveak', attendance: 95, present: false },
    { name: 'Pedro Ahumada', attendance: 80, present: false },
    { name: 'Benjamin Bahamondes', attendance: 100, present: false },
    { name: 'Ignacio Urrutia', attendance: 90, present: false },
    { name: 'Kristal Huribe', attendance: 78, present: false },
    { name: 'Alan Gajardo', attendance: 95, present: false },
    { name: 'Diego Plaza', attendance: 40, present: false },
    { name: 'Matías Recabarren', attendance: 85, present: false },
    { name: 'Alonso Gonzales', attendance: 10, present: false },
    { name: 'Sebastián Piñera', attendance: 78, present: false },
    { name: 'Maria Jose', attendance: 95, present: false },
    { name: 'José María', attendance: 80, present: false },
  ];

  constructor(private alertController: AlertController,
              private navCtrl:NavController) { }

  ngOnInit() {
  }

  togglePresence(student: any) {
    student.present = !student.present;
  }

  async ConfirmarAsistencia() {
    const alert = await this.alertController.create({
      message: 'Asistencia registrada exitosamente',
      buttons: ['OK'],
    });
    await alert.present();
    setTimeout(()=>{
      this.navCtrl.navigateForward(['/home-profe']) 
    },2000)
  }
}
