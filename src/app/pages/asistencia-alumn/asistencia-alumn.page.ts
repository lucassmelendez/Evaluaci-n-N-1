import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { CrudAPIService } from 'src/app/servicios/crud-api.service';
import { Alumno } from 'src/app/model/alumno';

@Component({
  selector: 'app-asistencia-alumn',
  templateUrl: './asistencia-alumn.page.html',
  styleUrls: ['./asistencia-alumn.page.scss'],
})
export class AsistenciaAlumnPage implements OnInit {
  students: Alumno[] = [];
  totalClases: number = 20;

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private crudAPIService: CrudAPIService
  ) {}

  ngOnInit() {
    this.loadAlumnos();
  }

  loadAlumnos() {
    this.crudAPIService.getAlumno().subscribe(
      (data: Alumno[]) => {
        this.students = data;
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  toggleAttendance(student: Alumno) {
    // Si la asistencia es mayor que 0, decrementa
    if (student.asistencia > 0) {
      student.asistencia--; // Disminuye la asistencia si ya está presente
    } else {
      student.asistencia++; // Aumenta la asistencia si no está presente
    }
  }

  getAttendancePercentage(asistencia: number): string {
    if (this.totalClases === 0) return '0%';
    const percentage = (asistencia / this.totalClases) * 100;
    return percentage.toFixed(2) + '%';
  }

  async confirmarAsistencia() {
    const alert = await this.alertController.create({
      message: 'Asistencia registrada exitosamente',
      buttons: ['OK'],
    });
    await alert.present();

    setTimeout(() => {
      this.navCtrl.navigateForward(['/home-profe']); // Redirige al home después de 2 segundos
    }, 2000);
  }
}
