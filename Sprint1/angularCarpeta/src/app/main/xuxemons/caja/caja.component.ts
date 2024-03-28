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
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css'],
})
export class CajaComponent implements OnInit {
  xuxemons: Xuxemons[] = [];
  xuxemonsUsers: XuxemonsUsers[] = [];
  // Variables para saber si el usuario tiene al xuxemon y para saber el rol del usuario //
  xuxemonsView: boolean = false;
  userRole: Number | null;
  repetido: boolean = false;

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
    this.getXuxemons();
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
    const randomIndex =  Math.floor(Math.random() * this.xuxemons.length);
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
      vida: randomXuxemon.vida,
      archivo: randomXuxemon.archivo,
      idUser: 1,
    };

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

    console.log(this.repetido);

    if (!this.repetido) {
      this.xuxemonsService.createXuxemonAleatorios(xuxemonData).subscribe({
        next: () => {
          alert('Xuxemon creado aleatoriamente con éxito');
        },
        error: (error) => {
          console.error('Error al crear el Xuxemon:', error);
          alert('Ocurrió un error al crear el Xuxemon aleatorio');
        },
      });
    }else{
      console.warn('Error, ya tienes el Xuxemon con el mismo tamaño');
      alert('Ya tienes el Xuxemon con el mismo tamaño');
      this.repetido = false;
    }
  }
}
