import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ClaseService } from 'src/app/servicios/clase.service';
import { CrudAPIService } from 'src/app/servicios/crud-api.service';
import { Alumno } from 'src/app/model/alumno';

@Component({
  selector: 'app-asistencia-alumn',
  templateUrl: './asistencia-alumn.page.html',
  styleUrls: ['./asistencia-alumn.page.scss'],
})
export class AsistenciaAlumnPage implements OnInit {
  students: Alumno[] = [];
  totalClases: number = 0;

  constructor(
    private alertController: AlertController,
    private claseService: ClaseService,
    private crudAPIService: CrudAPIService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.loadAlumnos();
    this.claseService.totalClases$.subscribe((total) => {
      this.totalClases = total;
    });
  }

  loadAlumnos() {
    this.crudAPIService.getAlumno().subscribe(
      (data) => {
        this.students = data.map((student) => ({
          ...student,
          asistencia: student.asistencia || 0,
        }));
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  toggleAttendance(student: Alumno, event: any) {
    student.asistencia += event.detail.checked ? 1 : -1;
    if (student.asistencia < 0) student.asistencia = 0;
  }

  async confirmarAsistencia() {
    for (const student of this.students) {
      if (student.asistencia > 0) {
        try {
          await this.crudAPIService.incrementarAsistencia({ correo: student.correo }).toPromise();
        } catch (error) {
          console.error('Error al incrementar la asistencia:', error);
        }
      }
    }

    this.claseService.incrementarClases(); // Incrementa el total de clases
    this.navCtrl.navigateForward(['/home-profe']);

    const alert = await this.alertController.create({
      message: 'Asistencia registrada exitosamente',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
