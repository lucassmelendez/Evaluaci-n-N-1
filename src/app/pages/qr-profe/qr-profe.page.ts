import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importa NavController
import { Geolocation } from '@ionic-native/geolocation/ngx'; // Importa Geolocation
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
    fecha: '27/10/2024 10:30'
  };

  tiempoRestante: number = 300; // Tiempo restante en segundos (5 minutos)
  intervalId: any; // Variable para almacenar el ID del intervalo
  mensajeEstado: string = ''; // Mensaje para mostrar el estado de la validación

  constructor(private navCtrl: NavController, private geolocation: Geolocation, private http: HttpClient) {}

  ngOnInit() {
    // Asignamos el valor QR serializado
    this.valorQR = JSON.stringify(this.valorQRJSON);

    // Iniciamos el temporizador para redirigir después de 5 minutos
    this.intervalId = setInterval(() => {
      this.tiempoRestante--;

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

  // Método que valida la ubicación y genera el QR
  async validarYGenerarQR() {
    try {
      const position = await this.geolocation.getCurrentPosition();
      const location = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      };

      console.log('Ubicación obtenida:', location);

      // Enviar ubicación al backend de Django para validación
      this.http.post('https://tu-api.com/verificar_rango', location).subscribe(
        (response: any) => {
          if (response.success) {
            this.mensajeEstado = 'Dentro del rango. QR generado.';
            // Si está dentro del rango, puedes generar el QR o continuar con la lógica
            this.generarQR();
          } else {
            this.mensajeEstado = 'Fuera del rango permitido.';
          }
        },
        (error) => {
          console.error('Error al validar QR:', error);
          this.mensajeEstado = 'Error al comunicarse con el servidor.';
        }
      );
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
      this.mensajeEstado = 'No se pudo obtener la ubicación. Verifica los permisos.';
    }
  }

  // Método que navega a la página de asistencia
  redirigir() {
    this.navCtrl.navigateForward('/asistencia-alumn'); // Ruta a la que se redirige
  }

  // Método para generar el QR (puedes personalizar esto según tu lógica)
  generarQR() {
    this.valorQR = JSON.stringify(this.valorQRJSON); // O actualiza según la lógica necesaria
    // Aquí puedes agregar cualquier otra lógica que necesites al generar el QR
  }
}
