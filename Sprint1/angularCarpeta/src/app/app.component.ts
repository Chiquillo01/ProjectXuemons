import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Importamos las rutas de nuestros componentes //
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent,
    //canActivate: [AngularFireAuthGuar]
  },
  {
    path: 'home',
    loadChildren: () => import('./main//main.module').then(m => m.MainModule)
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularCarpeta';
}