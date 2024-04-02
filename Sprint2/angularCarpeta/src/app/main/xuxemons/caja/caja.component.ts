import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
// Imports de los modelos necesarios //
import { Xuxemons } from '../../../models/xuxedex/xuxedex.model';
import { XuxemonsUsers } from '../../../models/xuxemons/xuxemons.model';
import { Chuches } from 'src/app/models/chuches/chuches.model';
// Imports de los servicios //
import { UsersService } from '../../../services/users.service';
import { ChuchesService } from '../../../services/chuches.service';
import { XuxemonsService } from 'src/app/services/xuxemons.service';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css'],
})
export class CajaComponent implements OnInit {
  xuxemons: Xuxemons[] = [];
  xuxemonsUsers: XuxemonsUsers[] = [];
  Chuches: Chuches[] = [];
  // Variables para saber si el usuario tiene al xuxemon y para saber el rol del usuario //
  xuxemonsView: boolean = false;
  userRole: Number | null;
  repetido: boolean = false;
  selectedChuche: any;
  XuxeId: any;

  constructor(
    public userService: UsersService,
    public xuxemonsService: XuxemonsService,
    public chuchesService: ChuchesService,
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
    this.getXuxemons();
    this.getChuches();
  }

  // alimentar a los xuxemons
  alimentar() {
    const XuxemonAlimentado = this.xuxemonsUsers[this.XuxeId];
    const ChucheInfo = this.Chuches[this.selectedChuche];
    let Comida = 0;

    /* esto se puede cambiar para que cambie depende de la dificultad
    if (XuxemonAlimentado.comida <= 3) {
      Comida = XuxemonAlimentado.comida + ChucheInfo.modificador;
    }*/

    const XuxemonEditado = {
      nombre: XuxemonAlimentado.nombre,
      tipo: XuxemonAlimentado.tipo,
      tamano: XuxemonAlimentado.tamano,
      evo1:XuxemonAlimentado.evo1,
      evo2:XuxemonAlimentado.evo2,
      vida: XuxemonAlimentado.vida,
      idUser: XuxemonAlimentado.idUser,
    };

    /* tiene que meter el numeor del modificador en la bd
    if (XuxemonAlimentado.comida < 3) {
      this.xuxemonsService
        .XuxeUpdate(XuxemonEditado, this.XuxeId)
        .subscribe({
          // Aceptada //
          next: (data: any) => {
            // Redirije al usuario y le da un mensaje //
            this.router.navigate(['xuxedex']);
            alert('Xuxemon modificado con exito.');
            this.router.navigate(['home/home/xuxemons/xuxedex']);
          },
          // Rechazada //
          error: (error: string | undefined) => {
            console.log(error);
            // Avisa de que algo salió mal //
            alert('No se pudo editar el Xuxemon');
            throw new Error(error);
          },
        });
    }*/
  }

  // dice que chuche le da
  onChucheChange(event: any, id: number | undefined) {
    const selectedIndex = event.target.selectedIndex;
    if (selectedIndex !== undefined) {
      this.selectedChuche = selectedIndex;
      this.XuxeId = id;
    } else {
      console.log('No se pudo obtener la chuche seleccionada');
    }
  }

  updateXuxemons() {
    this.xuxemonsService.getAllXuxemonsUser().subscribe({
      next: (value: any) => {
        this.xuxemonsUsers = value[0];
      },
      error: (error) => {
        console.error('Error fetching XuxemonsUsers:', error);
      },
    });
  }

  getChuches() {
    this.chuchesService.getAllChuches().subscribe({
      next: (value: any) => {
        this.Chuches = value[0];
      },
      error: (error) => {
        console.error('Error fetching Chuches:', error);
      },
    });
  }

  getXuxemons() {
    this.xuxemonsService.getAllXuxemons().subscribe({
      next: (value: any) => {
        this.xuxemons = value[0];
      },
      error: (error) => {
        console.error('Error fetching Xuxemons:', error);
      },
    });
  }

  // Función para el botón de debug //
  debug() {
    const randomIndex = Math.floor(Math.random() * this.xuxemons.length);
    const randomXuxemon = this.xuxemons[randomIndex];
    console.log('randomIndex:' + randomIndex);
    console.log('Numero de Xuxemons: ' + this.xuxemons.length);
    // const reference = TokenService;
    // const token = TokenService.getToken();
    // console.log(token);

    const xuxemonData = {
      nombre: randomXuxemon.nombre,
      tipo: randomXuxemon.tipo,
      tamano: randomXuxemon.tamano,
      evo1:0,
      evo2:0,
      vida: randomXuxemon.vida,
      archivo: randomXuxemon.archivo,
      idUser: 1,
    };

    console.log('XuxemonData: ');
    console.log(xuxemonData);
    // console.log(xuxemonsArray);

    this.xuxemonsUsers.forEach((xuxemonUser) => {
      if (
        xuxemonUser.tamano === randomXuxemon.tamano &&
        xuxemonUser.nombre === randomXuxemon.nombre
      ) {
        this.repetido = true;
      }
    });

    console.log('Repetido ? ' + this.repetido);

    if (!this.repetido) {
      this.xuxemonsService.createXuxemonAleatorios(xuxemonData).subscribe({
        next: () => {
          alert('Xuxemon creado aleatoriamente con éxito');
          window.location.reload();
          // this.tokenService.recargarPagina;
        },
        error: (error) => {
          console.error('Error al crear el Xuxemon:', error);
          alert('Ocurrió un error al crear el Xuxemon aleatorio');
        },
      });
    } else {
      console.warn('Error, ya tienes el Xuxemon con el mismo tamaño');
      alert('Ya tienes el Xuxemon con el mismo tamaño');
      this.repetido = false;
    }
  }
}
