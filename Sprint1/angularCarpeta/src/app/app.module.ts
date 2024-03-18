import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './main/home/home.component';
import { XuxemonsComponent } from './main/xuxemons/xuxemons.component';
import { TiendaComponent } from './main/tienda/tienda.component';
import { InventarioComponent } from './main/inventario/inventario.component';
import { HospitalComponent } from './main/hospital/hospital.component';
import { ErrorComponent } from './main/error/error.component';
import { HeaderComponent } from './main/header/header.component';
import { FooterComponent } from './main/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    MainComponent,
    HomeComponent,
    XuxemonsComponent,
    TiendaComponent,
    InventarioComponent,
    HospitalComponent,
    ErrorComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
