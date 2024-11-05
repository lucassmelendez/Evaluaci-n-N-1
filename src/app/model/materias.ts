// Interfaces
export interface Materias {
    id: number;
    nombre: string;
    duracion: string;         // Duración de la materia o curso
    correo_profe: string;     // Correo del profesor encargado de la materia
    totalClases: number;      // Cantidad total de clases programadas para la materia
    asistencias: Asistencia[]; // Agregar esta línea
}
export interface Asistencia {
    alumno_id: number;
    materia: Materias;
    asistencia: boolean;
    fecha: string; // Asegúrate de que esta propiedad esté presente
}
// Funciones

/**
 * Asigna un profesor a una materia específica.
 * @param materia - El objeto Materias a modificar
 * @param correoProfe - Correo del profesor a asignar
 * @returns Un objeto Materias actualizado con el profesor asignado
 */
export function asignarProfesorAMateria(
    materia: Materias,
    correoProfe: string
): Materias {
    materia.correo_profe = correoProfe;
    return materia;
}

/**
 * Incrementa el contador de clases totales en una materia.
 * @param materia - El objeto Materias a modificar
 * @param cantidad - Número de clases adicionales a sumar (puede ser negativo para restar)
 * @returns Un objeto Materias actualizado con el total de clases modificado
 */
export function actualizarTotalClases(
    materia: Materias,
    cantidad: number
): Materias {
    materia.totalClases += cantidad;
    return materia;
}

/**
 * Verifica si un profesor específico está asignado a la materia.
 * @param materia - El objeto Materias a consultar
 * @param correoProfe - Correo del profesor a verificar
 * @returns `true` si el profesor está asignado a la materia, de lo contrario `false`
 */
export function verificarProfesorAsignado(
    materia: Materias,
    correoProfe: string
): boolean {
    return materia.correo_profe === correoProfe;
}
