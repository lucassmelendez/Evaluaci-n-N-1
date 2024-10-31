export interface Materia {
    nombre: string;
    asistencias: Asistencia[]; 
}

export interface Asistencia {
    fecha: string;
    presente: boolean; 
}

export interface Alumno {
    id?: string; // Asegúrate de que esta propiedad esté presente
    nombre: string;
    apellido: string;
    edad: number | null;
    correo: string;
    password: string;
    password2: string;
    asistencia: number;
    materias: Materia[];
}

export interface AlumnoConPresente extends Alumno {
    presente?: boolean; // Propiedad opcional para la presencia
}