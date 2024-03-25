// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
// // Importamos las rutas de nuestros componentes //
// import { LoginComponent } from './login/login.component';
// import { RegistroComponent } from './registro/registro.component';

// const routes: Routes = [
//   {
//     path: 'login',
//     component: LoginComponent,
//     //canActivate: const [AngularFireAuthGuard]
//   },

//   { 
//     path: 'registro',
//     component: RegistroComponent
//     //canActivate: const [AngularFireAuthGuard]
//   },

//   {
//     path: 'home',
//     loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
//     canActivate: const [AngularFireAuthGuard]
//   },
//   {
//     path: '**',
//     redirectTo: 'login',
//   },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AngularFireAuthGuard } from '@angular/fire/auth'; // Importa AngularFireAuthGuard desde AngularFire

// Importa tus componentes
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './main/home/home.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Ruta pública
  { 
    path: 'home',
    component: HomeComponent,
    // canActivate: [AngularFireAuthGuard], // Protege esta ruta con el guardia de ruta de AngularFire
  },
  { path: 'other', component: MainComponent }, // Ruta pública
  { path: '**', redirectTo: 'login' }, // Redirige a login para cualquier otra ruta no definida
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
