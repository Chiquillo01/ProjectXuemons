import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
// Importamos los formularios // 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Importamos nuestros componentes // 
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
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';

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
    FooterComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
