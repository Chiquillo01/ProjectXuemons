import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { HospitalComponent } from './hospital/hospital.component';
import { InventarioComponent } from './inventario/inventario.component';
import { ChuchesComponent } from './inventario/chuches/chuches.component';
import { TiendaComponent } from './tienda/tienda.component';
import { XuxemonsComponent } from './xuxemons/xuxemons.component';
import { XuxedexComponent } from './xuxemons/xuxedex/xuxedex.component';
import { CajaComponent } from './xuxemons/caja/caja.component';
import { CommonModule } from '@angular/common';
import { CrearComponent } from './xuxemons/xuxedex/crear/crear.component';
import { EditarComponent } from './xuxemons/xuxedex/editar/editar.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'footer', component: FooterComponent },
      { path: 'header', component: HeaderComponent },
      { path: 'home', component: HomeComponent },
      { path: 'home/hospital', component: HospitalComponent },
      { path: 'home/inventario', component: InventarioComponent },
      { path: 'home/inventario/chuches', component: ChuchesComponent },
      //{ path: 'home/inventario/objetos', component: ObjetosComponent },
      { path: 'home/tienda', component: TiendaComponent },
      { path: 'home/xuxemons', component: XuxemonsComponent },
      { path: 'home/xuxemons/xuxedex', component: XuxedexComponent },
      { path: 'home/xuxemons/caja', component: CajaComponent },
      { path: 'home/xuxemons/xuxedex/crear', component: CrearComponent },
      { path: 'home/xuxemons/xuxedex/editar', component: EditarComponent },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes),CommonModule,],
  exports: [RouterModule],
  declarations: [
    XuxedexComponent,
    ChuchesComponent,
    CajaComponent,
  ],
})
export class MainModule {}
