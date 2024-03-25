import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
// Importamos las rutas de nuestros componentes //
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    //canActivate: const [AngularFireAuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./main//main.module').then((m) => m.MainModule),
    //canActivate: const [AngularFireAuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
