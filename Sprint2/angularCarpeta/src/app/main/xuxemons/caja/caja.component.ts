import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
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
  xuxemonsUsers: XuxemonsUsers[] = [];
  userRole: Number | null;
  mostrarAlimentar: boolean = false;
  xuxemons: Xuxemons[] = [];

  // Variables especificas //
  xuxeData: any = {};
  nombre: string = '';
  tipo: string = '';
  comida: number | undefined;
  tamano: number | undefined;
  evo1: number | undefined;
  evo2: number | undefined;
  vida: number | undefined;
  archivo: string = '';

  // Chuches: Chuches[] = [];
  // Variables para saber si el usuario tiene al xuxemon y para saber el rol del usuario //
  xuxemonsView: boolean = false;
  evolucion!: number;
  repetido: boolean = false;
  selectedChuche: any;
  XuxeId: any;
  id!: number;

  constructor(
    public userService: UsersService,
    public xuxemonsService: XuxemonsService,
    //public chuchesService: ChuchesService,
    private router: Router,
    private route: ActivatedRoute,

    public tokenService: TokenService
  ) {
    this.userRole = this.tokenService ? this.tokenService.getRole() : null;
  }

  // evolucionar(nombre: string) {
  //   this.xuxemonsUsers.forEach((xuxemonUser) => {
  //     if (xuxemonUser.nombre == nombre) {
  //       this.id = xuxemonUser.id!;
  //       this.nombre = xuxemonUser.nombre;
  //       this.tipo = xuxemonUser.tipo;
  //       this.comida = 0;
  //       this.evo1 = xuxemonUser.evo1;
  //       this.evo2 = xuxemonUser.evo2;
  //       this.vida = xuxemonUser.vida;
  //       this.archivo = xuxemonUser.archivo;
  //       if (
  //         (xuxemonUser.tamano == 1) &&
  //         xuxemonUser.comida == xuxemonUser.evo1
  //       ) {
  //         this.tamano = 2;
  //         console.log(this.evolucion)
  //       } else if (
  //         (xuxemonUser.tamano == 2) &&
  //         xuxemonUser.comida == xuxemonUser.evo2
  //       ) {
  //         this.tamano = 3;
  //         console.log(this.evolucion)
  //       } else if ((xuxemonUser.tamano == 3)) {
  //         alert('No lo puedes evolucionar mas');
  //         this.evolucion = xuxemonUser.tamano;
  //         console.log(this.evolucion)
  //       } else {
  //         this.evolucion = xuxemonUser.tamano;
  //         console.log(this.evolucion)
  //       }
  //       console.log("Evolucion final:" + this.evolucion)
  //     }
  //   });
  // }

  // solo aumenta el tamaño si la comida y la evo son iguales
  // si a cambiado de tamaño se edita en la bd, no funciona
  // llevo 3h con la mierda de editar hasta la polla estoy
  // me voy a dormir que son las 3:16 am suerte mañana,
  // yo si me levanto pronto sera para ir a nadar al gym luego me uno y te ayudo

  // si lo ves un poco extraño es porque este editar no necesita un formulario

  evolucionar(nombre: string) {
    this.xuxemonsUsers.forEach((xuxemonUser) => {
      if (xuxemonUser.nombre == nombre) {
        this.id = xuxemonUser.id!;
        this.nombre = xuxemonUser.nombre;
        this.tipo = xuxemonUser.tipo;
        this.comida = 0;
        this.evo1 = xuxemonUser.evo1;
        this.evo2 = xuxemonUser.evo2;
        this.vida = xuxemonUser.vida;
        this.archivo = xuxemonUser.archivo;
        if (xuxemonUser.tamano == 1 && xuxemonUser.comida == xuxemonUser.evo1) {
          this.tamano = 2;
          alert('Evoluciona a nivel 2');
        } else if (
          xuxemonUser.tamano == 2 &&
          xuxemonUser.comida == xuxemonUser.evo2
        ) {
          this.tamano = 3;
          alert('Evoluciona a nivel 3');
        } else if (xuxemonUser.tamano == 3) {
          alert('No lo puedes evolucionar más');
          return;
        }else{
          this.tamano = xuxemonUser.tamano;
        }
        // Llama a la función de edición después de calcular la evolución
        if (this.tamano != xuxemonUser.tamano) {
          this.editarXuxemon();
        }else{
          alert('Aun no se puede evolucionar');
          return;
        }
      }
    });
  }

  ngOnInit(): void {
    //this.getChuches();

    this.route.queryParams.subscribe((params) => {
      this.xuxeData = {
        id: params['id'],
        nombre: params['nombre'],
        tipo: params['tipo'],
        comida: params['comida'],
        tamano: params['tamano'],
        evo1: params['evo1'],
        evo2: params['evo2'],
        vida: params['vida'],
        archivo: params['archivo'],
      };

      // Seteamos los valores //
      this.nombre = this.xuxeData.nombre || '';
      this.tipo = this.xuxeData.tipo || '';
      this.comida = this.xuxeData.comida || '';
      this.tamano = this.xuxeData.tamano || '';
      this.evo1 = this.xuxeData.evo1 || '';
      this.evo2 = this.xuxeData.evo2 || '';
      this.vida = this.xuxeData.vida || '';
      this.archivo = this.xuxeData.archivo || '';
    });
    this.updateXuxemons();
    this.getXuxemons();
  }

  // // Función para editar el Xuxemon //
  // editarXuxemon() {
  //   const xuxeDataToUpdate = {
  //     nombre: this.nombre,
  //     tipo: this.tipo,
  //     comida: this.comida,
  //     tamano: this.tamano,
  //     evo1: this.evo1,
  //     evo2: this.evo2,
  //     vida: this.vida,
  //     archivo: this.archivo,
  //   };

  //   // Se subscribe para recibir la información de la función a la que hace referencia en users.service //
  //   this.xuxemonsService
  //     .XuxeUserUpdate(xuxeDataToUpdate, this.id)
  //     .subscribe({
  //       // Aceptada //
  //       next: (data: any) => {
  //         // Redirije al usuario y le da un mensaje //
  //         alert('Xuxemon modificado con exito.');
  //         console.log(xuxeDataToUpdate);
  //         // this.router.navigate(['home/home/xuxemons/caja']);
  //       },
  //       // Rechazada //
  //       error: (error) => {
  //         console.log(error);
  //         // Avisa de que algo salió mal //
  //         alert('No se pudo editar el Xuxemon');
  //         throw new Error(error);
  //       },
  //     });
  // }

  editarXuxemon() {
    const xuxeDataToUpdate = {
      nombre: this.nombre,
      tipo: this.tipo,
      comida: this.comida,
      tamano: this.tamano,
      evo1: this.evo1,
      evo2: this.evo2,
      vida: this.vida,
      archivo: this.archivo,
    };

    // Se suscribe para recibir la información de la función a la que hace referencia en users.service //
    this.xuxemonsService.XuxeUserUpdate(xuxeDataToUpdate, this.id).subscribe({
      // Aceptada //
      next: (data: any) => {
        // Redirige al usuario y muestra un mensaje //
        alert('Xuxemon modificado con éxito.');
        console.log(xuxeDataToUpdate);
        // Recarga la lista de xuxemons después de la edición exitosa
        // this.updateXuxemons();
      },
      // Rechazada //
      error: (error) => {
        console.log(error);
        // Avisa de que algo salió mal //
        alert('No se pudo editar el Xuxemon');
        throw new Error(error);
      },
    });
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

  // alimentar a los xuxemons
  alimentar(xuxe: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: xuxe.id,
        nombre: xuxe.nombre,
        tipo: xuxe.tipo,
        tamano: xuxe.tamano,
        comida: xuxe.comida,
        evo1: xuxe.evo1,
        evo2: xuxe.evo2,
        archivo: xuxe.archivo,
      },
    };
    // Envia al usuario a la ruta de edición //
    this.router.navigate(
      ['/home/home/xuxemons/caja/alimentar'],
      navigationExtras
    );
    // const XuxemonAlimentado = this.xuxemonsUsers[this.XuxeId];
    // const ChucheInfo = this.Chuches[this.selectedChuche];
    // let Comida = 0;
    // // esto se puede cambiar para que cambie depende de la dificultad
    // if (XuxemonAlimentado.comida <= 3) {
    //   Comida = XuxemonAlimentado.comida + ChucheInfo.modificador;
    // }
    // const XuxemonEditado = {
    //   nombre: XuxemonAlimentado.nombre,
    //   tipo: XuxemonAlimentado.tipo,
    //   tamano: XuxemonAlimentado.tamano,
    //   comida: Comida,
    //   evo1:XuxemonAlimentado.evo1,
    //   evo2:XuxemonAlimentado.evo2,
    //   vida: XuxemonAlimentado.vida,
    //   idUser: XuxemonAlimentado.idUser,
    // };
    // // tiene que meter el numeor del modificador en la bd
    // if (XuxemonAlimentado.comida < 3) {
    //   this.xuxemonsService
    //     .XuxeComer(XuxemonEditado, this.XuxeId)
    //     .subscribe({
    //      // Aceptada //
    //       next: (data: any) => {
    //         //Redirije al usuario y le da un mensaje //
    //         //this.router.navigate(['xuxedex']);
    //         alert('Xuxemon modificado con exito.');
    //         this.router.navigate(['home/home/xuxemons/xuxedex']);
    //       },
    //       //Rechazada //
    //       error: (error: string | undefined) => {
    //         console.log(error);
    //        // Avisa de que algo salió mal //
    //         alert('No se pudo editar el Xuxemon');
    //         throw new Error(error);
    //       },
    //     });
    // }
  }

  // // dice que chuche le da
  // onChucheChange(event: any, id: number | undefined) {
  //   const selectedIndex = event.target.selectedIndex;
  //   if (selectedIndex !== undefined) {
  //     this.selectedChuche = selectedIndex;
  //     this.XuxeId = id! - 1;
  //   } else {
  //     console.log('No se pudo obtener la chuche seleccionada');
  //   }
  // }

  // getChuches() {
  //   this.chuchesService.getAllChuches().subscribe({
  //     next: (value: any) => {
  //       this.Chuches = value[0];
  //     },
  //     error: (error) => {
  //       console.error('Error fetching Chuches:', error);
  //     },
  //   });
  // }

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
      evo1: 0,
      evo2: 0,
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
