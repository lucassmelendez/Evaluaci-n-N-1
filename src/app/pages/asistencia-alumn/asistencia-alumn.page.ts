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
  students: Alumno[] = []; // Inicializa un arreglo vacío para los alumnos

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private crudAPIService: CrudAPIService
  ) {}

  ngOnInit() {
    this.loadAlumnos(); // Cargar todos los alumnos al inicializar
  }

  loadAlumnos() {
    this.crudAPIService.getAlumno().subscribe(
      (data) => {
        this.students = data; // Asignar los datos obtenidos a la propiedad students
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  toggleAttendance(student: Alumno, event: any) {
    if (event.detail.checked) {
      student.asistencia++; // Incrementa asistencia
    } else {
      if (student.asistencia > 0) {
        student.asistencia--; // Decrementa asistencia
      }
    }
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

    await this.loadAlumnos(); // Actualiza la interfaz con la asistencia más reciente

    const alert = await this.alertController.create({
      message: 'Asistencia registrada exitosamente',
      buttons: ['OK'],
    });
    await alert.present();

    setTimeout(() => {
      this.navCtrl.navigateForward(['/home-profe']);
    }, 2000);
  }
}
