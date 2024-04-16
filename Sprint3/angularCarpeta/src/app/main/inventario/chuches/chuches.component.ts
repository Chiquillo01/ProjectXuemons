import { Component, OnInit } from '@angular/core';
// Imports extras //
import { TokenService } from '../../../services/token.service';
import { ChuchesService } from '../../../services/chuches.service';
import { ChuchesUser } from '../../../models/chuches/chuchesUser.model';
import { Horario } from '../../../models/horario/horario.model';

@Component({
  selector: 'app-chuches',
  templateUrl: './chuches.component.html',
  styleUrls: ['./chuches.component.css'],
})
export class ChuchesComponent implements OnInit {
  chucheUser: ChuchesUser[] = [];
  horario: Horario[] = [];
  userRol!: number;

  constructor(
    private tokenService: TokenService,
    private chuchesService: ChuchesService
  ) {}

  ngOnInit(): void {
    // this.activarHorario();
    this.getHorario();
    this.getChuches();
    this.userRol = this.tokenService.getRole()!;
  }

  /**
   * Nombre: getChuches
   * Función: obtiene todas las chuches que son del usuario que esta en sessión
   */
  getChuches() {
    const userId = this.tokenService.getRole();
    console.log('UserId getChuches: ' + userId);

    if (userId !== null) {
      this.chuchesService.getAllChuchesUser(userId).subscribe({
        next: (chuchesUser: any) => {
          this.chucheUser = chuchesUser[0];
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
   * Nombre: getHorario
   * Función: obtiene la info del horario del usuario
   */
  getHorario() {
    const userId = this.tokenService.getRole();
    console.log('UserId getHorario: ' + userId);

    if (userId !== null) {
      this.chuchesService.getHorario(userId).subscribe({
        next: (Horario: any) => {
          this.horario = Horario[0];
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
   * Nombre: getHorario
   * Función: obtiene todas las chuches que son del usuario que esta en sessión
   */
  activarHorario() {
    // const userId = this.tokenService.getRole();
    // console.log('UserId: ' + userId);
    // if (userId !== null) {
    //   this.chuchesService.activarHorario(userId).subscribe({
    //     next: (Horario: any) => {
    //       console.log("debug activado ?");
    //     },
    //     error: (error) => {
    //       console.error('Error activando el debug:', error);
    //     },
    //   });
    // } else {
    //   console.error('User ID is null');
    // }
  }

  /**
   * Nombre: debug
   * Función: crea aleatoriamente una chuche pasandole el id del usuario de la sesión habierta.
   * Despues actualizara la lista de chuches del Usuario
   */
  debug(): void {
    const userId = this.tokenService.getRole();

    console.log('UserId debug: ' + userId);

    // crea o actualiza el horario del usuario
    this.chuchesService.horario(userId!).subscribe({
      next: () => {
        console.log('Horario creado');
      },
      error: (error) => {
        alert('Horario fallido.');
        console.log(error);
      },
    });

    if (this.horario[0].debug || this.userRol == 1) {
      // crea o añade al stack las chuches
      this.chuchesService.createChuchesAleatorios(userId!).subscribe({
        next: () => {
          console.log('Chuche añadida');
          this.getChuches();
          this.getHorario();
        },
        error: (error) => {
          alert('Chuche fallida.');
          console.log(error);
        },
      });
    }
  }
}
