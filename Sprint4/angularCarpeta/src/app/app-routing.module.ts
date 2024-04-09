import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Importamos las rutas de nuestros componentes //
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {
    path: ' ',
    redirectTo: 'landingPage',
    //canActivate: const [AngularFireAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    //canActivate: const [AngularFireAuthGuard]
  },
  { 
    path: 'registro',
    component: RegistroComponent
    //canActivate: const [AngularFireAuthGuard]
  },
  {
    path: 'landingPage',
    component: LandingComponent,
    //canActivate: const [AngularFireAuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
    //canActivate: const [AngularFireAuthGuard]
  },
  {
    path: '**',
    redirectTo: 'landingPage',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
