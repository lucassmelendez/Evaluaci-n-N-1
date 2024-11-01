import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ClaseService } from 'src/app/servicios/clase.service';
import { CrudAPIService } from 'src/app/servicios/crud-api.service';
import { AlumnoConPresente } from 'src/app/model/alumno';

@Component({
  selector: 'app-asistencia-alumn',
  templateUrl: './asistencia-alumn.page.html',
  styleUrls: ['./asistencia-alumn.page.scss'],
})
export class AsistenciaAlumnPage implements OnInit {
  students: AlumnoConPresente[] = [];
  totalClases: number = 0;
  scannedEmails: string[] = []; // Para almacenar los correos escaneados

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
          presente: false, // Inicializa la presencia como falsa
        })) as AlumnoConPresente[];
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  toggleAttendance(student: AlumnoConPresente, event: any) {
    student.presente = event.detail.checked; // Actualiza el estado de presencia
  }

  async confirmarAsistencia() {
    for (const student of this.students) {
      if (student.presente) { // Solo incrementa si está presente
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

  getAttendancePercentage(asistencia: number): string {
    if (this.totalClases === 0) return '0%';
    const percentage = (asistencia / this.totalClases) * 100;
    return percentage.toFixed(2) + '%';
  }

  // Método para marcar como presente a los alumnos escaneados
  marcarPresentes(correosEscaneados: string[]) {
    this.scannedEmails = correosEscaneados; // Almacena los correos escaneados
    for (const student of this.students) {
      student.presente = this.scannedEmails.includes(student.correo); // Marca como presente si está escaneado
    }
  }
}
