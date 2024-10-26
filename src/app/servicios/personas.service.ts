import { Injectable } from '@angular/core';
import { Persona } from '../model/Persona';
import { Alumno } from '../model/alumno';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Profesor } from '../model/profesor';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private afs: AngularFirestore) {}

  grabar(persona: Persona) {
    return this.afs.collection('persona').add(persona);
  }
  grabar_alumno(alumno: Alumno) {
    return this.afs.collection('alumno').add(alumno);
  }

  listarTodo(): Observable<Alumno[]> {
    return this.afs.collection<Alumno>('alumno').valueChanges({ idField: 'id' });
  }

  eliminar(id: any) {
    return this.afs.collection('alumno').doc(id).delete();
  }

  async login(email: string, password: string): Promise<Alumno | Profesor | null> {
    try {
      const alumnoSnapshot = await this.afs.collection<Alumno>('alumno', ref =>
        ref.where('correo', '==', email).where('password', '==', password)
      ).get().toPromise();

      if (alumnoSnapshot && !alumnoSnapshot.empty) {
        return alumnoSnapshot.docs[0].data() as Alumno;
      }

      const profesorSnapshot = await this.afs.collection<Profesor>('profesor', ref =>
        ref.where('correo', '==', email).where('password', '==', password)
      ).get().toPromise();

      if (profesorSnapshot && !profesorSnapshot.empty) {
        return profesorSnapshot.docs[0].data() as Profesor;
      }

      return null;
    } catch (error) {
      console.error("Error en la autenticación:", error);
      return null;
    }
  }

  async verificar_correo(email: string): Promise<boolean> {
    try {
      const alumnoSnapshot = await this.afs.collection<Alumno>('alumno', ref =>
        ref.where('correo', '==', email)).get().toPromise();
  
      if (alumnoSnapshot && !alumnoSnapshot.empty) {
        return true;
      }
  
      const profesorSnapshot = await this.afs.collection<Profesor>('profesor', ref =>
        ref.where('correo', '==', email)).get().toPromise();
  
      if (profesorSnapshot && !profesorSnapshot.empty) {
        return true;
      }
  
      return false;
    } catch (error) {
      console.error("Error en la verificación de correo:", error);
      return false;
    }
  }

  async modificarPassword(email: string, newPassword: string, newPassword2: string): Promise<void> {
    try {
      const alumnoSnapshot = await this.afs.collection<Alumno>('alumno', ref =>
        ref.where('correo', '==', email)).get().toPromise();
  
      if (alumnoSnapshot && !alumnoSnapshot.empty) {
        const alumnoDoc = alumnoSnapshot.docs[0];
        
        await this.afs.collection('alumno').doc(alumnoDoc.id).update({
          password: newPassword,
          password2: newPassword2 
        });
        return;
      }
  
      const profesorSnapshot = await this.afs.collection<Profesor>('profesor', ref =>
        ref.where('correo', '==', email)).get().toPromise();
  
      if (profesorSnapshot && !profesorSnapshot.empty) {
        const profesorDoc = profesorSnapshot.docs[0];
        // Actualizar tanto password como password2
        await this.afs.collection('profesor').doc(profesorDoc.id).update({
          password: newPassword,
          password2: newPassword2 
        });
        return;
      }
      
      throw new Error('Correo no encontrado');
    } catch (error) {
      console.error("Error al modificar la contraseña:", error);
      throw error; 
    }
  }
  
}
