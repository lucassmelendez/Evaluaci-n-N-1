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
        // Este paso asegura que la propiedad asistencia se cargue desde la base de datos
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  toggleAttendance(student: Alumno, event: any) {
    // Si la checkbox está marcada, incrementa la asistencia; si no, decrementa
    if (event.detail.checked) {
      student.asistencia++; // Incrementa asistencia
    } else {
      if (student.asistencia > 0) { // Solo decrementa si la asistencia es mayor que 0
        student.asistencia--; // Decrementa asistencia
      }
    }
  }

  async confirmarAsistencia() {
    for (const student of this.students) {
      if (student.asistencia > 0) { // Solo incrementar si la asistencia es mayor que 0
        try {
          await this.crudAPIService.incrementarAsistencia({ correo: student.correo }).toPromise();
        } catch (error) {
          console.error('Error al incrementar la asistencia:', error);
        }
      }
    }

    // Volver a cargar la lista de alumnos después de confirmar la asistencia
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
