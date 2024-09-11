import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full'
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'agregar',
    loadChildren: () => import('./pages/agregar/agregar.module').then( m => m.AgregarPageModule)
  },
  {
    path: 'ver',
    loadChildren: () => import('./pages/ver/ver.module').then( m => m.VerPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'env-correo',
    loadChildren: () => import('./pages/env-correo/env-correo.module').then( m => m.EnvCorreoPageModule)
  },
  {
    path: 'confirm-code',
    loadChildren: () => import('./pages/confirm-code/confirm-code.module').then( m => m.ConfirmCodePageModule)
  },
  {
    path: 'home-alumno',
    loadChildren: () => import('./pages/home-alumno/home-alumno.module').then( m => m.HomeAlumnoPageModule)
  },
  {
    path: 'home-profe',
    loadChildren: () => import('./pages/home-profe/home-profe.module').then( m => m.HomeProfePageModule)
  },
  {
    path: 'asistencia-alumn',
    loadChildren: () => import('./pages/asistencia-alumn/asistencia-alumn.module').then( m => m.AsistenciaAlumnPageModule)
  },
  {
    path: 'qr-alumno',
    loadChildren: () => import('./pages/qr-alumno/qr-alumno.module').then( m => m.QRAlumnoPageModule)
  },
  {
    path: 'chek-qr-alumno',
    loadChildren: () => import('./pages/chek-qr-alumno/chek-qr-alumno.module').then( m => m.ChekQRAlumnoPageModule)
  },
  {
    path: 'presente-alumno',
    loadChildren: () => import('./pages/presente-alumno/presente-alumno.module').then( m => m.PresenteAlumnoPageModule)
  },
  {
    path: 'cursos-qr',
    loadChildren: () => import('./pages/cursos-qr/cursos-qr.module').then( m => m.CursosQRPageModule)
  },
  {
    path: 'cursos-lista',
    loadChildren: () => import('./pages/cursos-lista/cursos-lista.module').then( m => m.CursosListaPageModule)
  },
  {
    path: 'cursos-informe',
    loadChildren: () => import('./pages/cursos-informe/cursos-informe.module').then( m => m.CursosInformePageModule)
  },
  {
    path: 'informe',
    loadChildren: () => import('./pages/informe/informe.module').then( m => m.InformePageModule)
  },
  {
    path: 'qr-profe',
    loadChildren: () => import('./pages/qr-profe/qr-profe.module').then( m => m.QrProfePageModule)
  },
  {
    path: 'por-asistencia-curso',
    loadChildren: () => import('./pages/por-asistencia-curso/por-asistencia-curso.module').then( m => m.PorAsistenciaCursoPageModule)
  },
  {/*esto debe ir al final*/
    path: '**',
    loadChildren: () => import('./pages/notfound/notfound.module').then( m => m.NotfoundPageModule)
  },  {
    path: 'materia-alumn',
    loadChildren: () => import('./pages/materia-alumn/materia-alumn.module').then( m => m.MateriaAlumnPageModule)
  },
  {
    path: 'check-qr-alumn',
    loadChildren: () => import('./pages/check-qr-alumn/check-qr-alumn.module').then( m => m.CheckQrAlumnPageModule)
  },
  {
    path: 'check-alumn',
    loadChildren: () => import('./pages/check-alumn/check-alumn.module').then( m => m.CheckAlumnPageModule)
  },
  {
    path: 'ver-lista',
    loadChildren: () => import('./pages/ver-lista/ver-lista.module').then( m => m.VerListaPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
