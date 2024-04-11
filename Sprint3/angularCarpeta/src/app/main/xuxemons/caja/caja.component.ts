import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
// Imports extras //
import { TokenService } from '../../../services/token.service';
import { XuxemonsService } from '../../../services/xuxemons.service';
import { XuxemonsUsers } from '../../../models/xuxemons/xuxemons.model';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css'],
})
export class CajaComponent implements OnInit {
  xuxemonsUser: XuxemonsUsers[] = [];
  xuxemonsUserActivos: XuxemonsUsers[] = [];

  constructor(
    private tokenService: TokenService,
    private xuxemonsService: XuxemonsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getXuxemons();
    this.getXuxemonsActivos();
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
      case 'pequeno':
        width = paqueno;
        break;
      case 'mediano':
        width = mediano;
        break;
      case 'grande':
        width = grande;
        break;
      default:
        width = paqueno;
        break;
    }
    return {
      'width.px': width,
    };
  }

  /**
   * Nombre: getXuxemons
   * Función: obtiene todos los Xuxemons que son del usuario que esta en sessión
   */
  getXuxemons() {
    const userId = this.tokenService.getRole();

    if (userId !== null) {
      this.xuxemonsService.getAllXuxemonsUser(userId).subscribe({
        next: (xuxemonsUser: any) => {
          this.xuxemonsUser = xuxemonsUser[0];
        },
        error: (error) => {
          console.error('Error fetching Xuxemons:', error);
        },
      });
    } else {
      console.error('User ID is null');
    }
  }

  /**
   * Nombre: getXuxemons
   * Función: obtiene todos los Xuxemons que son del usuario que esta en sessión
   */
  getXuxemonsActivos() {
    const userId = this.tokenService.getRole();

    if (userId !== null) {
      this.xuxemonsService.getAllXuxemonsUserActivos(userId).subscribe({
        next: (xuxemonsUserActivos: any) => {
          this.xuxemonsUserActivos = xuxemonsUserActivos[0];
        },
        error: (error) => {
          console.error('Error fetching Xuxemons:', error);
        },
      });
    } else {
      console.error('User ID is null');
    }
  }

  /**
   * Nombre: debug
   * Función: crea aleatoriamente un Xuxemon pasandole el id del usuario de la sesión habierta.
   * Despues actualizara la lista de Xuxemons del Usuario
   */
  debug(): void {
    const userId = this.tokenService.getRole();

    this.xuxemonsService.createRandomXuxemon(userId!).subscribe({
      next: () => {
        this.getXuxemons();
      },
      error: () => {
        alert('Xuxemon no se ha podido crear.');
      },
    });
  }

  activo(xuxeUser: number) {
    console.log("Info: " + xuxeUser);
    this.xuxemonsService.xuxemonActivo(xuxeUser).subscribe({
      next: (returns) => {
        console.log('Este sale por el next: ' + returns);
        // alert('Le ha gustado el alimento.');
      },
      error: (error) => {
        console.log('Esta saliendo por el error: ' + error);
        // alert('No quiere tu mierda de chuche.');
        // throw new Error(error);
      },
    });
  }

  favorito(xuxeUser: any) {}

  /**
   * Nombre: alimentar
   * Función: Envia al usuario a a ruta para alimentar al Xuxemon, a su vez esta enviando los datos del xuxuemon
   */
  alimentar(xuxeUser: any) {
    console.log('Datos de xuxeUser:', xuxeUser);
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: xuxeUser.xuxemon_id,
        nombre: xuxeUser.nombre,
        archivo: xuxeUser.archivo,
        tamano: xuxeUser.tamano,
      },
    };
    this.router.navigate(
      ['/home/home/xuxemons/caja/alimentar'],
      navigationExtras
    );
  }

  /**
   * Nombre: eliminar
   * Función: Eliminar el xuxemon seleccionado
   */
  eliminar() {}
}
