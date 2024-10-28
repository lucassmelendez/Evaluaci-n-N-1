import { Injectable } from '@angular/core';
import { Persona } from '../model/Persona';
import { Alumno } from '../model/alumno';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { Profesor } from '../model/profesor';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private afs: AngularFirestore,private afAuth: AngularFireAuth) {}

  grabar(persona: Persona) {
    return this.afs.collection('persona').add(persona);
  }
  async registrarAlumno(alumno: Alumno) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(alumno.correo, alumno.password);
      
        const user = userCredential.user;
      if (user) {
        await user.sendEmailVerification();
      } else {
        throw new Error("El usuario no se autenticó correctamente");
      }
  

      await this.afs.collection('alumno').add({ ...alumno, uid: user.uid });
  

    } catch (error) {
      console.error("Error al registrar el alumno:", error);
      throw error; 
    }
  }

  listarTodo(): Observable<Alumno[]> {
    return this.afs.collection<Alumno>('alumno').valueChanges({ idField: 'id' });
  }

  eliminar(id: any) {
    return this.afs.collection('alumno').doc(id).delete();
  }

  async login(email: string, password: string): Promise<Alumno | Profesor | null> {
    try {
      
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (!user) {
        throw new Error('No se pudo autenticar al usuario');
      }

      
      const alumnoSnapshot = await this.afs.collection<Alumno>('alumno', ref =>
        ref.where('correo', '==', email)).get().toPromise();
      
      if (alumnoSnapshot && !alumnoSnapshot.empty) {
        return alumnoSnapshot.docs[0].data() as Alumno;
      }

      const profesorSnapshot = await this.afs.collection<Profesor>('profesor', ref =>
        ref.where('correo', '==', email)).get().toPromise();

      if (profesorSnapshot && !profesorSnapshot.empty) {
        return profesorSnapshot.docs[0].data() as Profesor;
      }

      return null; 
    } catch (error) {
      console.error("Error en la autenticación:", error);
      throw error; 
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

  async enviarCorreoRestablecimiento(email: string): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      console.log(`Correo de restablecimiento enviado a ${email}`);
    } catch (error) {
      console.error("Error al enviar el correo de restablecimiento:", error);
      throw error;
    }
  
  }
  async getUsuarioActual(email: string): Promise<Alumno | Profesor | null> {
    try {
      const alumnoSnapshot = await this.afs.collection<Alumno>('alumno', ref =>
        ref.where('correo', '==', email)).get().toPromise();
  
      if (alumnoSnapshot && !alumnoSnapshot.empty) {
        return alumnoSnapshot.docs[0].data() as Alumno;
      }
  
      const profesorSnapshot = await this.afs.collection<Profesor>('profesor', ref =>
        ref.where('correo', '==', email)).get().toPromise();
  
      if (profesorSnapshot && !profesorSnapshot.empty) {
        return profesorSnapshot.docs[0].data() as Profesor;
      }
  
      return null;
    } catch (error) {
      console.error("Error al obtener el usuario actual:", error);
      return null;
    }
  }
  
}
