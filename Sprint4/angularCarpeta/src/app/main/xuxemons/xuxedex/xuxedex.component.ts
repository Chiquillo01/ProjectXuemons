import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
// Imports extras //
import { Xuxemons } from '../../../models/xuxedex/xuxedex.model';
import { UsersService } from '../../../services/users.service';
import { XuxemonsService } from '../../../services/xuxemons.service';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-xuxedex',
  templateUrl: './xuxedex.component.html',
  styleUrls: ['./xuxedex.component.css'],
})
export class XuxedexComponent implements OnInit {
  xuxemons: Xuxemons[] = [];
  userRole: Number | null;

  constructor(
    public userService: UsersService,
    public xuxemonsService: XuxemonsService,
    private router: Router,
    public tokenService: TokenService
  ) {
    this.userRole = this.tokenService ? this.tokenService.getRole() : null;
  }

  ngOnInit(): void {
    this.updateXuxemons();
  }

  /**
   * Nombre: getImageStyle
   * Función: Modificar el tamaño de la imagen segun el tamaño del xuxemon
   * @param tamano 
   * @returns 
   */
  getImageStyle(tamano: string): any {
    let width: number;
    const paqueno = 50;
    const mediano = 100;
    const grande = 150;

    switch (tamano) {
      case 'pequeno': width = paqueno; break;
      case 'mediano': width = mediano; break;
      case 'grande': width = grande; break;
      default: width = paqueno; break;
    }
    return {
      'width.px': width,
    };
  }

  /**
   * Nombre: updateXuxemons
   * Función: Obtener todos los Xuxemons de la BD
   */
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

  /**
   * Nombre: crear
   * Función: Crar que envia al usuario a la vista para crear Xuxemons
   */
  crear() {
    this.router.navigate(['home/home/xuxemons/xuxedex/crear']);
  }

  /**
   * Nombre: editar
   * Función: Editar el Xuxemon seleccionado
   */
  editar(xuxe: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: xuxe.id,
        nombre: xuxe.nombre,
        tipo: xuxe.tipo,
        archivo: xuxe.archivo,
      },
    };
    this.router.navigate(
      ['/home/home/xuxemons/xuxedex/editar'],
      navigationExtras
    );
  }

  /**
   * Nombre: eliminar
   * Función: Eliminar el xuxemon seleccionado
   */
  eliminar($id: any) {
    this.xuxemonsService.XuxeDelete($id).subscribe({
      next: () => {
        this.router.navigate(['/home/home/xuxemons/xuxedex']);
        alert('Xuxemon eliminado con exito.');
        window.location.reload();
      },
      // Rechazada //
      error: (error) => {
        alert('Ha fallado algo, el Xuxemon no pudo ser eliminado');
        throw new Error(error);
      },
    });
  }
}
