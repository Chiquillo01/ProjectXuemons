import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
// Imports de los modelos necesarios //
import { Xuxemons } from '../../../models/xuxedex/xuxedex.model';

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
      'width.px': width
    };
  }  

  ngOnInit(): void {
    this.updateXuxemons();
  }

  updateXuxemons() {
    this.xuxemonsService.getAllXuxemons().subscribe({
      next: (value: any) => {
        this.xuxemons = value[0];
        console.log(value);
        console.log(this.xuxemons);
        // this.xuxemons = xuxemons;
        // this.xuxemonsView = true;
      },
      error: (error) => {
        console.error('Error fetching Xuxemons:', error);
      },
    });
  }

  // Función crar que envia al usuario a la vista para crear Xuxemons //
  crear() {
    this.router.navigate(['/xuxedex/crear']);
  }

  // Función para editar el Xuxemon seleccionado //
  editar(xuxe: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: xuxe.id,
        name: xuxe.name,
        type: xuxe.type,
        archive: xuxe.archive,
      },
    };
    // Envia al usuario a la ruta de edición //
    this.router.navigate(['/xuxedex/editar'], navigationExtras);
  }

  // Función para eliminar el xuxemon seleccionado //
  eliminar($id: any) {
    // Se subscribe para recibir la información de la función a la que hace referencia en users.service //
    this.xuxemonsService.XuxeDelete($id).subscribe(
      // Aceptada //
      (data: any) => {
        // Redirije al usuario y le da un mensaje //
        this.router.navigate(['/xuxedex']);
        alert('Xuxemon eliminado con exito.');
      },
      // Rechazada //
      (error) => {
        console.log(error);
        // Avisa de que algo salió mal //
        alert('Ha fallado algo, el Xuxemon no pudo ser eliminado');
        throw new Error(error);
      }
    );
  }

  // Función para el botón de debug //
  debug() {
    const randomIndex = Math.floor(Math.random() * this.xuxemons.length);
    const randomXuxemon = this.xuxemons[randomIndex];
    // const reference = TokenService;
    // const token = TokenService.getToken();
    // console.log(token);

    const xuxemonData = {
      nombre: randomXuxemon.nombre,
      tipo: randomXuxemon.tipo,
      archivo: randomXuxemon.archivo,
    };

    this.xuxemonsService.createXuxemonAleatorios(xuxemonData).subscribe(
      () => {
        alert('Xuxemon creado aleatoriamente con éxito');
      },
      (error) => {
        console.error('Error al crear el Xuxemon:', error);
        alert('Ocurrió un error al crear el Xuxemon aleatorio');
      }
    );
  }
}
