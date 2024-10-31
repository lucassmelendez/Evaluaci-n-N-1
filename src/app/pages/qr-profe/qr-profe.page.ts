import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http'; 
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-qr-profe',
  templateUrl: './qr-profe.page.html',
  styleUrls: ['./qr-profe.page.scss'],
})
export class QrProfePage implements OnInit, OnDestroy {

  valorQR: string = ''; 
  valorQRJSON: any = {}; 
  correoProfesor: string | null = localStorage.getItem('usuario');
  nombre: string | null = localStorage.getItem('nombreCurso');
  tiempoRestante: number = 300; 
  intervalId: any; 
  mensajeEstado: string = ''; // Agrega esta línea

  constructor(private navCtrl: NavController, private http: HttpClient) {}

  ngOnInit() {
    this.actualizarQr(); 

    this.intervalId = setInterval(() => {
      this.tiempoRestante--;
      console.log(this.tiempoRestante);

      if (this.tiempoRestante <= 0) {
        clearInterval(this.intervalId);
        this.redirigir();
      }
    }, 1000); 
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Método para navegar a la página de asistencia
  redirigir() {
    this.navCtrl.navigateForward('/asistencia-alumn');
  }

  // Método para actualizar el valor de QR
  actualizarQr() {
    const cursoIdSeleccionado: string | null = localStorage.getItem('cursoIdSeleccionado');
    
    if (cursoIdSeleccionado) {
      this.valorQRJSON = {
        codigocurso: cursoIdSeleccionado,
        codigoprofe: this.correoProfesor || '',
        codigonombre: this.nombre || '',
        fecha: formatDate(new Date(), 'dd/MM/yyyy HH:mm', 'en-US')
      };
      this.valorQR = JSON.stringify(this.valorQRJSON);
      this.mensajeEstado = 'QR generado correctamente.'; // Mensaje de éxito
    } else {
      this.mensajeEstado = 'Error: No se encontró el ID del curso seleccionado.'; // Mensaje de error
      console.error('No se encontró el ID del curso seleccionado');
    }
  }
}
