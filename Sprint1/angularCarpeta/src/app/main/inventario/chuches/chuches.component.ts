// import { Component } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
// Imports de los modelos necesarios //
import { Chuches } from '../../../models/chuches/chuches.model';
// Imports del json donde estan los datos de nuestros Chuches
// import Data from '../../assets/Chuches.json';

// Imports de los servicios //
import { UsersService } from '../../../services/users.service';
import { ChuchesService } from '../../../services/chuches.service';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-chuches',
  templateUrl: './chuches.component.html',
  styleUrls: ['./chuches.component.css']
})
export class ChuchesComponent {

  Chuches: Chuches[] = [];
  // Variables para saber si el usuario tiene al xuxemon y para saber el rol del usuario //
  ChuchesView: boolean = false;
  userRole: Number | null; // = this.tokenService.getRole();
  constructor(
    public userService: UsersService,
    public ChuchesService: ChuchesService,
    private router: Router,
    public tokenService: TokenService
  ) {
    this.userRole = this.tokenService ? this.tokenService.getRole() : null;
  } 

  //preguntar al valentin
  ngOnInit(): void {
 this.updateChuches();

  }

  updateChuches() {
    this.ChuchesService.getAllChuches().subscribe({
      next: (value: any) => {
        this.Chuches = value[0];
        console.log(value);
        console.log(this.Chuches);
        // this.Chuches = Chuches;
        // this.ChuchesView = true;
      },
      error: (error) => {
        console.error('Error fetching Chuches:', error);
      },
    }
    );
  }

  // // Función crar que envia al usuario a la vista para crear Chuches //
  // crear() {
  //   this.router.navigate(['/chuches/crear']);
  // }

  // // Función para editar el Xuxemon seleccionado //
  // editar(chuche: any) {
  //   const navigationExtras: NavigationExtras = {
  //     queryParams: {
  //       id: chuche.id,
  //       nombre: chuche.nombre,
  //       tipo: chuche.tipo,
  //       archivo: chuche.archivo,
  //     },
  //   };
  //   // Envia al usuario a la ruta de edición //
  //   this.router.navigate(['/chuches/editar'], navigationExtras);
  // }

  // // Función para eliminar el xuxemon seleccionado //
  // eliminar($id: any) {
  //   // Se subscribe para recibir la información de la función a la que hace referencia en users.service //
  //   this.ChuchesService.ChuchesDelete($id).subscribe(
  //     // Aceptada //
  //     (data: any) => {
  //       // Redirije al usuario y le da un mensaje //
  //       this.router.navigate(['/chuches']);
  //       alert('Chuches eliminadas con exito.');
  //     },
  //     // Rechazada //
  //     (error) => {
  //       console.log(error);
  //       // Avisa de que algo salió mal //
  //       alert('Ha fallado algo, la Chuche no pudo ser eliminado');
  //       throw new Error(error);
  //     }
  //   );
  // }

  // Función para el botón de debug //
  debug() {
    const randomIndex = Math.floor(Math.random() * this.Chuches.length);
    const randomChuches = this.Chuches[randomIndex];
    // const reference = TokenService;
    // const token = TokenService.getToken();
    // console.log(token);

    const chuchesData = {
      nombre: randomChuches.nombre,
      // type: randomXuxemon.type,
      modificador: randomChuches.modificador,
      dinero: randomChuches.dinero,
      archivo: randomChuches.archivo,
    };

    this.ChuchesService.createChuchesAleatorios(chuchesData).subscribe(
      () => {
        alert('Chuches creado aleatoriamente con éxito');
      },
      (error) => {
        console.error('Error al crear la Chuches:', error);
        console.error(chuchesData);
        alert('Ocurrió un error al crear la Chuche aleatoria');
        
      }
    );
  }
}
