import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importa NavController
import { HttpClient } from '@angular/common/http'; // Importa HttpClient

@Component({
  selector: 'app-qr-profe',
  templateUrl: './qr-profe.page.html',
  styleUrls: ['./qr-profe.page.scss'],
})
export class QrProfePage implements OnInit, OnDestroy {

  valorQR: string = 'clase'; // Valor QR inicial
  valorQRJSON = {
    codigocurso: '0001',
    codigoprofe: '005',
    fecha: '27/10/2024 10:30',
    qr: '0001' // Este valor se actualizará
  };

  tiempoRestante: number = 300; // Tiempo restante en segundos (5 minutos)
  intervalId: any; // Variable para almacenar el ID del intervalo
  mensajeEstado: string = ''; // Mensaje para mostrar el estado de la validación

  constructor(private navCtrl: NavController, private http: HttpClient) {}

  ngOnInit() {
    // Actualiza el valor de qr
    this.actualizarQr();
  
    // Asignamos el valor QR serializado
    this.valorQR = JSON.stringify(this.valorQRJSON);
  
    // Iniciamos el temporizador para redirigir después de 5 minutos
    this.intervalId = setInterval(() => {
      this.tiempoRestante--;
      console.log(this.tiempoRestante); // Verifica el decremento
  
      // Si el tiempo restante es 0, redirigir
      if (this.tiempoRestante <= 0) {
        clearInterval(this.intervalId); // Detener el intervalo
        this.redirigir(); // Redirigir a la ruta
      }
    }, 1000); // Actualiza cada segundo
  }

  ngOnDestroy() {
    // Asegúrate de limpiar el intervalo cuando el componente se destruya
    clearInterval(this.intervalId);
  }

  // Método que navega a la página de asistencia
  redirigir() {
    this.navCtrl.navigateForward('/asistencia-alumn'); // Ruta a la que se redirige
  }

  // Método para actualizar el valor de qr
  actualizarQr() {
    // Genera un nuevo valor para qr, por ejemplo, usando un número aleatorio
    const nuevoValor = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.valorQRJSON.qr = nuevoValor; // Actualiza el valor de qr
  }

  // Método para generar el QR (puedes personalizar esto según tu lógica)
  generarQR() {
    this.valorQR = JSON.stringify(this.valorQRJSON); // O actualiza según la lógica necesaria
    // Aquí puedes agregar cualquier otra lógica que necesites al generar el QR
  }
}
