// import { Component } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Imports de los modelos necesarios //
import { Chuches } from '../../../models/chuches/chuches.model';
import { ChuchesUser } from '../../../models/chuches/chuchesUser.model';

// Imports de los servicios //
import { UsersService } from '../../../services/users.service';
import { ChuchesService } from '../../../services/chuches.service';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-chuches',
  templateUrl: './chuches.component.html',
  styleUrls: ['./chuches.component.css'],
})
export class ChuchesComponent implements OnInit {
  Chuches: Chuches[] = [];
  ChuchesUser: ChuchesUser[] = [];
  // Variables para saber si el usuario tiene al xuxemon y para saber el rol del usuario //
  ChuchesView: boolean = false;
  userRole: Number | null;
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
    this.getChuches();
  }

  updateChuches() {
    this.ChuchesService.getAllChuchesUser().subscribe({
      next: (value: any) => {
        this.ChuchesUser = value[0];
      },
      error: (error) => {
        console.error('Error fetching Chuches:', error);
      },
    });
  }

  getChuches() {
    this.ChuchesService.getAllChuches().subscribe({
      next: (value: any) => {
        this.Chuches = value[0];
      },
      error: (error) => {
        console.error('Error fetching Xuxemons:', error);
      },
    });
  }

  // Función para el botón de debug //
  debug() {
    console.log(this.Chuches.length);
    const randomIndex = Math.floor(Math.random() * this.Chuches.length);
    const randomChuches = this.Chuches[randomIndex];
    let editar = false;
    let ChucheStack: any
    let id: number | undefined;
    // let chuchesUserData: any = {};
    // const chuchesUser = this.ChuchesUser;
    // const reference = TokenService;
    // const token = TokenService.getToken();
    // console.log(token);

    this.ChuchesUser.forEach((chucheUser) => {
      if (randomChuches.nombre == chucheUser.nombre) {
        ChucheStack = +chucheUser.stack + 1;
        // chuchesUserData = {
        //   nombre: chucheUser.nombre,
        //   dinero: chucheUser.dinero,
        //   modificador: chucheUser.modificador,
        //   archivo: chucheUser.archivo,
        //   stack: ChucheStack + 1,
        //   idUser: 1,
        // };
        id = chucheUser.id;
        editar = true;
      }
    });

    const chuchesData = {
      nombre: randomChuches.nombre,
      dinero: randomChuches.dinero,
      modificador: randomChuches.modificador,
      archivo: randomChuches.archivo,
      idUser: 1,
    };

    //crea las chuches sin stackear

    // this.ChuchesService.createChuchesAleatorios(chuchesData).subscribe({
    //   next: () => {
    //     alert('Chuches creado aleatoriamente con éxito');
    //     window.location.reload();
    //   },
    //   error: (error) => {
    //     console.log(chuchesData.idUser);
    //     console.log('Error al crear la Chuches:', error);
    //     console.log(chuchesData);
    //     alert('Ocurrió un error al crear la Chuche aleatoria');
    //   },
    // });


    if (!editar) {
      const chuchesData = {
        nombre: randomChuches.nombre,
        dinero: randomChuches.dinero,
        modificador: randomChuches.modificador,
        archivo: randomChuches.archivo,
        idUser: 1,
      };

      this.ChuchesService.createChuchesAleatorios(chuchesData).subscribe({
        next: () => {
          alert('Chuches creado aleatoriamente con éxito');
          // window.location.reload();
        },
        error: (error) => {
          console.log(chuchesData.idUser);
          console.log('Error al crear la Chuches:', error);
          console.log(chuchesData);
          alert('Ocurrió un error al crear la Chuche aleatoria');
        },
      });

    } else {
      // Código para actualizar la chuche existente
      this.ChuchesService
        .chucheUpdate( {stack: ChucheStack}, {id: id}) // Agrega el campo 'stack' en el objeto enviado al servidor
        .subscribe({
          // Aceptada //
          next: (data: any) => {
            // Redirije al usuario y le da un mensaje //
            alert('chuche modificado con éxito.');
            console.log(ChucheStack);
            // window.location.reload();
          },
          // Rechazada //
          error: (error) => {
            console.log(error);
            // Avisa de que algo salió mal //
            alert('No se pudo editar la chuche');
            throw new Error(error);
          },
        });
    }
    // } else {
    //   this.ChuchesService
    //   .chucheUpdate(ChucheStack, id)
    //   .subscribe({
    //     // Aceptada //
    //     next: (data: any) => {
    //       // Redirije al usuario y le da un mensaje //
    //       // this.router.navigate(['xuxedex']);
    //       alert('chuche modificado con exito.');
    //       console.log(ChucheStack);
    //       // window.location.reload();
    //     },
    //     // Rechazada //
    //     error: (error) => {
    //       console.log(error);
    //       // Avisa de que algo salió mal //
    //       alert('No se pudo editar la chuche');
    //       throw new Error(error);
    //     },
    //   });
    // }
  }
}
