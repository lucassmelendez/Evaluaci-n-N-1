export interface Profesor{
    id?:string;
    nombre:string;
    apellido:string;
    edad:number | null;
    correo:string;
    password:string;
    password2:string;
    curso:string;
}