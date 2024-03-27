import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
// Imports de los modelos necesarios //
import { Xuxemons } from '../../../models/xuxedex/xuxedex.model';
import { XuxemonsUsers } from '../../../models/xuxemons/xuxemons.model';
// Imports de los servicios //
import { UsersService } from '../../../services/users.service';
import { XuxemonsService } from 'src/app/services/xuxemons.service';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-xuxedex',
  templateUrl: './xuxedex.component.html',
  styleUrls: ['./xuxedex.component.css'],
})
export class XuxedexComponent implements OnInit {
  xuxemons: Xuxemons[] = [];
  xuxemonsUsers: XuxemonsUsers[] = [];
  // Variables para saber si el usuario tiene al xuxemon y para saber el rol del usuario //
  xuxemonsView: boolean = false;
  userRole: Number | null;

  constructor(
    public userService: UsersService,
    public xuxemonsService: XuxemonsService,
    private router: Router,
    public tokenService: TokenService
  ) {
    this.userRole = this.tokenService ? this.tokenService.getRole() : null;
  }

  getImageStyle(tamano: number): any {
    let width: number;

    switch (tamano) {
      case 1:
        width = 50;
        break;
      case 2:
        width = 100;
        break;
      case 3:
        width = 150;
        break;
      default:
        width = 50;
        break;
    }

    return {
      'width.px': width,
    };
  }

  ngOnInit(): void {
    this.updateXuxemons();
  }

  updateXuxemons() {
    this.xuxemonsService.getAllXuxemons().subscribe({
      next: (value: any) => {
        this.xuxemons = value[0];
      },
      error: (error) => {
        console.error('Error fetching Xuxemons:', error);
      },
    });
  }

  // Función crar que envia al usuario a la vista para crear Xuxemons //
  crear() {
    this.router.navigate(['home/home/xuxemons/xuxedex/crear']);
  }

  // Función para editar el Xuxemon seleccionado //
  editar(xuxe: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: xuxe.id,
        nombre: xuxe.nombre,
        tipo: xuxe.tipo,
        archivo: xuxe.archivo,
      },
    };
    // Envia al usuario a la ruta de edición //
    this.router.navigate(
      ['/home/home/xuxemons/xuxedex/editar'],
      navigationExtras
    );
  }

  // Función para eliminar el xuxemon seleccionado //
  eliminar($id: any) {
    // Se subscribe para recibir la información de la función a la que hace referencia en users.service //
    this.xuxemonsService.XuxeDelete($id).subscribe({
      // Aceptada //
      next: (data: any) => {
        // Redirije al usuario y le da un mensaje //
        this.router.navigate(['/home/home/xuxemons/xuxedex']);
        alert('Xuxemon eliminado con exito.');
      },
      // Rechazada //
      error: (error) => {
        console.log(error);
        // Avisa de que algo salió mal //
        alert('Ha fallado algo, el Xuxemon no pudo ser eliminado');
        throw new Error(error);
      },
    });
  }
}
